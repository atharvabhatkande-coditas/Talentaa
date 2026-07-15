package com.coditas.auth_service.repository;

import com.coditas.auth_service.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken,Long> {
   Optional<RefreshToken> findByEmailAndRefreshToken(String email, String token);
}
