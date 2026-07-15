package com.coditas.auth_service.service;

import com.coditas.auth_service.exception.AuthorizationException;
import com.coditas.auth_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserService  implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)  {
      return userRepository.findByEmail(username)
              .orElseThrow(()->new AuthorizationException("USER NOT_FOUND"));
    }
}
