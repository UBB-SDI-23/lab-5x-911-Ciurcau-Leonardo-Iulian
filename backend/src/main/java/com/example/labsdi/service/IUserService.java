package com.example.labsdi.service;

import com.example.labsdi.domain.RegisterRequest;
import com.example.labsdi.domain.User;
import com.example.labsdi.domain.UserProfile;
import com.example.labsdi.service.exception.UserServiceException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IUserService extends UserDetailsService {
    UserDetails loadUserByEmail(String email);
    User register(RegisterRequest request) throws UserServiceException;
    String generateVerificationCode();
    Boolean confirmRegistration(String confirmationCode);
    UserProfile getUserProfile(String username);
    UserProfile updateUserProfile(UserProfile userProfile, String username);
}
