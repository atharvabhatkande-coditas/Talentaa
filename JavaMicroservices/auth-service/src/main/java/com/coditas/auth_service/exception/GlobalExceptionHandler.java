package com.coditas.auth_service.exception;

import com.coditas.auth_service.dto.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


import java.sql.SQLException;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFoundException(NotFoundException e){
        ErrorResponse errorResponse=new ErrorResponse(e.getMessage(), Instant.now(), HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<>(errorResponse,HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AlreadyExistException.class)
    public ResponseEntity<ErrorResponse>handleAlreadyExistException(AlreadyExistException e){
        ErrorResponse errorResponse=new ErrorResponse(e.getMessage(), Instant.now(), HttpStatus.CONFLICT.value());
        return new ResponseEntity<>(errorResponse,HttpStatus.CONFLICT);
    }

    @ExceptionHandler({AuthenticationException.class, AuthorizationException.class})
    public ResponseEntity<ErrorResponse> handleAuthenticationException(Exception e){
        ErrorResponse errorResponse=new ErrorResponse(e.getMessage(), Instant.now(), HttpStatus.UNAUTHORIZED.value());
        return new ResponseEntity<>(errorResponse,HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ErrorResponse> handleForbiddenException(ForbiddenException e){
        ErrorResponse errorResponse=new ErrorResponse(e.getMessage(), Instant.now(), HttpStatus.FORBIDDEN.value());
        return new ResponseEntity<>(errorResponse,HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler({SqlException.class, SQLException.class,RuntimeException.class})
    public ResponseEntity<ErrorResponse> handleSqlException(Exception e){
        ErrorResponse errorResponse=new ErrorResponse(e.getMessage(), Instant.now(), HttpStatus.INTERNAL_SERVER_ERROR.value());
        return new ResponseEntity<>(errorResponse,HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>>handleValidationException(MethodArgumentNotValidException e){
        Map<String,String> errors=new HashMap<>();
        e.getBindingResult()
                .getFieldErrors()
                .forEach(error->errors.put(error.getField(),error.getDefaultMessage()));
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errors);
    }
}
