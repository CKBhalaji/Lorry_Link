package project.lorry_link.lorry_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import project.lorry_link.lorry_backend.dto.DriverDto;
import project.lorry_link.lorry_backend.entity.Driver;
import project.lorry_link.lorry_backend.repository.DriverRepository;
import project.lorry_link.lorry_backend.service.DriverService;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    @Autowired
    private DriverService driverService;

    private DriverRepository driverRepository;

//    @PostMapping("/register")
//    public ResponseEntity<DriverDto> registerDriver(@RequestBody DriverDto driverDto) {
//        DriverDto registeredDriver = driverService.registerDriver(driverDto);
//
//        return new ResponseEntity<>(registeredDriver, HttpStatus.CREATED);
//    }

    @PostMapping(
            value = "/register",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<DriverDto> registerDriver(
            @RequestPart("driver") DriverDto driverDto,
            @RequestPart("drivingLicense") MultipartFile drivingLicense,
            @RequestPart("insurance") MultipartFile insurance) {

        try {
            // File handling
            String drivingLicenseFileName = storeFile(drivingLicense, driverDto.getEmail());
            String insuranceFileName = storeFile(insurance, driverDto.getEmail());

            // Update DTO with filenames
            driverDto.setDrivingLicenseFileName(drivingLicenseFileName);
            driverDto.setInsuranceFileName(insuranceFileName);

            DriverDto registeredDriver = driverService.registerDriver(driverDto);
            return new ResponseEntity<>(registeredDriver, HttpStatus.CREATED);
        } catch (IOException ex) {
            throw new RuntimeException("File storage failed", ex);
        }
    }

    private String storeFile(MultipartFile file, String email) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        String sanitizedEmail = email.replaceAll("[^a-zA-Z0-9]", "_");
        String originalFilename = file.getOriginalFilename();
        String fileExtension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            int lastDotIndex = originalFilename.lastIndexOf('.');
            fileExtension = originalFilename.substring(lastDotIndex);
        }
        String fileName = sanitizedEmail
                + "_" + (originalFilename != null ? originalFilename : "file")
                + fileExtension;
        Path uploadPath = Paths.get("uploads");
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Save file
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return fileName;
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

    @PostMapping("/check-email")
    public ResponseEntity<?> checkEmailExists(@RequestParam String email) {
        boolean exists = driverService.checkEmailExists(email);
        return exists
                ? ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered")
                : ResponseEntity.ok().build();
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

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("uploads").resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .header("Content-Disposition", "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
