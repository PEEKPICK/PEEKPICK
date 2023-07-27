package com.vvs.peekpick.member.service;

import com.vvs.peekpick.entity.*;
import com.vvs.peekpick.member.dto.SignUpDto;
import com.vvs.peekpick.member.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

    /**
     * 회원가입
     * @param signUpDto
     * 신규 회원이 발생 시
     * 1. Avatar 생성
     * 2. 업적 생성
     * 3. 회원 생성
     * 4. 취향 태그 등록
     */
    public Avatar signup(SignUpDto signUpDto) {
        Avatar avatar = createAvatar(signUpDto);
        Achievement achievement = createAchievement();
        Member member = createMember(signUpDto, avatar, achievement);
        addTastes(signUpDto, avatar);

        // 회원가입 완료 시 로그인 처리를 위해 avatar return
        return avatar;
    }

    public Emoji RandomEmoji() {
        return emojiRepository.getRandomEmoji().orElseThrow();
    }

    public Prefix RandomPrefix() {
        return prefixRepository.getRandomEmoji().orElseThrow();
    }

    public List<World> RandomWorld() {
        return worldRepository.findAll();
    }

    private Member createMember(SignUpDto signUpDto, Avatar avatar, Achievement achievement) {
        Member member = Member.builder()
                .email(signUpDto.getEmail())
                .name(signUpDto.getName())
                .phone(signUpDto.getPhone())
                .gender(signUpDto.getGender())
                .birthday(signUpDto.getBirthday())
                .avatar(avatar)
                .achievement(achievement)
                .provider(signUpDto.getProvider())
                .build();

        return memberRepository.save(member);
    }

    private Achievement createAchievement() {
        Achievement achievement = Achievement.builder()
                .chatCount(0)
                .likeCount(0)
                .disLikeCount(0)
                .pickPoint(0)
                .updateDate(LocalDateTime.now()).build();

        return achievementRepository.save(achievement);
    }

    private Avatar createAvatar(SignUpDto signUpDto) {
        Avatar avatar = Avatar.builder()
                .emoji(emojiRepository.findById(signUpDto.getEmojiId()).orElseThrow())
                .prefix(prefixRepository.findById(signUpDto.getPrefixId()).orElseThrow())
                .world(worldRepository.findById(1).orElseThrow())
                .nickname(signUpDto.getNickname())
                .bio("").build();

        return avatarRepository.save(avatar);
    }

    private void addTastes(SignUpDto signUpDto, Avatar avatar) {
        for (int categoryId : signUpDto.getLikes()) {
            addTaste(categoryId, avatar, "L");
        }

        for (int categoryId : signUpDto.getDisLikes()) {
            addTaste(categoryId, avatar, "D");
        }
    }

    private void addTaste(int categoryId, Avatar avatar, String type) {
        Category category = categoryRepository.findById((long) categoryId).orElseThrow();
        Taste taste = Taste.builder()
                .avatar(avatar)
                .category(category)
                .type(type)
                .build();

        tasteRepository.save(taste);
    }
}
