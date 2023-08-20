package com.vvs.peekpick.picker.service;

import com.vvs.peekpick.entity.Chat;
import com.vvs.peekpick.exception.CustomException;
import com.vvs.peekpick.exception.ExceptionStatus;
import com.vvs.peekpick.picker.dto.ChatMemberDto;
import com.vvs.peekpick.picker.dto.ChatMessageDto;
import com.vvs.peekpick.picker.dto.ChatRoomDto;
import com.vvs.peekpick.picker.repository.ChatJpaRepository;
import com.vvs.peekpick.picker.repository.ChatRepository;
import com.vvs.peekpick.response.CommonResponse;
import com.vvs.peekpick.response.DataResponse;
import com.vvs.peekpick.response.ResponseService;
import com.vvs.peekpick.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final ChatRepository chatRepository;
    private final ChatJpaRepository chatJpaRepository;
    private final ResponseService responseService;

    /**
     * Redis Pub/Sub 을 위한 채팅방 (Topic) 획득 함수
     * @param roomId - 채팅방 UUID
     */
    public ChatRoomDto getChatRoom(String roomId) {
        return chatRepository.getTopic(roomId).orElseThrow(
                () -> new CustomException(ExceptionStatus.CHAT_ROOM_DOES_NOT_EXIST)
        );
    }

    /**
     * 채팅방을 생성하고 추후 로그 저장을 위해 RDB에도 생성
     * @return roomId - 채팅방 UUID
     */
    @Override
    public String createChatRoom(Long senderId, Long receiverId, LocalDateTime now) {
        String roomId = chatRepository.createChatRoom(now);
        Chat chatLog = Chat.builder()
                .roomId(roomId)
                .senderId(senderId)
                .receiverId(receiverId)
                .build();

        chatJpaRepository.save(chatLog);
        return roomId;
    }

    /**
     * 채팅방 나가기시 현재 채팅 내용을 구분자를 두고 문자열로 묶어 RDB에 저장
     *
     * @param roomId - 저장할 채팅방 내용
     * @return CommonResponse
     */
    @Override
    public CommonResponse exitChatRoom(String roomId) {
        List<String> objects = chatRepository.chatEnd(roomId);
        String delimiter = "\\D";

        StringBuilder sb = new StringBuilder();

        for (String str : objects){
            sb.append(str);
        }

        log.info("ExitChatRoom Start : {} ", sb.toString());

        // Log String 으로 변경
        Chat chat = Chat.builder()
                .roomId(roomId)
                .content(String.join(delimiter, objects))
                .build();
        log.info("Chatting Log : {}", chat.getContent());

        // Log 저장
        chatJpaRepository.save(chat);
        
        // 채팅방 (Topic) 삭제
        chatRepository.deleteChatRoomByRoomId(roomId);

        return responseService.successCommonResponse(ResponseStatus.CHATROOM_EXIT_SUCCESS);
    }

    /**
     * 레디스에 임시 채팅 로그 저장 ( 채팅 종료시 한번에 RDB 에 옮기기 위함 )
     * @param messageDto - 메시지
     */
    @Override
    public void appendLog(ChatMessageDto messageDto) {
        chatRepository.chatLogAppend(messageDto.toString(), messageDto.getRoomId());
    }

    @Override
    public DataResponse<?> getMembersByRoomId(String roomId) {
        ChatMemberDto chatMembers = chatJpaRepository.findMembersByRoomId(roomId).orElseThrow(
                () -> new CustomException(ExceptionStatus.CHAT_ROOM_DOES_NOT_EXIST)
        );
        return responseService.successDataResponse(ResponseStatus.RESPONSE_OK, chatMembers);
    }
}
