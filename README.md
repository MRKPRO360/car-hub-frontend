CarHub API

Overview

CarHub is a web application that allows users to browse, purchase, and manage car-related services seamlessly. This document provides an overview of the API routes for users, orders, cars, and authentication.

Tech Stack

Backend: Node.js, Express.js

Authentication: JWT & OAuth

Database: MongoDB

Deployment: Vercel (Frontend) & Vercel/Heroku (Backend)

API Routes

User Routes

GET /users/ - Get all users (Admin only)

GET /users/me - Get logged-in user details

GET /users/:userId - Get a specific user (Admin only)

PATCH /users/:userId - Update a user (Admin & User)

DELETE /users/:userId - Delete a user (Admin only)

PATCH /users/deactivate-user/:userId - Deactivate a user (Admin only)

Order Routes

GET /orders/ - Get all orders (User & Admin)

POST /orders/ - Create an order (User & Admin)

GET /orders/verify-order - Verify payment (User & Admin)

GET /orders/my-orders - Get user-specific orders (User only)

PATCH /orders/:orderId - Update an order (Admin only)

DELETE /orders/:orderId - Delete an order (User & Admin)

GET /orders/revenue - Get revenue details (User & Admin)

Car Routes

GET /cars/ - Get all cars

POST /cars/ - Create a new car (Admin only)

GET /cars/my-car - Get user's cars (Admin & User)

GET /cars/:carId - Get details of a single car

PATCH /cars/:carId - Update car details

DELETE /cars/:carId - Delete a car

Authentication Routes

POST /auth/register - Register a new user

POST /auth/login - Login user

POST /auth/refresh-token - Refresh authentication token

POST /auth/change-password - Change user password (User & Admin)

Installation

Clone the repository:

git clone https://github.com/yourusername/car-hub.git
cd car-hub

Install dependencies:

npm install

Create a .env file and add:

NEXT_PUBLIC_API_URL=https://car-hub-puce-three.vercel.app/api/v1
DATABASE_URL=mongodb+srv://your-db-connection
JWT_SECRET=your-secret-key

Run the development server:

npm run dev

Deployment

Frontend: Vercel

Backend: Vercel/Heroku

Troubleshooting

If you encounter CORS errors, ensure your backend sends the proper headers:

res.setHeader("Access-Control-Allow-Origin", "\*");

License

MIT License © 2025 Your Name
