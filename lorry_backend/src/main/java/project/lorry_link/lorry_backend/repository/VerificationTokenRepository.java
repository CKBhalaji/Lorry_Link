package project.lorry_link.lorry_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lorry_link.lorry_backend.entity.VerificationToken;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    Optional<VerificationToken> findByToken(String token);
    Optional<VerificationToken> findByEmail(String email);
	Optional<VerificationToken> findByEmailAndToken(String email, String token);
}