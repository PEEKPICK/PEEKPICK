package com.vvs.peekpick.member.service;

import com.vvs.peekpick.entity.*;
import com.vvs.peekpick.member.dto.SignUpDto;
import com.vvs.peekpick.member.repository.EmojiRepository;
import com.vvs.peekpick.member.repository.MemberRepository;
import com.vvs.peekpick.member.repository.PrefixRepository;
import com.vvs.peekpick.member.repository.WorldRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final EmojiRepository emojiRepository;
    private final WorldRepository worldRepository;
    private final PrefixRepository prefixRepository;
    /**
     * 회원가입 완료 처리
     * @param signUpDto
     */
    public Avatar signup(SignUpDto signUpDto) {

        // 신규 회원이 발생 시
        // 1. Avatar 1개 생성
        Avatar avatar = Avatar.builder()
                .emoji(emojiRepository.findById(signUpDto.getEmojiId()).orElseThrow())
                .prefix(prefixRepository.findById(signUpDto.getPrefixId()).orElseThrow())
                .world(worldRepository.findById(1).orElseThrow())
                .nickname(signUpDto.getNickname())
                .bio("").build();

        log.info("Avatar = {}", avatar.toString());
        // 2. Member 생성 및 등록
        Member member = Member.builder()
                        .email(signUpDto.getEmail())
                        .name(signUpDto.getName())
                        .gender(signUpDto.getGender())
                        .birthday(signUpDto.getBirthday())
                        .avatar(avatar)
                        .provider(signUpDto.getProvider())
                        .build();

        log.info("member = {}", member.toString());

        Member saveMember = memberRepository.save(member);
        log.info("saveMember = {}", saveMember.toString());
        return saveMember.getAvatar();
    }
}
