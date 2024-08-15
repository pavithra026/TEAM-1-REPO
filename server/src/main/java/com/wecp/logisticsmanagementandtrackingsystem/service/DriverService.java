package com.wecp.logisticsmanagementandtrackingsystem.service;

import com.wecp.logisticsmanagementandtrackingsystem.entity.Cargo;
import com.wecp.logisticsmanagementandtrackingsystem.entity.Driver;
import com.wecp.logisticsmanagementandtrackingsystem.repository.CargoRepository;
import com.wecp.logisticsmanagementandtrackingsystem.repository.DriverRepository;
import com.wecp.logisticsmanagementandtrackingsystem.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CargoRepository cargoRepository;

    public Driver createDriver(Driver driver) {
        return driverRepository.save(driver);
    }
    public Long getDriverIdByUserId(Long userId) {
        Driver driver = driverRepository.findByUserId(userId);
        return driver != null ? driver.getId() : null;
    }

    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public List<Cargo> viewDriverCargos(Long driverId) {
        return cargoRepository.findByDriverId(driverId);
    }

    public boolean updateCargoStatus(Long cargoId, String newStatus) {
        Cargo cargo = cargoRepository.findById(cargoId)
                .orElseThrow(
                    () -> new EntityNotFoundException("Cargo not found with id: " + cargoId));

        cargo.setStatus(newStatus);
        try {
            cargoRepository.save(cargo);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }



}
