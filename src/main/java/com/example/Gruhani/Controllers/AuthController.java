package com.example.Gruhani.Controllers;

import com.example.Gruhani.Repositories.SellerRepo;
import com.example.Gruhani.Repositories.UserRepo;
import com.example.Gruhani.dtos.LoginRequest;
import com.example.Gruhani.dtos.sellerDto;
import com.example.Gruhani.models.Seller;
import com.example.Gruhani.models.Users;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {

    @Autowired
     AuthenticationManager authenticationManager;
    @Autowired
      UserRepo ur;
    @Autowired
    SellerRepo srepo;



    @GetMapping("/home")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> home() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> response = new HashMap<>();
        
        if (auth != null && auth.isAuthenticated() && !auth.getName().equals("anonymousUser")) {
            Map<String, Object> user = new HashMap<>();
            user.put("id", "1");
            user.put("name", auth.getName());
            user.put("email", auth.getName());
            user.put("type", "customer");
            
            response.put("authenticated", true);
            response.put("user", user);
            response.put("message", "Welcome to Gruhani!");
        } else {
            response.put("authenticated", false);
            response.put("message", "Please login to continue");
        }
        
        return ResponseEntity.ok(response);
    }
@PostMapping("/register-seller")
public ResponseEntity<?> sellerRegister(@RequestBody sellerDto sd)
{
    System.out.print("inside-sller");
    System.out.print("seller-mail"+sd.getEmail());

    Users us=ur.findByemail(sd.getEmail());
    System.out.print("user-seller"+us);

    if(us==null)
    {
        return ResponseEntity.notFound().build();
    }
    Seller seller=new Seller();
    seller.setContactNo(sd.getPhone());
    seller.setName(sd.getName());
    seller.setBusinessName(sd.getBusinessName());
    seller.setApproved(false);
    seller.setUser(us);
    seller.setId(java.util.UUID.randomUUID().toString());
    seller.setCategories(sd.getCategories());
    srepo.save(seller);
    System.out.print("final seller"+seller);
    return ResponseEntity.ok(Map.of(
        "success", true,
        "message", "Login successful as a seller",
        "seller", Map.of(
                "id", seller.getId(),
                "name", seller.getName(),
                "businessName", seller.getBusinessName(),
                "email", seller.getEmail()
        )
));

}
    @PostMapping("/logins")
    public ResponseEntity<?> loginPage(@RequestBody LoginRequest lr) {
        Authentication authentication;
        try {
            System.out.print("inside login");

            Authentication auth = new UsernamePasswordAuthenticationToken(lr.getUsername(), lr.getPassword());
            System.out.print("auth details: " + auth);

             authentication = authenticationManager.authenticate(auth);
            System.out.print("authentication: " + authentication); // Will print only if success
        } catch (Exception e) {
            System.out.println("❌ Exception during authentication: " + e.getMessage());
            e.printStackTrace(); // Print full stack trace
        }

        Users user=ur.findByemail(lr.getUsername());
        if(user==null )
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "success", false,
                    "message", "Invalid email or password"
            ));
        }

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Login successful",
                "user", Map.of(
                        "id", user.getId(),
                        "name", user.getName(),
                        "email", user.getEmail(),
                        "role", user.getRole()
                )
        ));

         // Redirect to frontend login
    }
}