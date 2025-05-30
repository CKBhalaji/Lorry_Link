package project.lorry_link.lorry_backend.mapper;

import project.lorry_link.lorry_backend.dto.DriverDto;
import project.lorry_link.lorry_backend.entity.Driver;
import project.lorry_link.lorry_backend.entity.Role;

import java.util.Collections;
import java.util.Set;

public class DriverMapper {
    

    public static DriverDto mapToDriverDto(Driver driver) {
        Set<Role> roles = Collections.singleton(new Role("DRIVER"));
        return new DriverDto(
            driver.getId(),
            driver.getUsername(),
            driver.getPhoneNumber(),
            driver.getAadharNumber(),
            driver.getEmail(),
            driver.getExperience(),
            driver.getDrivingLicenseFileName(),
            driver.getInsuranceFileName(),
            driver.getRcCardNumber(),
            driver.getCustomVehicleType(),
            driver.getVehicleType(),
            driver.getLoadCapacityKg(),
            driver.getPayemtDetail(),
            driver.getPaymentID(),
            driver.getPassword(),
                driver.getRole()
        );
    }

    public static Driver mapToDriver(DriverDto driverDto) {
        return new Driver(
            driverDto.getId(),
            driverDto.getUsername(),
            driverDto.getPhoneNumber(),
            driverDto.getAadharNumber(),
            driverDto.getEmail(),
            driverDto.getExperience(),
            driverDto.getDrivingLicenseFileName(),
            driverDto.getInsuranceFileName(),
            driverDto.getRcCardNumber(),
            driverDto.getCustomVehicleType(),
            driverDto.getVehicleType(),
            driverDto.getLoadCapacityKg(),
            driverDto.getPayemtDetail(),
            driverDto.getPaymentID(),
            driverDto.getPassword(),
                driverDto.getRole()
        );
    }
}
