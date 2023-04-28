package com.example.labsdi.service;

import com.example.labsdi.config.SecurityConfig;
import com.example.labsdi.domain.RegisterRequest;
import com.example.labsdi.domain.User;
import com.example.labsdi.repository.IUserRepository;
import com.example.labsdi.service.exception.UserServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(
                        () -> new UsernameNotFoundException("User with username " + username + " not found.")
                );
    }

    @Override
    public UserDetails loadUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(
                        () -> new UsernameNotFoundException("User with email " + email + " not found")
                );
    }

    @Override
    public User register(RegisterRequest request) throws UserServiceException {
        String password = SecurityConfig.passwordEncoder().encode(request.getPassword());
        String username = request.getUsername();
        String email = request.getEmail();

        if (userRepository.findByEmail(email).isPresent()) {
            throw new UserServiceException("Email " + email + " is already used");
        }

        if (userRepository.findByUsername(username).isPresent()) {
            throw new UserServiceException("Username " + username + " is already used");
        }

        User newUser = new User(null, request.getUsername(), password, request.getEmail());
        return userRepository.save(newUser);
    }
}
