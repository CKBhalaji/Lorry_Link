package project.lorry_link.lorry_backend.controller;

import project.lorry_link.lorry_backend.entity.Driver;
import project.lorry_link.lorry_backend.repository.DriverRepository;
import project.lorry_link.lorry_backend.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class DriverController {

    @Autowired
    private DriverService driverService;
    @Autowired
    private DriverRepository driverRepository;

    @PostMapping("/signup-driver")
    public Driver registerDriver(@RequestBody Driver driver) {
        return driverService.registerDriver(driver);
    }

    @PostMapping("/login-driver")
    public Driver loginDriver(@RequestParam String username, @RequestParam String password) {
        Driver driver = driverRepository.findByUsername(username);
            if (driver != null && driver.getPassword() != null && driver.getPassword().equals(password)) {
                return new ResponseEntity<>(driver, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
            }
    }
}
