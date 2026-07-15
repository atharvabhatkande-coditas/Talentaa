package com.coditas.auth_service.repository;

import com.coditas.auth_service.entity.Otp;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpRepository extends JpaRepository<Otp,Long> {
    Optional<Otp> findByOtpValueAndEmail(String otp,  String email);
}
