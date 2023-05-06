package com.example.labsdi.controller;

import org.apache.commons.lang3.SystemUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class AdminController {

    @GetMapping("/admin/test")
    public ResponseEntity<?> test() throws IOException {
        if (!SystemUtils.IS_OS_LINUX) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new Object() {
            public String getMessage() {return "Server OS is not Linux";}
        });
        }

        String shellScript = "mkdir testdir";
        Runtime.getRuntime().exec(shellScript);

        return ResponseEntity.ok(new Object() {
            public String getMessage() {return "ok";}
        });
    }
}
