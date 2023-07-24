package com.vvs.peekpick.oauth.common.converters;

public interface ProviderUserConverter<T, R> {
    R converter(T t);

}
