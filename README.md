# Learning Management System (LMS)

## Overview
The Learning Management System (LMS) is a full-stack project designed to streamline course management, user authentication, and payment processing. It features a frontend for user interaction and a backend for handling business logic and data management.

---

## Frontend

### Features
- **User-Friendly Interface**: Responsive design for seamless interaction across devices.
- **Dynamic Pages**: Built with React for efficient state management and rendering.
- **Role-Based Views**: Separate interfaces for admin and user roles.

### Technologies Used
- React
- HTML/CSS
- JavaScript
- Axios (for API calls)

### Setup
1. Navigate to the frontend directory:
   ```bash
   cd lms-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Backend

### Features
- **Authentication**: Secure login and registration with JWT and bcrypt.
- **Payment Integration**: Razorpay for secure transactions.
- **Email Notifications**: Nodemailer for updates and alerts.
- **File Uploads**: Handled with Multer and Cloudinary.

### Technologies Used
- Node.js
- Express.js
- MongoDB
- Cloudinary
- Razorpay


### Setup
1. Navigate to the backend directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the necessary variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```
4. Start the server:
   ```bash
   npm run start
   ```

---

## Project Structure
```
root/
├── client/       # Frontend code
├── server/       # Backend code
```

## Usage
1. Start the backend server.
2. Start the frontend development server.
3. Access the application at `http://localhost:5173` (default for frontend).

## Developer
[Ali Akbar Ansari](https://github.com/ansarialiakbar)

---
This project is licensed under the [MIT License](LICENSE).

