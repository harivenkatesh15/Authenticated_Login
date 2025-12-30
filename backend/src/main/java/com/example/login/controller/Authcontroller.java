package com.example.login.controller;

import com.example.login.model.Users; // ⚠️ CHANGE THIS if your class is named 'Users'
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/req") // Matches the path in SecurityConfig
public class Authcontroller {

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public String login(@RequestBody Users user) {

        // 1. The "Attempt": We wrap the username and password into a temporary token
        // and hand it to the AuthenticationManager to verify.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );

        // 2. The "Result": If the manager didn't throw an error, it worked!
        if (authentication.isAuthenticated()) {
            return "Login Successful! Welcome " + user.getUsername();
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }
}