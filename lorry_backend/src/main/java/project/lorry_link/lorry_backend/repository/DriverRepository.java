package project.lorry_link.lorry_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import project.lorry_link.lorry_backend.entity.Driver;

public interface DriverRepository extends JpaRepository<Driver, Long> {
    
    // Custom query methods can be added here
    Optional<Driver> findByUsername(String username);
    Optional<Driver> findByEmail(String email);

    void deleteByEmail(String email);

    boolean existsByEmail(String email);
    // Driver findByPhoneNumber(String phoneNumber);
    // Driver findByAadharNumber(String aadharNumber);
}