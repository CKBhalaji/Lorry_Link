package project.lorry_link.lorry_backend.repository;

import project.lorry_link.lorry_backend.entity.GoodsOwner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoodsOwnerRepository extends JpaRepository<GoodsOwner, Long> {
    GoodsOwner findByUsername(String username);
}
