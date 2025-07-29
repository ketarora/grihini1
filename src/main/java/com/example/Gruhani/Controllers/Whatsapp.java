package com.example.Gruhani.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Whatsapp {
    String VERIFY_TOKEN = "gruhani-token";


       // same as the one you gave in dashboard

        @GetMapping("/got-message")
        public ResponseEntity<String> verifyWebhook(
                @RequestParam("hub.mode") String mode,
                @RequestParam("hub.verify_token") String token,
                @RequestParam("hub.challenge") String challenge) {
            System.out.print("reached inside");

            if ("subscribe".equals(mode) && VERIFY_TOKEN.equals(token)) {
                return ResponseEntity.ok(challenge);  // ✅ Verification success
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Verification failed kutttsss");
            }

    }

}
