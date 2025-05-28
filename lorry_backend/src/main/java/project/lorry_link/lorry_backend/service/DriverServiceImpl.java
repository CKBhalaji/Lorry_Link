package project.lorry_link.lorry_backend.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import project.lorry_link.lorry_backend.dto.DriverDto;
import project.lorry_link.lorry_backend.entity.Driver;
import project.lorry_link.lorry_backend.exception.ResourceNotFoundException;
import project.lorry_link.lorry_backend.mapper.DriverMapper;
import project.lorry_link.lorry_backend.repository.DriverRepository;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class DriverServiceImpl implements DriverService {

    private DriverRepository driverRepository;

    @Override
    public DriverDto registerDriver(DriverDto driverDto) {
        Driver driver = DriverMapper.mapToDriver(driverDto);
        Driver savedDriver = driverRepository.save(driver);
        return DriverMapper.mapToDriverDto(savedDriver);
    }

    @Override
    public DriverDto getDriverBYUsername(String username) {
        Driver driver = driverRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Exist in the database" + username));
        return DriverMapper.mapToDriverDto(driver);
    }

    @Override
    public DriverDto gerDriverByUserEmail(String email) {
        Driver driver = driverRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Exist in the database" + email));
        return DriverMapper.mapToDriverDto(driver);
    }

    @Override
    public List<DriverDto> getAllDrivers() {
        List<Driver> drivers = driverRepository.findAll();
        return drivers.stream().map((driver) -> DriverMapper.mapToDriverDto(driver)).collect(Collectors.toList());
    }

    @Override
    public DriverDto updateDriver(String email, DriverDto updateDriver) {
        Driver driver = driverRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Exist in the database" + email));
        driver.setUsername(updateDriver.getUsername());
        driver.setPhoneNumber(updateDriver.getPhoneNumber());
        driver.setAadharNumber(updateDriver.getAadharNumber());
        driver.setExperience(updateDriver.getExperience());
        driver.setCustomVehicleType(updateDriver.getCustomVehicleType());
        driver.setVehicleType(updateDriver.getVehicleType());
        driver.setLoadCapacityKg(updateDriver.getLoadCapacityKg());
        driver.setRcCardNumber(updateDriver.getRcCardNumber());
        driver.setPayemtDetail(updateDriver.getPayemtDetail());
        driver.setPaymentID(updateDriver.getPaymentID());
//        driver.setPassword(updateDriver.getPassword());


        if (updateDriver.getPassword() != null && !updateDriver.getPassword().isEmpty()) {
            driver.setPassword(updateDriver.getPassword());
        }

        Driver updatedDriver = driverRepository.save(driver);
        return DriverMapper.mapToDriverDto(updatedDriver);
    }

    @Override
    public DriverDto updatePassword(String email, @org.jetbrains.annotations.NotNull DriverDto updateDriver) {
        Driver driver = driverRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User Not Exist in the database" + email));
        if (updateDriver.getUsername() != null && !updateDriver.getUsername().isEmpty()) {
            driver.setUsername(updateDriver.getUsername());
        }
        if (updateDriver.getPhoneNumber() != null && !updateDriver.getPhoneNumber().isEmpty()) {
            driver.setPhoneNumber(updateDriver.getPhoneNumber());
        }
        if (updateDriver.getAadharNumber() != null && !updateDriver.getAadharNumber().isEmpty()) {
            driver.setAadharNumber(updateDriver.getAadharNumber());
        }
        if (updateDriver.getExperience() != null) { // Now using Integer wrapper class
            driver.setExperience(updateDriver.getExperience());
        }
        if (updateDriver.getCustomVehicleType() != null && !updateDriver.getCustomVehicleType().isEmpty()) {
            driver.setCustomVehicleType(updateDriver.getCustomVehicleType());
        }
        if (updateDriver.getVehicleType() != null && !updateDriver.getVehicleType().isEmpty()) {
            driver.setVehicleType(updateDriver.getVehicleType());
        }
        if (updateDriver.getLoadCapacityKg() != null) { // Assuming loadCapacityKg is Integer or similar wrapper type
            driver.setLoadCapacityKg(updateDriver.getLoadCapacityKg());
        }
        if (updateDriver.getRcCardNumber() != null && !updateDriver.getRcCardNumber().isEmpty()) {
            driver.setRcCardNumber(updateDriver.getRcCardNumber());
        }
        if (updateDriver.getPayemtDetail() != null && !updateDriver.getPayemtDetail().isEmpty()) {
            driver.setPayemtDetail(updateDriver.getPayemtDetail());
        }
        if (updateDriver.getPaymentID() != null && !updateDriver.getPaymentID().isEmpty()) {
            driver.setPaymentID(updateDriver.getPaymentID());
        }

        driver.setPassword(updateDriver.getPassword());
        Driver updatedDriver = driverRepository.save(driver);
        return DriverMapper.mapToDriverDto(updatedDriver);
    }

    @Override
    @Transactional
    public void deleteDriver(String email) {
        Driver driver = driverRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with email: " + email));
        driverRepository.delete(driver);
    }

    public boolean checkEmailExists(String email) {
        return driverRepository.existsByEmail(email);
    }
}
