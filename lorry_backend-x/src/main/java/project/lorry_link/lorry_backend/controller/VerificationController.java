package project.lorry_link.lorry_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.lorry_link.lorry_backend.service.VerificationService;
import project.lorry_link.lorry_backend.service.EmailService;

//@CrossOrigin("*")
@RestController
@RequestMapping("/api/verification")
public class VerificationController {
    @Autowired
    private VerificationService verificationService;
    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendVerificationEmail(@RequestParam String email) {
        String token = verificationService.createVerificationToken(email);
        String emailContent = "Welcome to Lorry Link!\n\nYour verification code is: " + token;
        emailService.sendEmail(email, "Lorry Link Verification Code", emailContent);
//        emailService.sendEmail(email, "Lorry Link verification Code", "Welcome to Lorry Link! \n\n Your verification code is: " + token);
        return ResponseEntity.ok("Verification email sent");
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyToken(@RequestParam String email, @RequestParam String token) {
        if (verificationService.validateToken(email, token)) {
            return ResponseEntity.ok("Email verified successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token");
    }
}
