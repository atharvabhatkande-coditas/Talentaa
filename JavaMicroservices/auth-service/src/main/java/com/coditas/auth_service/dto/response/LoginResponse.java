package com.coditas.auth_service.dto.response;

import com.coditas.auth_service.enums.RoleType;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponse {
    private Long id;
    private String accessToken;
    private String refreshToken;
    private RoleType role;
}
