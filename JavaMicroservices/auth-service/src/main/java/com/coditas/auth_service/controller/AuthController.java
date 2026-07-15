package com.coditas.auth_service.controller;

import com.coditas.auth_service.dto.request.*;
import com.coditas.auth_service.dto.response.*;
import com.coditas.auth_service.entity.User;
import com.coditas.auth_service.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/get-otp")
    public ResponseEntity<OtpResponse> getOtp(@Valid @RequestBody OtpRequest otpRequest){
        return ResponseEntity.status(HttpStatus.OK).body(authService.sendOtp(otpRequest));
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse>login(@Valid @RequestBody LoginRequest loginRequest){
        return ResponseEntity.status(HttpStatus.OK).body(authService.login(loginRequest));

    }
    @GetMapping("/me")
    public ResponseEntity<PageRefreshResponse>pageRefresh(HttpServletRequest httpRequest){
        return ResponseEntity.status(HttpStatus.OK).body(authService.pageRefresh(httpRequest));
    }
    @PostMapping("/admin/users")
    public ResponseEntity<UserCreationResponse>createUser(
            @Valid @RequestBody CreateUserRequest createUserRequest,
            @RequestHeader(value = "X-Role", required = false) String role,@AuthenticationPrincipal User user)
    {
        return ResponseEntity.status(HttpStatus.OK).body(authService.createUser(createUserRequest));
    }

    @PostMapping("/logout")
    public ResponseEntity<LogoutResponse>logoutUser(@AuthenticationPrincipal User user, @Valid @RequestBody LogoutRequest logoutRequest){
        return new ResponseEntity<>(authService.logout(user,logoutRequest), HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshResponse>generateAccessToken(@Valid @RequestBody RefreshRequest request, @AuthenticationPrincipal User user){
        return new ResponseEntity<>(authService.refresh(request,user), HttpStatus.OK);
    }

}
