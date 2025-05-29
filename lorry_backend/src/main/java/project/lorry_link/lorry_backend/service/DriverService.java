package project.lorry_link.lorry_backend.service;

import project.lorry_link.lorry_backend.dto.DriverDto;

import java.util.List;


public interface DriverService {
    DriverDto registerDriver(DriverDto driverDto);

    DriverDto getDriverBYUsername(String username);

    DriverDto gerDriverByUserEmail(String email);

    List<DriverDto> getAllDrivers();

    DriverDto updateDriver(String email, DriverDto updateDriver);

    DriverDto updatePassword(String email, DriverDto updateDriver);

    void deleteDriver(String email);

    boolean checkEmailExists(String email);

//    Authentication authenticate(String email, String password);
}
