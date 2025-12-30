package com.example.login.controller;

import com.example.login.model.Users;
import com.example.login.repository.userrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/req")
public class RegistrationController {

    @Autowired
    private userrepo userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody Users user) {

        // 1. CHECK: Does this user already exist?
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Username already exists! Try another one.");
        }

        // 2. FIX: Assign Default Role
        // This fills the 'null' gap. Everyone who signs up is a "USER" by default.
        user.setRole("USER");

        // 3. SECURITY: Hash the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 4. SAVE
        Users savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
}