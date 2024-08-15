package com.wecp.logisticsmanagementandtrackingsystem.Controller;


import com.wecp.logisticsmanagementandtrackingsystem.entity.Cargo;
import com.wecp.logisticsmanagementandtrackingsystem.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/driver")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @GetMapping("/cargo")
    public ResponseEntity<List<Cargo>> viewAssignedCargos(@RequestParam Long driverId) {
        List<Cargo> assignedCargos = driverService.viewDriverCargos(driverId);
        return ResponseEntity.ok(assignedCargos);
    }
    @GetMapping("/getDriverId")
    public Long getDriverId(@RequestParam Long userId) {
        return driverService.getDriverIdByUserId(userId);
    }

    @PutMapping("/update-cargo-status")
    public ResponseEntity<String> updateCargoStatus(@RequestParam Long cargoId, @RequestParam String newStatus) {
        boolean updateSuccess = driverService.updateCargoStatus(cargoId, newStatus);

        if (updateSuccess) {
            
            return ResponseEntity.ok().body("{\"message\": \"Cargo status updated successfully.\"}");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update cargo status.");
        }
    }


}
