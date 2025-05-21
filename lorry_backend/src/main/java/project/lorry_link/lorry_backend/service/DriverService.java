package project.lorry_link.lorry_backend.service;

import project.lorry_link.lorry_backend.entity.Driver;

public interface DriverService {
    Driver registerDriver(Driver driver);
    Driver loginDriver(String username, String password);
}
