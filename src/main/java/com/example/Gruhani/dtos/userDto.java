package com.example.Gruhani.dtos;

import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;

import java.nio.ByteBuffer;
import java.util.Base64;
import java.util.UUID;

public class userDto {
    @Id
            String id;
    String name;
    String email;
    String contact;
    String password;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


}
