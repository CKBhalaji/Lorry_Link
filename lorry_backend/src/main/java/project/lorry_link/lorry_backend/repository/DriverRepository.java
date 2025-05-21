package project.lorry_link.lorry_backend.repository;

import project.lorry_link.lorry_backend.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepository extends JpaRepository<Driver, Long> {
    Driver findByUsername(String username);
}
