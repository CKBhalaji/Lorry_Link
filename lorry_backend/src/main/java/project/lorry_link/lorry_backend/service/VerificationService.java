package project.lorry_link.lorry_backend.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.lorry_link.lorry_backend.entity.VerificationToken;
import project.lorry_link.lorry_backend.repository.VerificationTokenRepository;

@Service
public class VerificationService {
    @Autowired
    private VerificationTokenRepository tokenRepository;

    public String createVerificationToken(String email) {
    	int otp = 1000 + new Random().nextInt(9000);
    	String token = String.valueOf(otp);
//        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setEmail(email);
        verificationToken.setToken(token);
        verificationToken.setExpiryDate(LocalDateTime.now().plusMinutes(5));
        tokenRepository.save(verificationToken);
        return token;
    }

    public boolean validateToken(String email, String token) {
        Optional<VerificationToken> verificationToken = tokenRepository.findByEmailAndToken(email, token);
        return verificationToken.isPresent() &&
                verificationToken.get().getExpiryDate().isAfter(LocalDateTime.now());
    }
}
