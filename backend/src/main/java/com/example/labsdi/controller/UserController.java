package com.example.labsdi.controller;

import com.example.labsdi.domain.UserProfile;
import com.example.labsdi.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private IUserService userService;

    @GetMapping("/user/profile/{username}")
    private UserProfile getUserProfile(@PathVariable("username") String username) {
        return userService.getUserProfile(username);
    }
}
