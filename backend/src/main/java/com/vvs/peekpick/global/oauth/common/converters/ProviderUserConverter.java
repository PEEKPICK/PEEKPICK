package com.vvs.peekpick.global.oauth.common.converters;

public interface ProviderUserConverter<T, R> {
    R converter(T t);

}
