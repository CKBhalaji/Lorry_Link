package project.lorry_link.lorry_backend.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import project.lorry_link.lorry_backend.dto.DriverDto;
import project.lorry_link.lorry_backend.entity.Driver;
import project.lorry_link.lorry_backend.entity.Role;
import project.lorry_link.lorry_backend.mapper.DriverMapper;
import project.lorry_link.lorry_backend.repository.DriverRepository;
import project.lorry_link.lorry_backend.repository.RoleRepository;
import project.lorry_link.lorry_backend.security.JWTUtil;
import project.lorry_link.lorry_backend.service.DriverService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final DriverService driverService;
    private final DriverRepository driverRepository;

    public DriverController(AuthenticationManager authenticationManager, JWTUtil jwtUtil, RoleRepository roleRepository, PasswordEncoder passwordEncoder, DriverService driverService, DriverRepository driverRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.driverService = driverService;
        this.driverRepository = driverRepository;
    }

//    @PostMapping(
//            value = "/register",
//            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
//            produces = MediaType.APPLICATION_JSON_VALUE
//    )
//    public ResponseEntity<String> registerDriver(
//            @RequestPart("driver") DriverDto driverDto,
//            @RequestPart("drivingLicense") MultipartFile drivingLicense,
//            @RequestPart("insurance") MultipartFile insurance) {
//
//        if (driverRepository.findByUsername(driverDto.getUsername()).isPresent()) {
//            return ResponseEntity.badRequest().body("Username is alredy taken");
//        }
//
//        try {
//            // File handling
//            String drivingLicenseFileName = storeFile(drivingLicense, driverDto.getEmail());
//            String insuranceFileName = storeFile(insurance, driverDto.getEmail());
//
//            // Update DTO with filenames
//            driverDto.setDrivingLicenseFileName(drivingLicenseFileName);
//            driverDto.setInsuranceFileName(insuranceFileName);
//
////            DriverDto registeredDriver = driverService.registerDriver(driverDto);
//            Driver newDriver = new Driver();
//            newDriver.setUsername(driverDto.getUsername());
//            newDriver.setEmail(driverDto.getEmail());
//            newDriver.setPhoneNumber(driverDto.getPhoneNumber());
//            newDriver.setAadharNumber(driverDto.getAadharNumber());
//            newDriver.setExperience(driverDto.getExperience());
//            newDriver.setRcCardNumber(driverDto.getRcCardNumber());
//            newDriver.setCustomVehicleType(driverDto.getCustomVehicleType());
//            newDriver.setVehicleType(driverDto.getVehicleType());
//            newDriver.setLoadCapacityKg(driverDto.getLoadCapacityKg());
//            newDriver.setPayemtDetail(driverDto.getPayemtDetail());
//            newDriver.setPaymentID(driverDto.getPaymentID());
//            newDriver.setDrivingLicenseFileName(drivingLicenseFileName);
//            newDriver.setInsuranceFileName(insuranceFileName);
//
//            String encodedPassword = passwordEncoder.encode(driverDto.getPassword());
//            newDriver.setPassword(encodedPassword);
//            System.out.println("EncodedPassword: " + encodedPassword);
//
//            Set<Role> roles = new HashSet<>();
//            for (Role roleName : driverDto.getRole()) {
////                Role role = roleRepository.findByName(roleName)
////                        .orElseThrow(() -> new RuntimeException("Role notFound: "+ roleName));
//                roles.add(roleName);
//            }
//
//            Driver savedDriver = driverRepository.save(newDriver);
//            DriverDto registeredDriver = DriverMapper.mapToDriverDto(savedDriver);
//            return ResponseEntity.status(HttpStatus.CREATED).body(null);
//
////            newDriver.setRole(roles);
////            driverRepository.save(newDriver);
//
////            return ResponseEntity.ok("User Registerd Succesfully");
////            return new ResponseEntity<>(registeredDriver, HttpStatus.CREATED);
//        } catch (IOException ex) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);

    /// /            throw new RuntimeException("File storage failed", ex);
