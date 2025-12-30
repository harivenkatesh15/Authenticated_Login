# 🛡️ Spring Boot & React Auth System with Glassmorphism UI

A full-stack authentication application featuring a secure Spring Boot backend and a modern React frontend with a Glassmorphism UI design. This project demonstrates a production-ready implementation of **Spring Security 6** using the `DaoAuthenticationProvider` architecture.

## Features
- **User Registration:** Secure signup with duplicate user checks.
- **Password Encryption:** Uses **BCrypt** hashing (passwords are never stored as plain text).
- **Authentication:** Custom login flow using `AuthenticationManager`.
- **Role Management:** Auto-assigns default "USER" role to prevent null pointer exceptions.
- **Glassmorphism UI:** Modern, animated frontend using CSS3 and React.
- **State Management:** React Router v6 for navigation and LocalStorage for session persistence.

---

## 🛠️ Tech Stack

### Backend (The Engine)
- **Language:** Java 17
- **Framework:** Spring Boot 3
- **Security:** Spring Security 6
- **Database:** MySQL
- **ORM:** Spring Data JPA (Hibernate)

### Frontend (The Paint)
- **Library:** React.js
- **HTTP Client:** Axios
- **Routing:** React Router DOM
- **Styling:** Custom CSS (Glassmorphism & Animations)

---

## 🔐 How Security Works (The Architecture)

This project follows the standard Spring Security "Filter Chain" architecture. Here is the lifecycle of a Login Request:

### 1. The Bouncer (`SecurityConfig`)
The `SecurityFilterChain` intercepts every request.
- **Public Area:** Endpoints `/req/signup` and `/req/login` are permitted for everyone.
- **VIP Area:** All other endpoints are blocked (`authenticated()`) unless the user is logged in.
- **CORS:** Configured to allow traffic specifically from `http://localhost:3000` (React).

### 2. The Manager (`AuthenticationManager`)
When a user attempts to log in via `AuthController`, the request is passed to the **AuthenticationManager**. This is the "Boss" bean that coordinates the verification process.

### 3. The Investigator (`DaoAuthenticationProvider`)
The Manager delegates the work to the `DaoAuthenticationProvider`. This component holds two critical tools:
- **`UserDetailsService`:** A bridge class I wrote (`MyUserDetailsService`) that knows how to find users in my MySQL database.
- **`PasswordEncoder`:** A `BCryptPasswordEncoder` tool that knows how to match a raw password (e.g., "123") against the hashed version in the database (`$2a$10...`).

### 4. The Database (`UserRepository`)
If the username exists and the hashed password matches, an `Authentication` object is created, stored in the Security Context, and the user is allowed entry.

---

## ⚙️ Setup & Installation

### Prerequisite
Ensure you have **Java 17+**, **Node.js**, and **MySQL** installed.

### Step 1: Database Setup
Open MySQL Workbench and run:
```sql
CREATE DATABASE login_db;
```

### Step 2: Backend Setup
- Navigate to the backend folder.
- Open src/main/resources/application.properties.
- Update your database credentials:
```
spring.datasource.username=root
spring.datasource.password=YOUR_REAL_PASSWORD
```
- Run the application (The server will start on http://localhost:8080).

### Step 3: Frontend Setup
- Navigate to the frontend folder.
- Install the dependencies (node_modules):
```
npm install
npm start
```
- The application will open automatically at http://localhost:3000.

## 📂 Project Structure
```
FullStack-Login-System/
├── backend/
│   ├── src/main/java/com/example/login/
│   │   ├── config/       # SecurityConfig (The Bouncer)
│   │   ├── controller/   # Auth & Registration Controllers
│   │   ├── model/        # User Entity
│   │   ├── repository/   # UserRepository (DB Interface)
│   │   └── service/      # UserDetailsService (The Bridge)
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── App.js        # UI Logic & Routing
│   │   ├── App.css       # Glassmorphism Styles
│   │   └── api.js        # Axios Configuration
│   └── package.json
└── README.md
```
