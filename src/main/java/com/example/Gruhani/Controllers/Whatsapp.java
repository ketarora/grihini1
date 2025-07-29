package com.example.Gruhani.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.Map;

@RestController
public class Whatsapp {
    String VERIFY_TOKEN = "gruhani-token";


       // same as the one you gave in dashboard
    @PostMapping("/got-message")
    public ResponseEntity<String>message(@RequestBody Map<String, Object> payload)
    {
        System.out.println("mesaage form user0"+payload);
        return ResponseEntity.ok("done");
      }




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
