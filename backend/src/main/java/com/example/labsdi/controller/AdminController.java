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
            String command = "psql -d mydb -U dbuser -W -c 'INSERT INTO courier(id) VALUES (987654321);'";

            ProcessBuilder builder = new ProcessBuilder("sh", "-c", command);
            builder.redirectInput(ProcessBuilder.Redirect.from(new File("/dev/null")));
            builder.redirectOutput(ProcessBuilder.Redirect.to(new File("/dev/null")));
            builder.redirectError(ProcessBuilder.Redirect.to(new File("/dev/null")));
            Process process = builder.start();

            OutputStream stdin = process.getOutputStream();
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(stdin));
            writer.write("1234" + "\n");
            writer.flush();

            int exitCode = process.waitFor();
            System.out.println("Command exited with code " + exitCode);

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
