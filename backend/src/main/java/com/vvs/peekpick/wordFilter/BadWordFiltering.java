package com.vvs.peekpick.wordFilter;



import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class BadWordFiltering implements BadWords {
    private final Set<String> set = new HashSet<>(List.of(koreaWords));
    private String substituteValue = "♡";

    //대체 문자 지정 (기본값 : *)
    public BadWordFiltering(String substituteValue) {
        this.substituteValue = substituteValue;
    }

    public String changeAll(String text) {
        for (String word : set) {
            String patternWord = word.chars()
                    .mapToObj(c -> Pattern.quote(String.valueOf((char) c)))
                    .collect(Collectors.joining(".*?"));  // 욕설 문자 사이에 모든 문자 및 공백을 포함

            text = Pattern.compile(patternWord, Pattern.DOTALL)
                    .matcher(text)
                    .replaceAll(v -> substituteValue.repeat(v.group().length()));
        }
        return text;
    }

}