package com.vvs.peekpick.peek.service;

import com.vvs.peekpick.entity.Member;
import com.vvs.peekpick.entity.Peek;
import com.vvs.peekpick.entity.Report;
import com.vvs.peekpick.entity.ReportCategory;
import com.vvs.peekpick.peek.dto.*;
import com.vvs.peekpick.report.dto.RequestReportDto;
import com.vvs.peekpick.report.service.ReportService;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.response.ResponseService;
import com.vvs.peekpick.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.geo.*;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.GeoOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class PeekRedisServiceImpl implements PeekRedisService {

    private final String PEEK_REDIS = "Peek:"; //(key) Peek:peek의 id / (value) Peek
    private final String PEEK_LOCATION_REDIS = "Peek_Location"; //(key) Peek_Location:peek의 id / (value) Peek의 값
    private final int MAX_PEEK = 10; // 화면 단에 전닿해주는 Peek 수
    private final int PEEK_ORIGIN_TIME = 30; // PEEK 기본 지속 시간
    private final int PEEK_REACTION_TIME = 5; // 좋아요, 싫어요 시 증가되는 시간

    @Qualifier("peekRedisTemplate")
    private final RedisTemplate<String, Object> peekTemplate;
    @Qualifier("locationRedisTemplate")
    private final RedisTemplate<String, Object> locationTemplate;
    private GeoOperations<String, Object> geoOps;
    private ValueOperations<String, Object> valueOps;
    private SetOperations<String, Object> setOps;
    private final Random random = new Random();

    private final ResponseService responseService;
    private final PeekMemberService peekMemberService;
    private final PeekService peekService;
    private final ReportService reportService;

    @PostConstruct
    public void init() {
        geoOps = locationTemplate.opsForGeo();
        valueOps = peekTemplate.opsForValue();
        setOps = peekTemplate.opsForSet();
    }

    @Override
    public CommonResponse addPeek(RequestPeekDto requestPeekDto, String imageUrl) {
        System.out.println(requestPeekDto);
        try {
            //RDB에 저장하기 위한 Peek 객체
            Peek peek = Peek.builder()
                    .member(peekMemberService.findMember(requestPeekDto.getMemberId()))
                    .content(requestPeekDto.getContent())
                    .disLikeCount(0)
                    .likeCount(0)
                    .imageUrl(imageUrl)
                    .writeTime(LocalDateTime.now())
                    .build();

            //RDB에 Peek 저장 후 id 값 받아옴
            Long peekId = peekService.savePeek(peek);

            //redis에 저장하기 위한 Peek 객체 생성
            PeekRedisDto peekRedisDto = PeekRedisDto.builder()
                    .peekId(peekId)
                    .memberId(requestPeekDto.getMemberId()) //작성자
                    .content(requestPeekDto.getContent())
                    .imageUrl(imageUrl)
                    .likeCount(0)
                    .disLikeCount(0)
                    .writeTime(LocalDateTime.now())
                    .finishTime(LocalDateTime.now().plusMinutes(PEEK_ORIGIN_TIME))
                    .special(false)
                    .viewed(false)
                    .build();

            //redis에 Peek Location 값 저장 & ttl 설정
            geoOps.add(PEEK_LOCATION_REDIS, new Point(requestPeekDto.getLongitude(), requestPeekDto.getLatitude()), peekId.toString());
            locationTemplate.expire(PEEK_LOCATION_REDIS, Duration.ofMinutes(PEEK_ORIGIN_TIME));
            //redis에 Peek 저장 & ttl 설정
            peekTemplate.opsForValue().set(PEEK_REDIS + peekId, peekRedisDto, Duration.ofMinutes(PEEK_ORIGIN_TIME));

            return responseService.successCommonResponse(ResponseStatus.ADD_SUCCESS);
        }
        catch (Exception e) {
            return responseService.failureCommonResponse(ResponseStatus.PEEK_FAILURE);
        }
    }


    @Override
    public DataResponse getPeek(Long memberId, Long peekId) {
        try{
            // Redis에서 Peek 가져오기
            PeekRedisDto peekRedisDto = (PeekRedisDto) peekTemplate.opsForValue().get(PEEK_REDIS + peekId);

            // 현재 사용자가 해당 Peek을 본 것으로 처리
            String key = "member:" + memberId + ":viewed";
            setOps.add(key, String.valueOf(peekId));
            // 해당 키에 대한 TTL 설정 (24시간)
            peekTemplate.expire(key, Duration.ofHours(24));

            // 현재 사용자의 해당 Peek의 좋아요 / 싫어요 여부 판별
            boolean isLiked= setOps.isMember("member:" + memberId + ":liked", String.valueOf(peekId));
            boolean isDisLiked = setOps.isMember("member:" + memberId + ":disLiked", String.valueOf(peekId));

            // 응답해줄 Peek 객체
            ResponsePeekDetailDto responsePeekDetailDto = ResponsePeekDetailDto.builder()
                    .peekId(peekRedisDto.getPeekId())
                    .memberId(peekRedisDto.getMemberId())
                    .content(peekRedisDto.getContent())
                    .imageUrl(peekRedisDto.getImageUrl())
                    .likeCount(peekRedisDto.getLikeCount())
                    .disLikeCount(peekRedisDto.getDisLikeCount())
                    .finishTime(peekRedisDto.getFinishTime())
                    .liked(isLiked)
                    .disLiked(isDisLiked)
                    .build();
            if(responsePeekDetailDto == null) return responseService.failureDataResponse(ResponseStatus.PEEK_FAILURE, null);
            return responseService.successDataResponse(ResponseStatus.LOADING_PEEK_SUCCESS, responsePeekDetailDto);
        }
        catch (Exception e) {
            e.printStackTrace();
            return responseService.failureDataResponse(ResponseStatus.PEEK_FAILURE, null);
        }
    }

    @Override
    public CommonResponse deletePeek(Long peekId) {
        try {
            // 삭제 전 rdb에 update
            PeekRedisDto peekRedisDto = (PeekRedisDto) peekTemplate.opsForValue().get(PEEK_REDIS + peekId);
            peekService.updatePeek(peekRedisDto.getPeekId(), peekRedisDto.getLikeCount(), peekRedisDto.getDisLikeCount());

            // redis에서 Peek Location, Peek 둘 다 삭제
            geoOps.remove(PEEK_LOCATION_REDIS, peekId.toString());
            peekTemplate.delete(PEEK_REDIS + peekId);
            return responseService.successCommonResponse(ResponseStatus.DELETE_SUCCESS);
        }
        catch (Exception e) {
            return responseService.failureCommonResponse(ResponseStatus.PEEK_FAILURE);
        }
    }

    @Override
    public CommonResponse addReaction(Long peekId, Long memberId, boolean like) {
        try {
            // Redis에서 Peek 가져오기
            PeekRedisDto peekRedisDto = (PeekRedisDto) peekTemplate.opsForValue().get(PEEK_REDIS + peekId);
            LocalDateTime updatedFinishTime = peekRedisDto.getFinishTime(); //해당 Peek의 종료 시간
            boolean special = peekRedisDto.isSpecial(); //Hot Peek 여부

            String key = "member:" + memberId + (like ? ":liked" : ":disLiked");
            int likeCnt = peekRedisDto.getLikeCount();
            int disLikeCnt = peekRedisDto.getDisLikeCount();

            //사용가 해당 Peek의 react를 On -> Off
            if (setOps.isMember(key, String.valueOf(peekId))) {
                setOps.remove(key, String.valueOf(peekId));
                if(like) likeCnt--;
                else disLikeCnt--;
            }
            //사용가 해당 Peek의 react를 Off -> On
            // 해당 키에 대한 TTL 설정 (24시간)
            else {
                setOps.add(key, String.valueOf(peekId));
                peekTemplate.expire(key, Duration.ofHours(24));
                updatedFinishTime = peekRedisDto.getFinishTime().plusMinutes(PEEK_REACTION_TIME);
                if(like) likeCnt++;
                else disLikeCnt++;
            }

            // Peek 지속시간을 24시간으로 제한, 24시간 설정된 Peek은 Hot Peek으로
            if (Duration.between(peekRedisDto.getWriteTime(), updatedFinishTime).toHours() >= 24) {
                updatedFinishTime = peekRedisDto.getWriteTime().plusHours(24);
                special = true;
            }

            //Redis에 Peek Update
            PeekRedisDto updatedPeekRedisDto = peekRedisDto.toBuilder()
                    .likeCount(likeCnt)
                    .disLikeCount(disLikeCnt)
                    .finishTime(updatedFinishTime)
                    .special(special)
                    .build();
            valueOps.set(PEEK_REDIS + peekId, updatedPeekRedisDto);

            return responseService.successCommonResponse(ResponseStatus.ADD_REACTION_SUCCESS);
        } catch (Exception e) {
            return responseService.failureCommonResponse(ResponseStatus.PEEK_FAILURE);
        }
    }

    @Override
    public DataResponse findNearPeek(Long memberId, RequestSearchPeekDto requestSearchPeekDto) {
        try {
            // 반경 m로 원 생성
            Circle circle = new Circle(requestSearchPeekDto.getPoint(), new Distance(requestSearchPeekDto.getDistance(), RedisGeoCommands.DistanceUnit.METERS));
            // 해당 원 안에 위치하는 PeekLocation 값들
            GeoResults<RedisGeoCommands.GeoLocation<Object>> nearPeekLocation = geoOps.geoRadius(PEEK_LOCATION_REDIS, circle);

            // 모든 값 가져온 뒤
            List<ResponsePeekListDto> allPeeks = new ArrayList<>();
            for (GeoResult<RedisGeoCommands.GeoLocation<Object>> peekLocation : nearPeekLocation) {
                String peekId = peekLocation.getContent().getName().toString();
                PeekRedisDto peekRedisDto = (PeekRedisDto) valueOps.get(PEEK_REDIS + peekId);
                boolean isViewed = setOps.isMember("member:" + memberId + ":viewed", String.valueOf(peekId));
                ResponsePeekListDto responsePeekListDto = ResponsePeekListDto.builder()
                        .peekId(peekRedisDto.getPeekId())
                        .special(peekRedisDto.isSpecial())
                        .viewed(peekRedisDto.isViewed())
                        .build();
                allPeeks.add(responsePeekListDto);
            }


            // 랜덤 추출 (max 보다 적게 있는 경우 있는대로만 가져옴)
            List<ResponsePeekListDto> randomPeeks;
            if(allPeeks.size() <= MAX_PEEK){
                randomPeeks = allPeeks;
            } else {
                randomPeeks = new ArrayList<>();
                for (int i = 0; i < MAX_PEEK; i++) {
                    int randomIndex = random.nextInt(allPeeks.size());
                    randomPeeks.add(allPeeks.get(randomIndex));
                    allPeeks.remove(randomIndex);
                }
            }
            return responseService.successDataResponse(ResponseStatus.LOADING_PEEK_LIST_SUCCESS, randomPeeks);
        }
        catch (Exception e) {
            return responseService.failureDataResponse(ResponseStatus.PEEK_FAILURE, null);
        }
    }

    @Override
    public CommonResponse registerReport(Long memberId, Long peekId, RequestReportDto requestReportDto) {

        PeekRedisDto peekRedisDto = (PeekRedisDto) peekTemplate.opsForValue().get(PEEK_REDIS + peekId);

        // memberId를 사용하여 Member 엔티티를 조회 (신고자)
        Member member = peekMemberService.findMember(memberId);
        // memberId를 사용하여 Member 엔티티를 조회 (피신고자)
        Member victim = peekMemberService.findMember(peekRedisDto.getMemberId());

        ReportCategory reportCategory = reportService.findReportCategory(requestReportDto.getReportCategoryId());

        Peek peek = Peek.builder()
                .member(victim) //신고 당한 사람
                .content(peekRedisDto.getContent())
                .disLikeCount(peekRedisDto.getDisLikeCount())
                .likeCount(peekRedisDto.getLikeCount())
                .imageUrl(peekRedisDto.getImageUrl())
                .writeTime(peekRedisDto.getWriteTime())
                .build();

        //peek에 저장 (이미 저장되어 있고 ttl expire 되기 전 update 로직 구현 필요)
        //peekService.savePeek(peek);
        Report report = Report.builder()
                .member(member)
                .victim(victim)
                .reportCategory(reportCategory)
                .contetnType("P")
                .reportContentId(peekRedisDto.getPeekId().toString())
                .reportContent(requestReportDto.getReportContent())
                .reportTime(LocalDateTime.now())
                .build();

        //repor에 추가
        reportService.saveReport(report);
        return responseService.successCommonResponse(ResponseStatus.REGISTER_REPORT_SUCCESS);
    }


}
