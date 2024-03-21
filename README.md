# HEIRS Ecommerce Website

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [License](#license)

## Introduction

HEIRS Ecommerce is a simple eCommerce website project built with React for the frontend and Node.js with Express for the backend.

## Features

- **Product Management:** View detailed information about each product.
- **Shopping Cart:** Add products to your shopping cart and manage quantities.
- **Checkout Process:** Securely complete purchases with a streamlined checkout process.
- **User Authentication:** Register and login to track orders and manage your profile.

## Technologies Used

- **Frontend:**
  - React
  - React Router
  - Tailwind CSS
- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - JSON Web Token (JWT) for authentication

## Setup Instructions

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fulail-kt/Heirs-Ecom.git
   cd Heirs-Ecom

# Install frontend dependencies
cd client
npm install

# Setup environment variables for frontend
# Create a .env file in the client directory
# Add the following variables:
# VITE_BASEURL='your backend Base URL /api/v1/'

# Install backend dependencies
cd ../server
npm install

# Setup environment variables for backend
# Create a .env file in the server directory
# Add the following variables:
# PORT='port number'
# FRONTEND_URL='your frontend url'
# JWT_SECRET_KEY='jwt secret'
# MONGODB_URI='your mongodb connection'


# Start frontend server
cd ../client
npm run dev

# Start backend server
cd ../server
npm start

