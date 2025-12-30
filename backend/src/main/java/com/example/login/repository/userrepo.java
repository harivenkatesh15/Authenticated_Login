package com.example.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.login.model.Users;

import java.util.Optional;

public interface userrepo extends JpaRepository<Users, Long> {
    // Don't forget this import!

    // This returns a "Box" that might contain a User. The Box has the .orElseThrow() method.
    Optional<Users> findByUsername(String username);
}
