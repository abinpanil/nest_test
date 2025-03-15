# Backend Migration Tasks for Todo App (NestJS & PostgreSQL)

This document outlines the steps for migrating the backend from SuperBase to a NestJS-based backend. The candidate is expected to implement both the authentication flow and the tasks (todo) feature. Below is a breakdown of tasks with approximate time estimates.

---

## 1. Project Setup and Initial Configuration (5–10 minutes)
- **Task 1.1:** Install the NestJS CLI globally and create a new NestJS project.
- **Task 1.2:** Configure environment variables (using a `.env` file) for:
  - PostgreSQL connection details (host, port, username, password, database name).
  - JWT secret and expiration settings.

---

## 2. Database Integration with PostgreSQL (10–15 minutes)
- **Task 2.1:** Install and configure the PostgreSQL integration using your preferred ORM (e.g., TypeORM or Prisma).
- **Task 2.2:** Define the database entities:
  - Create a `User` entity.
- **Task 2.3:** Configure and run migrations (or use entity synchronization) to set up the database schema.

---

## 3. Authentication Flow Implementation (10–15 minutes)
- **Task 3.1:** Set up authentication modules:
  - Create an `AuthModule` and a `UserModule`.
- **Task 3.2:** Implement the user registration endpoint (`POST /auth/register`):
  - Validate input data.
  - Hash passwords using a library like `bcrypt`.
- **Task 3.3:** Implement the login endpoint (`POST /auth/login`):
  - Verify user credentials.
  - Generate and return a JWT token.
- **Task 3.4:** Secure protected routes using JWT strategy and NestJS guards.

