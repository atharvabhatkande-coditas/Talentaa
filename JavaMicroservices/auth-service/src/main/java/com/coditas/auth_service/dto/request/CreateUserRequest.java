package com.coditas.auth_service.dto.request;

import com.coditas.auth_service.enums.RoleType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateUserRequest {

    private String email;
    private String role;
}
