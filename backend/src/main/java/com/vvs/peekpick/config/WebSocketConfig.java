package com.vvs.peekpick.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 구독을 위한 prefix
        config.enableSimpleBroker("/sub");
        // 메시지 발행을 위한 prefix
        config.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {

        registry.addEndpoint("/ws") // WebSocket 연결을 위한 엔드포인트
                .setAllowedOriginPatterns("*") // Access Control Allow Origin 설정
                .withSockJS(); // SockJs 이용 - 낮은 버전의 브라우저에서도 지원 가능
    }
}
