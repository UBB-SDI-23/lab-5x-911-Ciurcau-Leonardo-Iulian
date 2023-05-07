package com.example.labsdi.controller;

import org.apache.commons.lang3.SystemUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;

@RestController
@RequestMapping("/api")
public class AdminController {

    @DeleteMapping("/admin/delete/all")
    public ResponseEntity<?> deleteAllRecords() {
        if (!SystemUtils.IS_OS_LINUX) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new Object() {
            public String getMessage() {return "Server OS is not Linux";}
        });
        }

        try {
            String command = "/home/ubuntu/deleteAllRecords.exp";
            ProcessBuilder pb = new ProcessBuilder("/bin/bash", "-c", command);
            pb.redirectErrorStream(true);
            Process process = pb.start();

            int exitCode = process.waitFor();
            System.out.println("Process exited with code " + exitCode);

            return ResponseEntity.ok(new Object() {
                public String getMessage() {return "All records deleted successfully";}
            });
        } catch (Exception e) {
            System.out.println(e.getMessage());
         return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(new Object() {
             public String getMessage() {return "OS related error";}
         });
        }
    }
}
