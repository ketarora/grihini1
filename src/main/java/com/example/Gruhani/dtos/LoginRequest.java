package com.example.Gruhani.dtos;

import org.springframework.stereotype.Component;

@Component
public class LoginRequest {
     String email;
     String password;
    String userType;

    public String getEmail() {
        return email;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getUsername() {
        return email;
    }

    public void setEmail(String username) {
      email = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
