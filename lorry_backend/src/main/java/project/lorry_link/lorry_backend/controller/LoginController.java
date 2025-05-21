package project.lorry_link.lorry_backend.controller;

import project.lorry_link.lorry_backend.entity.Driver;
import project.lorry_link.lorry_backend.entity.GoodsOwner;
import project.lorry_link.lorry_backend.repository.DriverRepository;
import project.lorry_link.lorry_backend.repository.GoodsOwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private GoodsOwnerRepository goodsOwnerRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password, @RequestParam String userType) {
        if (userType.equals("driver")) {
            Driver driver = driverRepository.findByUsername(username);
            if (driver != null && driver.getPassword() != null && driver.getPassword().equals(password)) {
                return new ResponseEntity<>(driver, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
            }
        } else if (userType.equals("goodsOwner")) {
            GoodsOwner goodsOwner = goodsOwnerRepository.findByUsername(username);
            if (goodsOwner != null && goodsOwner.getPassword() != null && goodsOwner.getPassword().equals(password)) {
                return new ResponseEntity<>(goodsOwner, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
            }
        } else {
            return new ResponseEntity<>("Invalid user type", HttpStatus.BAD_REQUEST);
        }
    }
}
