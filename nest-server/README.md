
# NestJS Backend for Todo Application

This is the NestJS backend for the Todo application with role-based access control.

## Installation

```bash
cd nest-server
npm install
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Features

- Authentication (login/register)
- Todo management with RBAC
- JWT-based authorization

## API Endpoints

### Authentication
- POST /auth/login - Login with email and password
- POST /auth/register - Register a new user
- GET /auth/me - Get current user info (requires authentication)

### Todo Management
- GET /todos - Get all todos (filtered by user role)
- POST /todos - Create a new todo
- PATCH /todos/:id - Update a todo
- PATCH /todos/:id/toggle - Toggle todo completion status
- DELETE /todos/:id - Delete a todo

## Role-Based Access
- Admin users can see and manage all todos
- Regular users can only see and manage their own todos

## TypeScript Configuration
The project is configured to work properly with NestJS decorators. The following settings in tsconfig.json are critical for NestJS to function correctly:

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "useDefineForClassFields": false
  }
}
```

The `emitDecoratorMetadata` and `experimentalDecorators` settings enable TypeScript to process decorator syntax correctly.

The `useDefineForClassFields` setting is particularly important as it affects how TypeScript handles decorators in class fields, which is critical for NestJS's validation decorators. Setting this to false ensures proper decorator behavior with class properties.

## Development Notes
- The backend uses JWT for authentication
- Default users are available for testing (admin@example.com and user@example.com, both with password "password")
- For production, consider implementing proper password hashing and using environment variables for secrets
