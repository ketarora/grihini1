package com.example.Gruhani.dtos;

import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;

import java.nio.ByteBuffer;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

public class sellerDto {

    private String name;
    private String email;
    private  String phone;
    private String businessName;
    private List<String> categories;



    public String getName() {
        return name;
    }

    public void setname(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email=email;}
    public String getPhone() {
        return phone;
    }


    public void setPhone(String contactNumber) {
        this.phone = contactNumber;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }
}
