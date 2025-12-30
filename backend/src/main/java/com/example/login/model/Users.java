package com.example.login.model;

import jakarta.persistence.*;
import lombok.Data; // or generate Getters/Setters manually

@Entity
@Data
@Table(name = "users") // Don't use "User" as table name, it's a reserved keyword in Postgres/Oracle
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    private String password; // This will be Hashed!

    private String role; // e.g., "USER", "ADMIN"


}