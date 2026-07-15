package com.coditas.auth_service.util;

import com.coditas.auth_service.enums.RoleType;
import com.coditas.auth_service.exception.AuthorizationException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtil {

    private final long accessExpiration;
    private final SecretKey key;

    public JwtUtil(@Value("${jwt.accessExpiration}") long accessExpiration, @Value("${jwt.secret}") String secret) {
        key = Keys.hmacShaKeyFor(secret.getBytes());
        this.accessExpiration = accessExpiration;
    }

    public String generateJwtToken(String email, RoleType role) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuer("talenta")
                .setIssuedAt(new Date())
                .claim("role", role)
                .setExpiration(new Date(System.currentTimeMillis() + accessExpiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken() {
        return UUID.randomUUID().toString();
    }

    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public String getEmailFromHeader(HttpServletRequest request) {

        String header = request.getHeader("Authorization");
        String token = null;

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            return extractUsername(token);
        }else{
            throw new AuthorizationException("UNAUTHORIZED");
        }
    }
}
