package com.coditas.auth_service.dto.response;

import com.coditas.auth_service.enums.RoleType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PageRefreshResponse {

    private Long id;
    private RoleType role;
    private String firstName;
    private String lastName;
    private String email;
}
