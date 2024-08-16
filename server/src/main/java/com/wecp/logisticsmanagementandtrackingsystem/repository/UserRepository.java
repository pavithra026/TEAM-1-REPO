package com.wecp.logisticsmanagementandtrackingsystem.repository;


import com.wecp.logisticsmanagementandtrackingsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    // extend jpa repository and add custom methods if needed
    User findByUsername(String username);

    public boolean existsByEmail(String email);
    public boolean existsByUsername(String username);


}
