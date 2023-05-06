package com.example.labsdi.controller;

import com.example.labsdi.domain.User;
import com.example.labsdi.domain.UserProfile;
import com.example.labsdi.jwt.JwtTokenUtil;
import com.example.labsdi.service.IUserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private IUserService userService;

    @GetMapping("/users/profile/{username}")
    private UserProfile getUserProfile(@PathVariable("username") @NotBlank String username) {
        return userService.getUserProfile(username);
    }

    @GetMapping("/users/{username}")
    private User getUserByUsername(@PathVariable("username") @NotBlank String username) {
        return (User) userService.loadUserByUsername(username);
    }

    @GetMapping("/users/{username}/id")
    private Object getUserIdByUsername(@PathVariable("username") @NotBlank String username) {
        return new Object() {
            public Long getId() {return ((User)userService.loadUserByUsername(username)).getId();}
        };
    }

    @GetMapping("/users/{username}/roles")
    private Object getUserRolesByUsername(@PathVariable("username") @NotBlank String username) {
        return new Object() {
            public String getRoles() {
                return userService.loadUserByUsername(username).getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .reduce("[", (a, b) -> a + "," + b)
                        .concat("]");
            }
        };
    }

    @GetMapping("/users/roles/page/{page}")
    private ResponseEntity<?> getUsersWithRolesPage(@PathVariable("page") @NotNull Integer page) {
        try {
            return ResponseEntity.ok(userService.getUsersPage(page).map(User::toDTO));
        }
        catch (Exception ex) {
            return ResponseEntity.badRequest().body(null);
        }
    }


    @PutMapping("/users/profile/{username}")
    private ResponseEntity<?> updateUserProfile(
            @RequestHeader("Authorization") @NotBlank String authorization,
            @RequestBody @Valid UserProfile userProfile,
            @PathVariable("username") @NotBlank String username) {
        String requestUsername = JwtTokenUtil.getUsernameFromAuthorizationHeader(authorization);
        if (requestUsername.equals(username) ||
                JwtTokenUtil.getRolesFromAuthorizationHeader(authorization).contains("MODERATOR")) {
            return ResponseEntity.ok(userService.updateUserProfile(userProfile, username));
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    @PutMapping("/users/{username}/roles")
    private ResponseEntity<?> updateUserRoles(
            @PathVariable("username") @NotBlank String username,
            @RequestBody List<String> roles) {
        try {
            return ResponseEntity.ok(userService.updateUserRoles(username, roles));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
