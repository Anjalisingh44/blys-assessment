# Task Management
A simple task management app that allows users to register, login, and authorize users to manage tasks.
It uses JWT-based authentication, bcrypt for secure passwords,and Node.js with Express for the backend with mysql database.
The frontend is built with React,tailwindcss, antdesign UI.

# Features
User Authentication: Register, login, and JWT-based authentication with bcrypt for password hashing.
Task Management: Add, view, and delete tasks. Tasks are user-specific.

# API endpoints
POST /register: Register a user.
POST /login: Authenticate a user and return a token.
GET /tasks/gettask: Fetch tasks.
POST /tasks/addtasks: Add a new task.
DELETE /tasks/delete-task/:id: Delete a task.

# Setup
## Backend
git clone https://github.com/Anjalisingh44/blys-assessment.git
cd backend 
## install dependencies
npm install 
# set up environment variables
JWT_SECRET, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
# start the server
npm run dev
# Frontend
git clone https://github.com/Anjalisingh44/blys-assessment.git
cd frontend
cd vite-project
npm run dev
# Database 
Users Table: Stores user credentials (username, email, password).
Tasks Table: Stores tasks (title, description) for each user.
