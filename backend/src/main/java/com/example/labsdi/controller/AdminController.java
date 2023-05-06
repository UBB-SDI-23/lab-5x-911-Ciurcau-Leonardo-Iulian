package com.example.labsdi.controller;

import org.apache.commons.lang3.SystemUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;

@RestController
@RequestMapping("/api")
public class AdminController {

    @GetMapping("/admin/test")
    public ResponseEntity<?> test() {
        if (!SystemUtils.IS_OS_LINUX) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new Object() {
            public String getMessage() {return "Server OS is not Linux";}
        });
        }

        try {
            String database = "mydb";
            String user = "dbuser";
            String password = "1234";
            String sqlCommand = "\"INSERT INTO user_created(id,user_id) VALUES (987654321,1);\"";
            String command = String.format(
                    "expect -c 'spawn psql -d %s -U %s -c %s; "+
                            "expect \"Password for user %s:\"; send \"%s\\n\"; interact'",
                    database, user, sqlCommand, user, password);
            ProcessBuilder pb = new ProcessBuilder("/bin/bash", "-c", command);
            pb.redirectErrorStream(true);
            Process process = pb.start();

            int exitCode = process.waitFor();
            System.out.println("Process exited with code " + exitCode);

            return ResponseEntity.ok(new Object() {
                public String getMessage() {return "ok";}
            });
        } catch (Exception e) {
            System.out.println(e.getMessage());
         return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new Object() {
             public String getMessage() {return "OS related error";}
         });
        }
    }
}
