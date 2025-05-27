package project.lorry_link.lorry_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import project.lorry_link.lorry_backend.dto.DriverDto;
import project.lorry_link.lorry_backend.entity.Driver;
import project.lorry_link.lorry_backend.service.DriverService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @PostMapping("/register")
    public ResponseEntity<DriverDto> registerDriver(@RequestBody DriverDto driverDto) {
        DriverDto registeredDriver = driverService.registerDriver(driverDto);

        return new ResponseEntity<>(registeredDriver, HttpStatus.CREATED);
    }

    @GetMapping("/username")
    public ResponseEntity<DriverDto> getUserByusername(@RequestParam String username){
        DriverDto driverDto = driverService.getDriverBYUsername(username);
        return new ResponseEntity<>(driverDto, HttpStatus.OK);
    }

    @GetMapping("/useremail")
    public ResponseEntity<DriverDto> getUserByuseremail(@RequestParam String email){
        DriverDto driverDto = driverService.gerDriverByUserEmail(email);
        return new ResponseEntity<>(driverDto, HttpStatus.OK);
    }

    @GetMapping("/alldriver")
    public ResponseEntity<List<DriverDto>> getAllDrivers(){
        List<DriverDto> drivers = driverService .getAllDrivers();
        return new ResponseEntity<>(drivers, HttpStatus.OK);
    }

    @PutMapping("/updatedriver") // Or @PostMapping
    public ResponseEntity<DriverDto> updateDriver(@RequestParam String email, @RequestBody DriverDto driverDto) {
        DriverDto udriverDto = driverService.updateDriver(email, driverDto);
        return new ResponseEntity<>(udriverDto, HttpStatus.OK);
    }

    @PutMapping("/updatepassword")
    public ResponseEntity<DriverDto> updatePassword(@RequestParam String email, @RequestBody DriverDto driverDto){
        DriverDto updatedpsaaword = driverService.updatePassword(email, driverDto);
        return new ResponseEntity<>(updatedpsaaword, HttpStatus.OK);
    }

    @DeleteMapping("/deletedriver")
    public ResponseEntity<String> deleteDriver(@RequestParam String email){
        driverService.deleteDriver(email);
        return ResponseEntity.ok("Driver Deleted Sucessfully");
    }
}
