package project.lorry_link.lorry_backend.service.impl;

import project.lorry_link.lorry_backend.entity.Driver;
import project.lorry_link.lorry_backend.repository.DriverRepository;
import project.lorry_link.lorry_backend.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DriverServiceImpl implements DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Override
    public Driver registerDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    @Override
    public Driver loginDriver(String username, String password) {
        Driver driver = driverRepository.findByUsername(username);
        if (driver != null && driver.getPassword() != null && driver.getPassword().equals(password)) {
            return driver;
        }
        return null;
    }
}
