package com.orellana.products.Exceptions;

public class NameValueRequiredException extends RuntimeException{
    public NameValueRequiredException(String message){
        super(message);
    }
}