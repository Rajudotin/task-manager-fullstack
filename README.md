# Task Manager - Full Stack Application

A production-ready full-stack task management application featuring JWT authentication, role-based access control, and secure REST API endpoints.

## Live Demo

| Service | URL |
|---------|-----|
| **Backend API** | https://task-manager-fullstack-production-9bef.up.railway.app |
| **Frontend** | https://task-manager-fullstack-git-main-rajus-projects-3ceb58b0.vercel.app |
| **API Docs** | https://task-manager-fullstack-production-9bef.up.railway.app/api-docs |



![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express.js](https://img.shields.io/badge/Express.js-4.x-blue)
![React](https://img.shields.io/badge/React-19.x-61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-8.x-00758F)

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Live Demo](#live-demo)

---

## Overview

Task Manager is a secure, scalable full-stack application that allows users to manage their tasks with role-based permissions. Administrators have full access to all tasks, while regular users can only manage their own tasks.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Node.js, Express.js |
| **Database** | MySQL, Sequelize ORM |
| **Authentication** | JWT, bcrypt |
| **Security** | CORS, Helmet |
| **Frontend** | React (Vite), Axios |
| **Deployment** | Railway (Backend), Vercel (Frontend) |

---

## Features

### Authentication & Authorization
- User registration with email validation
- Secure login with JWT tokens
- Password hashing with bcrypt (10 salt rounds)
- Role-based access control (Admin/User)

### Task Management
- Create new tasks
- Retrieve all tasks (filtered by user role)
- Update existing tasks
- Delete tasks (with ownership validation)

### API Design
- RESTful API architecture
- API versioning (`/api/v1`)
- Proper HTTP status codes
- Centralized error handling
- Input validation

---

## Project Structure

```
task-manager-fullstack/
│
├── backend/
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth & validation middleware
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API route definitions
│   │   ├── utils/          # Utility functions
│   │   ├── docs/           # Swagger documentation
│   │   └── app.js          # Express app setup
│   ├── server.js           # Server entry point
│   ├── package.json
│   └── .env                # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/     # Reusable React components
    │   ├── pages/          # Page components
    │   ├── context/        # React context (Auth)
    │   ├── services/       # API service layer
    │   └── assets/         # Static assets
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `POST` | `/api/v1/auth/register` | Register new user | ❌ |
| `POST` | `/api/v1/auth/login` | Login user | ❌ |

### Tasks

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|--------------|
| `GET` | `/api/v1/tasks` | Get all tasks | ✅ |
| `POST` | `/api/v1/tasks` | Create new task | ✅ |
| `PUT` | `/api/v1/tasks/:id` | Update task | ✅ |
| `DELETE` | `/api/v1/tasks/:id` | Delete task | ✅ |

### Documentation
- Swagger UI: `/api-docs`

---

## Security

- **JWT Authentication**: Tokens stored in Authorization header
- **Password Security**: bcrypt hashing with salt rounds
- **CORS**: Configured whitelist for allowed origins
- **Helmet**: HTTP security headers
- **Input Validation**: Request body validation
- **Role-Based Access**: Middleware for route protection

---

## Getting Started

### Prerequisites
- Node.js 18+
- MySQL 8.x
- npm or yarn

### Backend Setup

```
bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```
bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

### Backend (.env)
```
env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=taskmanager
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Frontend
```
env
VITE_API_URL=http://localhost:5000
```

---

## Deployment

### Backend (Railway)
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

### Frontend (Vercel)
1. Import your GitHub repository to Vercel
2. Add environment variable: `VITE_API_URL` = Railway backend URL
3. Deploy automatically on push

---



## License

