package com.coditas.auth_service.service;

import com.coditas.auth_service.dto.request.*;
import com.coditas.auth_service.dto.response.*;
import com.coditas.auth_service.entity.Otp;
import com.coditas.auth_service.entity.RefreshToken;
import com.coditas.auth_service.entity.User;
import com.coditas.auth_service.enums.RoleType;
import com.coditas.auth_service.exception.AlreadyExistException;
import com.coditas.auth_service.exception.AuthenticationException;
import com.coditas.auth_service.exception.AuthorizationException;
import com.coditas.auth_service.exception.NotFoundException;
import com.coditas.auth_service.repository.OtpRepository;
import com.coditas.auth_service.repository.RefreshTokenRepository;
import com.coditas.auth_service.repository.UserRepository;
import com.coditas.auth_service.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Objects;

import static com.coditas.auth_service.constants.EmailConstants.CREATION_EMAIL;
import static com.coditas.auth_service.constants.EmailConstants.EMAIL_TEXT;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String senderEmail;
    private final OtpRepository otpRepository;
    private final JwtUtil jwtUtil;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public OtpResponse sendOtp(@Valid OtpRequest otpRequest) {
        User user=userRepository.findByEmail(otpRequest.getEmail())
                .orElseThrow(()->new NotFoundException("Email not Registered"));


        String code= String.format("%08d", new SecureRandom().nextInt(10_000_000));
        SimpleMailMessage simpleMailMessage=new SimpleMailMessage();
        simpleMailMessage.setSubject("One Time Password To Verify Email");
        simpleMailMessage.setTo(otpRequest.getEmail());
        simpleMailMessage.setFrom(senderEmail);
        simpleMailMessage.setText(String.format(EMAIL_TEXT,code));
        javaMailSender.send(simpleMailMessage);

        Otp otp=Otp.builder()
                .email(otpRequest.getEmail())
                .otpValue(code)
                .expireAt(Instant.now().plusSeconds(300))
                .build();
        otpRepository.save(otp);
        return OtpResponse.builder()
                .message("Otp Sent Successfully")
                .build();
    }
    @Transactional
    public LoginResponse login(LoginRequest loginRequest) {
        User user=userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(()->new NotFoundException("Email not Registered"));

        Otp otp=otpRepository.findByOtpValueAndEmail(loginRequest.getOtp(),loginRequest.getEmail())
                .orElseThrow(()->new AuthorizationException("Invalid Otp"));

        if(otp.getExpireAt().isBefore(Instant.now())){
            throw new AuthorizationException("Otp Expired");
        }
        String accessToken= jwtUtil.generateJwtToken(user.getEmail(),user.getRole());
        String refreshToken= jwtUtil.generateRefreshToken();

        RefreshToken refreshToken1=RefreshToken.builder()
                .refreshToken(refreshToken)
                .expireAt(Instant.now().plusSeconds(3000))
                .email(user.getEmail())
                .build();
        refreshTokenRepository.save(refreshToken1);

        return LoginResponse.builder()
                .id(user.getId())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .role(user.getRole())
                .build();
    }


    public PageRefreshResponse pageRefresh(HttpServletRequest httpRequest) {
        String email=jwtUtil.getEmailFromHeader(httpRequest);

        User user=userRepository.findByEmail(email)
                .orElseThrow(()->new AuthorizationException("User Not found"));

       return PageRefreshResponse.builder()
                .id(user.getId())
                .role(user.getRole())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build();
    }
    @Transactional
    public UserCreationResponse createUser(CreateUserRequest createUserRequest) {
        User user=userRepository.findByEmail(createUserRequest.getEmail())
                .orElse(null);

        if(!Objects.isNull(user)){
            throw new AlreadyExistException("User Account Already Exist");
        }

        User newUser=User.builder()
                .email(createUserRequest.getEmail())
                .isActive(false)
                .role(RoleType.valueOf(createUserRequest.getRole()))
                .firstName("")
                .lastName("")
                .build();

        userRepository.save(newUser);

        SimpleMailMessage simpleMailMessage=new SimpleMailMessage();
        simpleMailMessage.setSubject("Welcome To Talenta");
        simpleMailMessage.setTo(createUserRequest.getEmail());
        simpleMailMessage.setFrom(senderEmail);
        simpleMailMessage.setText(String.format(CREATION_EMAIL));
        javaMailSender.send(simpleMailMessage);

        return UserCreationResponse.builder()
                .message("User Created Successfully, Email Sent Successfully")
                .build();

    }
    @Transactional
    public LogoutResponse logout(User user, LogoutRequest logoutRequest) {
        RefreshToken refreshToken=refreshTokenRepository.findByEmailAndRefreshToken(user.getEmail(),logoutRequest.getRefreshToken())
                .orElseThrow(()-> new NotFoundException("LOGIN_AGAIN"));

        refreshToken.setRefreshToken(null);
        refreshTokenRepository.save(refreshToken);

        return LogoutResponse.builder()
                .message("LOGOUT_SUCCESSFUL")
                .build();
    }

    public RefreshResponse refresh(RefreshRequest request,User user) {
        RefreshToken refreshToken=refreshTokenRepository.findByEmailAndRefreshToken(user.getUsername(),request.getRefreshToken())
                .orElseThrow(()-> new NotFoundException("LOGIN_AGAIN"));

        if(!Objects.equals(request.getRefreshToken(),refreshToken.getRefreshToken())){
            throw new AuthenticationException("LOGIN_AGAIN");
        }
        if(refreshToken.getExpireAt().isBefore(Instant.now())){
            throw new AuthenticationException("LOGIN_AGAIN");
        }

        String accessToken=jwtUtil.generateJwtToken(user.getUsername(),user.getRole());

        return RefreshResponse.builder()
                .accessToken(accessToken)
                .build();


    }
}