//        }
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
            if (driverRepository.findByUsername(driverDto.getUsername()).isPresent()) {
                return ResponseEntity.badRequest().body(null);
            }

            // File handling
            String drivingLicenseFileName = storeFile(drivingLicense, driverDto.getEmail());
            String insuranceFileName = storeFile(insurance, driverDto.getEmail());

            // Update DTO with filenames
            driverDto.setDrivingLicenseFileName(drivingLicenseFileName);
            driverDto.setInsuranceFileName(insuranceFileName);

            Driver newDriver = new Driver();
            newDriver.setUsername(driverDto.getUsername());
            newDriver.setEmail(driverDto.getEmail());
            newDriver.setPhoneNumber(driverDto.getPhoneNumber());
            newDriver.setAadharNumber(driverDto.getAadharNumber());
            newDriver.setExperience(driverDto.getExperience());
            newDriver.setRcCardNumber(driverDto.getRcCardNumber());
            newDriver.setCustomVehicleType(driverDto.getCustomVehicleType());
            newDriver.setVehicleType(driverDto.getVehicleType());
            newDriver.setLoadCapacityKg(driverDto.getLoadCapacityKg());
            newDriver.setPayemtDetail(driverDto.getPayemtDetail());
            newDriver.setPaymentID(driverDto.getPaymentID());
            newDriver.setDrivingLicenseFileName(drivingLicenseFileName);
            newDriver.setInsuranceFileName(insuranceFileName);

            String encodedPassword = passwordEncoder.encode(driverDto.getPassword());
            newDriver.setPassword(encodedPassword);
            System.out.println("EncodedPassword: " + encodedPassword);

            Set<Role> roles = new HashSet<>();
            for (Role roleName : driverDto.getRole()) {
                Role role = roleRepository.findByName(roleName.getName())
                        .orElseThrow(() -> new RuntimeException("Role not found: " + roleName.getName()));
                roles.add(role);
            }
            newDriver.setRole(roles);

            Driver savedDriver = driverRepository.save(newDriver);
            DriverDto registeredDriver = DriverMapper.mapToDriverDto(savedDriver);
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredDriver);
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
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
    public ResponseEntity<DriverDto> getUserByusername(@RequestParam String username) {
        DriverDto driverDto = driverService.getDriverBYUsername(username);
        return new ResponseEntity<>(driverDto, HttpStatus.OK);
    }

    @GetMapping("/useremail")
    public ResponseEntity<DriverDto> getUserByuseremail(@RequestParam String email) {
        DriverDto driverDto = driverService.gerDriverByUserEmail(email);
        return new ResponseEntity<>(driverDto, HttpStatus.OK);
    }

    @PostMapping("/check-email")
    public ResponseEntity<String> checkEmailExists(@RequestParam String email) {
        boolean exists = driverService.checkEmailExists(email);
        return exists
                ? ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered")
                : ResponseEntity.ok().build();
    }

    @GetMapping("/alldriver")
    public ResponseEntity<List<DriverDto>> getAllDrivers() {
        List<DriverDto> drivers = driverService.getAllDrivers();
        return new ResponseEntity<>(drivers, HttpStatus.OK);
    }

    @PutMapping("/updatedriver") // Or @PostMapping
    public ResponseEntity<DriverDto> updateDriver(@RequestParam String email, @RequestBody DriverDto driverDto) {
        DriverDto udriverDto = driverService.updateDriver(email, driverDto);
        return new ResponseEntity<>(udriverDto, HttpStatus.OK);
    }

    @PutMapping("/updatepassword")
    public ResponseEntity<DriverDto> updatePassword(@RequestParam String email, @RequestBody DriverDto driverDto) {
        DriverDto updatedpsaaword = driverService.updatePassword(email, driverDto);
        return new ResponseEntity<>(updatedpsaaword, HttpStatus.OK);
    }

    @DeleteMapping("/deletedriver")
    public ResponseEntity<String> deleteDriver(@RequestParam String email) {
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

    //    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody DriverDto loginRequest){
//
//        try{
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest
//                    .getUsername(), loginRequest.getPassword()));
//
//        }catch (Exception e){
//            System.out.println("Exception: "+e);
//        }
//        String token = jwtUtil.generateToken(loginRequest.getUsername());
//        return ResponseEntity.ok(token);
//    }
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody DriverDto loginRequest) {
//        try {
//            // Check if username exists
//            if (!driverRepository.findByUsername(loginRequest.getUsername()).isPresent()) {
//                return ResponseEntity.badRequest().body("Username not found");
//            }
//            if(!driverRepository.findByUsername(loginRequest.getPassword()).isPresent()){
//                return ResponseEntity.badRequest().body("Password is incorrect");
//            }
//
//            // Authenticate the user
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
//            );
//
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//
//            // Generate JWT token
//            String token = jwtUtil.generateToken(loginRequest.getUsername());
//            return ResponseEntity.ok(token);
//
//        } catch (Exception ex) {
//            System.out.println("Login exception: " + ex.getMessage());
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//        }
//    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody DriverDto loginDto) {
        try {
            Optional<Driver> user = driverRepository.findByUsername(loginDto.getUsername());
            if (user.isEmpty()) {
                return ResponseEntity.badRequest().body("Username not found");
            }

            boolean isValidPassword = passwordEncoder.matches(loginDto.getPassword(), user.get().getPassword());
            if (!isValidPassword) {
                return ResponseEntity.badRequest().body("Invalid password");
            }

            // If password is valid, proceed with your logic
            return ResponseEntity.ok("Login successful");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Login failed");
        }
    }
}
