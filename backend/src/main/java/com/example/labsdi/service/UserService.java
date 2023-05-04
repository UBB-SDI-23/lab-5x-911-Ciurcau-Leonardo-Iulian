package com.example.labsdi.service;

import com.example.labsdi.config.SecurityConfig;
import com.example.labsdi.domain.Authority;
import com.example.labsdi.domain.RegisterRequest;
import com.example.labsdi.domain.User;
import com.example.labsdi.domain.UserProfile;
import com.example.labsdi.repository.IUserProfileRepository;
import com.example.labsdi.repository.IUserRepository;
import com.example.labsdi.service.exception.UserServiceException;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IUserProfileRepository userProfileRepository;

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

        Optional<User> foundUser = userRepository.findByEmail(email);

        if (foundUser.isPresent() && foundUser.get().isEnabled()) {
            throw new UserServiceException("Email " + email + " is already used");
        }

        foundUser = userRepository.findByUsername(username);

        if (foundUser.isPresent() && foundUser.get().isEnabled()) {
            throw new UserServiceException("Username " + username + " is already used");
        }

        if (foundUser.isPresent()) {
            User foundUserObj = foundUser.get();
            if (!foundUserObj.getUsername().equals(username) || !foundUserObj.getEmail().equals(email)
            || !SecurityConfig.passwordEncoder().matches(request.getPassword(), foundUserObj.getPassword())) {
                throw new UserServiceException("Credentials are already used or are invalid!");
            }
            else {
                foundUserObj.setConfirmationCode(generateVerificationCode());
                foundUserObj.setConfirmationCodeSetTime(System.currentTimeMillis());
                return userRepository.save(foundUserObj);
            }
        }

        else {
            User newUser = new User(null, username, password, email,
                    generateVerificationCode(), System.currentTimeMillis(), false,
                    List.of(new Authority(null, null, "REGULAR")));

            return userRepository.save(newUser);
        }
    }

    @Override
    public String generateVerificationCode() {
        return RandomString.make(8);
    }

    @Override
    public Boolean confirmRegistration(String confirmationCode) {
        Optional<User> userOpt = userRepository.findByConfirmationCode(confirmationCode);
        if (userOpt.isEmpty())
            return false;
        else {
            User user = userOpt.get();
            if (System.currentTimeMillis() - user.getConfirmationCodeSetTime() >
            10L * 60L * 1000L) { // 10 minutes
                return false;
            }
            user.setIsEnabled(true);
            user.setConfirmationCode("");
            userRepository.save(user);
            return true;
        }
    }

    @Override
    public UserProfile getUserProfile(String username) {
        try {
            User user = (User) loadUserByUsername(username);
            Optional<UserProfile> userProfileOptional = userProfileRepository.findByUser(user);
            return userProfileOptional.orElseGet(() -> UserProfile.builder().user(user).build());
        }
        catch (UsernameNotFoundException e) {
            return null;
        }
    }

    @Override
    public UserProfile updateUserProfile(UserProfile userProfile, String username) {
        UserProfile retrievedUserProfile = getUserProfile(username);
        if (Objects.isNull(retrievedUserProfile))
            return null;

        if (Objects.nonNull(userProfile.getAddress()) && !"".equals(userProfile.getAddress()))
            retrievedUserProfile.setAddress(userProfile.getAddress());
        if (Objects.nonNull(userProfile.getFirstName()) && !"".equals(userProfile.getFirstName()))
            retrievedUserProfile.setFirstName(userProfile.getFirstName());
        if (Objects.nonNull(userProfile.getLastName()) && !"".equals(userProfile.getLastName()))
            retrievedUserProfile.setLastName(userProfile.getLastName());
        if (Objects.nonNull(userProfile.getTelephoneNumber()) && !"".equals(userProfile.getTelephoneNumber()))
            retrievedUserProfile.setTelephoneNumber(userProfile.getTelephoneNumber());
        if (Objects.nonNull(userProfile.getBirthDate()))
            retrievedUserProfile.setBirthDate(userProfile.getBirthDate());
        return userProfileRepository.save(retrievedUserProfile);
    }
}
