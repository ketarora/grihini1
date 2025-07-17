package com.example.Gruhani.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity

public class product {
    @Id
    String id;
    String name;
    String description;
    Boolean verified;
      String price;
       Float Rating;
    String badge;
    String deliverytime;
    String image;
    String kitchenvideourl;
    @ManyToOne
    @JoinColumn(name="seller_id")
    Seller seller;


}
