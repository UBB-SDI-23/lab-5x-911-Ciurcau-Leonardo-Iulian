package com.example.labsdi.controller;

import com.example.labsdi.domain.User;
import com.example.labsdi.domain.UserProfile;
import com.example.labsdi.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private IUserService userService;

    @GetMapping("/users/profile/{username}")
    private UserProfile getUserProfile(@PathVariable("username") String username) {
        return userService.getUserProfile(username);
    }

    @GetMapping("/users/{username}")
    private User getUserByUsername(@PathVariable("username") String username) {
        return (User) userService.loadUserByUsername(username);
    }

    @GetMapping("/users/{username}/id")
    private Object getUserIdByUsername(@PathVariable("username") String username) {
        return new Object() {
            public Long getId() {return ((User)userService.loadUserByUsername(username)).getId();}
        };
    }

    @PutMapping("/user/profile/{username}")
    private UserProfile updateUserProfile(@RequestBody UserProfile userProfile,
                                          @PathVariable("username") String username) {
        return userService.updateUserProfile(userProfile, username);
    }
}
