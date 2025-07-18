package com.example.Gruhani.Controllers;

import com.example.Gruhani.Repositories.ProductRepo;
import com.example.Gruhani.Repositories.SellerRepo;
import com.example.Gruhani.dtos.productdto;
import com.example.Gruhani.models.Seller;
import com.example.Gruhani.models.product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
@RestController
public class products_seller {
    @Autowired
    SellerRepo sr;
    @Autowired
    ProductRepo prepo;

    @PostMapping("/add-product")
public ResponseEntity<?> method (@RequestBody productdto pdto) {
        System.out.println("inside add prodict");
        Map<String, Object> response = new HashMap<>(); ;
        try {
            product pr = new product();
            pr.setDescription(pdto.getDescription());
            pr.setImage(pdto.getImage());
            pr.setPrice(pdto.getPrice());
            pr.setName(pdto.getName());
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Object principal = authentication.getPrincipal();
            System.out.println("pehle instanve ke");
            if (principal instanceof UserDetails) {
                System.out.println("bbad instanve ke"+principal);
                UserDetails user = (UserDetails) principal;
                System.out.println("Username: " + user.getUsername());
                System.out.println("Authorities: " + user.getAuthorities());
                System.out.println("email");
                Seller seller = sr.findByemail(user.getUsername());
                System.out.println("pseller"+seller);
                pr.setSeller(seller);
            }
            System.out.print("product"+pr);
            pr.setId(java.util.UUID.randomUUID().toString());
            prepo.save(pr);

            response.put("success", true);
            response.put("message", "Seller registered successfully");


            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Registration failed: " + e.getMessage());

            return ResponseEntity.badRequest().body(response);
        }


    }
}
