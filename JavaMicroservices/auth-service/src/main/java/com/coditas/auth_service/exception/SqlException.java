package com.coditas.auth_service.exception;

public class SqlException extends RuntimeException {
    public SqlException(String message) {
        super(message);
    }
}
