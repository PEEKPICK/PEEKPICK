package com.vvs.peekpick.member.service;

import com.vvs.peekpick.entity.*;
import com.vvs.peekpick.exception.CustomException;
import com.vvs.peekpick.exception.ExceptionStatus;
import com.vvs.peekpick.global.auth.JwtTokenProvider;
import com.vvs.peekpick.global.auth.Token;
import com.vvs.peekpick.member.dto.AvatarDto;
import com.vvs.peekpick.member.dto.SignUpDto;
import com.vvs.peekpick.member.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final AvatarRepository avatarRepository;

    private final EmojiRepository emojiRepository;
    private final WorldRepository worldRepository;
    private final PrefixRepository prefixRepository;
    private final TasteRepository tasteRepository;
    private final CategoryRepository categoryRepository;
    private final AchievementRepository achievementRepository;

    private final JwtTokenProvider jwtTokenProvider;
    /**
     * 회원가입
     * @param signUpDto
     * 신규 회원이 발생 시
     * 1. Avatar 생성
     * 2. 업적 생성
     * 3. 회원 생성
     * 4. 취향 태그 등록
     */
    public Token signup(SignUpDto signUpDto) {
        Avatar avatar = createAvatar(signUpDto);
        Achievement achievement = createAchievement();

        Member findMember = memberRepository.findById(signUpDto.getMemberId())
                                                               .orElseThrow(() -> new CustomException(ExceptionStatus.NOT_FOUND_USER));

        findMember.updateMember(signUpDto, avatar, achievement);

        addTastes(signUpDto, avatar);

        // 회원가입 성공
        // Token 반환
        String accessToken = jwtTokenProvider.createAccessToken(findMember);
        String refreshToken = jwtTokenProvider.createRefreshToken();

        return new Token(accessToken, refreshToken);
    }

    // 이모지 뽑기
    public Emoji RandomEmoji() {
        return emojiRepository.getRandomEmoji().orElseThrow();
    }

    // 수식어 뽑기
    public Prefix RandomPrefix() {
        return prefixRepository.getRandomEmoji().orElseThrow();
    }

    // 월드 뽑기 (이게 왜 있지?)
    public List<World> RandomWorld() {
        return worldRepository.findAll();
    }

    // 회원 정보 조회
    // 가회원 처리용
    public Member getMemberInfo(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow();
    }

    // 취향 태그 대분류 조회
    public List<String> categoryList() {
        return categoryRepository.findLarge();
    }

    // 취향 태그 상세 조회
    public List<Category> detailCategoryList(String categoryLarge) {
        return categoryRepository.findByLarge(categoryLarge);
    }

    // 아바타 정보 조회
    public AvatarDto getAvatarInfo(Long avatarId) {
        Avatar avatar = findByAvatarId(avatarId);

        return avatar.toAvatarDto();
    }

    // 아바타 정보 수정
    @Override
    public void updateAvatarInfo(Long avatarId, Map<String, String> param) {
        Avatar avatar = findByAvatarId(avatarId);

        Long prefixId = Long.valueOf(param.get("prefixId"));
        String nickname = param.get("nickname");
        String bio = param.get("bio");

        Prefix prefix = prefixRepository.findById(prefixId)
                                        .orElseThrow(() -> new CustomException(ExceptionStatus.EXCEPTION_SAMPLE));

        avatar.updateAvatarInfo(prefix, nickname, bio);
    }


    // 아바타 이모지 수정
    @Override
    public void updateAvatarEmoji(Long avatarId, Long emojiId) {
        Avatar avatar = findByAvatarId(avatarId);

        Emoji emoji = emojiRepository.findById(emojiId)
                                     .orElseThrow(() -> new CustomException(ExceptionStatus.EXCEPTION_SAMPLE));

        avatar.updateEmoji(emoji);
    }

    // 아바타 likes 태그 수정
    @Override
    public void updateAvatarLikes(Long avatarId, List<Long> likes) {
        Avatar avatar = findByAvatarId(avatarId);
        updateTaste(avatar, "L", likes);
    }

    private void updateTaste(Avatar avatar, String type, List<Long> categoryIds) {

        // 기존 Tastes 가져오기
        List<Taste> tastesList = avatar.getTasteList().stream()
                                       .filter(taste -> type.equals(taste.getType()))
                                       .collect(Collectors.toList());

        // 업데이트 Tastes
        List<Category> newTastes = categoryIds.stream()
                                              .map(categoryId -> categoryRepository.findById(categoryId)
                                              .orElseThrow(() -> new CustomException(ExceptionStatus.NOT_FOUND_CATEGORY)))
                                              .collect(Collectors.toList());

        // 기존 Tastes 삭제
        tastesList.forEach(taste -> {
            if (!newTastes.contains(taste.getCategory())) {
                tasteRepository.delete(taste);
            }
        });

        // 새로운 Tastes 추가
        for (Category category : newTastes) {
            boolean found = false;
            for (Taste taste : tastesList) {
                if (taste.getCategory().equals(category)) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                Taste taste = Taste.builder()
                        .avatar(avatar)
                        .category(category)
                        .type(type)
                        .build();
                tasteRepository.save(taste);
            }
        }
    }

    // 23.07.31 회원 생성 Form Login 대비용
    private Member createMember(SignUpDto signUpDto, Avatar avatar, Achievement achievement) {
        Member member = Member.builder()
                .email(signUpDto.getEmail())
                .name(signUpDto.getName())
                .phone(signUpDto.getPhone())
                .gender(signUpDto.getGender())
                .birthday(signUpDto.getBirthday())
                .avatar(avatar)
                .achievement(achievement)
                .build();

        return memberRepository.save(member);
    }

    // 업적 생성
    private Achievement createAchievement() {
        Achievement achievement = Achievement.builder()
                .chatCount(0)
                .likeCount(0)
                .disLikeCount(0)
                .pickPoint(0)
                .updateDate(LocalDateTime.now()).build();

        return achievementRepository.save(achievement);
    }

    // 아바타 생성
    private Avatar createAvatar(SignUpDto signUpDto) {
        Avatar avatar = Avatar.builder()
                              .emoji(emojiRepository.findById(signUpDto.getEmojiId()).orElseThrow())
                              .prefix(prefixRepository.findById(signUpDto.getPrefixId()).orElseThrow())
                              .world(worldRepository.findById(1).orElseThrow())
                              .nickname(signUpDto.getNickname())
                              .bio("").build();

        return avatarRepository.save(avatar);
    }

    // 취향 태그 추가
    private void addTastes(SignUpDto signUpDto, Avatar avatar) {
        for (int categoryId : signUpDto.getLikes()) {
            addTaste(categoryId, avatar, "L");
        }

        for (int categoryId : signUpDto.getDisLikes()) {
            addTaste(categoryId, avatar, "D");
        }
    }

    // 취향 태그 매핑
    private void addTaste(int categoryId, Avatar avatar, String type) {
        Category category = categoryRepository.findById((long) categoryId)
                                              .orElseThrow(() -> new CustomException(ExceptionStatus.NOT_FOUND_CATEGORY));

        Taste taste = Taste.builder()
                .avatar(avatar)
                .category(category)
                .type(type)
                .build();

        tasteRepository.save(taste);
    }

    // avatarId로 아바타 조회
    private Avatar findByAvatarId(Long avatarId) {
        Avatar avatar = avatarRepository.findById(avatarId)
                                        .orElseThrow(() -> new CustomException(ExceptionStatus.NOT_FOUND_AVATAR));
        return avatar;
    }
}
