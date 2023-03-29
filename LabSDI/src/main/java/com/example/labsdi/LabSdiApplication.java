package com.example.labsdi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class LabSdiApplication {

    public static void main(String[] args) {
        SpringApplication.run(LabSdiApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/clients").allowedOrigins("http://0.0.0.0:80");
                registry.addMapping("/guitars").allowedOrigins("http://0.0.0.0:80");
                registry.addMapping("/shops").allowedOrigins("http://0.0.0.0:80");
                registry.addMapping("/transactions").allowedOrigins("http://0.0.0.0:80");
            }
        };
    }
}
