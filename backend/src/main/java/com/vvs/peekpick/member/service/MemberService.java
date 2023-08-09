package com.vvs.peekpick.member.service;

import com.vvs.peekpick.entity.*;
import com.vvs.peekpick.global.auth.dto.Token;
import com.vvs.peekpick.member.dto.AvatarDto;
import com.vvs.peekpick.member.dto.SignUpDto;

import java.util.List;
import java.util.Map;


public interface MemberService {
    Token signup(SignUpDto signUpDto);
    Member createMember(SignUpDto signUpDto);
    Emoji RandomEmoji();
    Prefix RandomPrefix();

    List<World> RandomWorld();

    Member getMemberInfo(Long memberId);

    List<String> categoryList();

    List<Category> detailCategoryList(String categoryLarge);

    AvatarDto getAvatarInfo(Long avatarId);

    void updateAvatarInfo(Long avatarId, Map<String, String> param);

    void updateAvatarEmoji(Long avatarId, Long emojiId);

    void updateAvatarLikes(Long avatarId, List<Long> likes);
    void updateAvatarDisLikes(Long avatarId, List<Long> disLikes);
    void logout(Long avatarId);

    void updatePickPoint(Long memberId1, Long memberId2);

    void updateLikeDisLikeCount(Long memberId, int likeCount, int disLikeCount);

    void updateWorld(Long avatarId, Integer worldId);
}
