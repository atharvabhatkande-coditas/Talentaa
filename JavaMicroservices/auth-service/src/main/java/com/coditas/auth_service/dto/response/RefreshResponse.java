package com.coditas.auth_service.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RefreshResponse {

    private String accessToken;
}
