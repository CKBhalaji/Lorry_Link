package project.lorry_link.lorry_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.lorry_link.lorry_backend.entity.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository <Role, Long>{
    Optional<Role> findByName(String name);
}
