# Learning Management System (LMS) - Backend

## Overview
This project is the backend for a Learning Management System (LMS), designed to manage courses, users, and roles (admin and user) efficiently. It includes robust functionality for user authentication, authorization, course management, and payment processing, among other features.

## Features
- **User Authentication and Authorization**: Secure login and registration using JWT and bcrypt.
- **Role Management**: Admin and user roles with different access levels.
- **Course Management**: CRUD operations for courses, including multimedia uploads using Cloudinary.
- **Payment Integration**: Razorpay integration for secure payment processing.
- **Email Notifications**: Nodemailer for sending course updates and notifications.
- **Middleware**: Enhanced security and data handling with cookie-parser, CORS, and custom middleware.
- **Real-Time Logging**: Morgan for logging HTTP requests.
- **File Uploads**: Handled seamlessly with Multer.

## Technologies Used
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Fast and lightweight web framework.
- **MongoDB**: NoSQL database for data storage.
- **Cloudinary**: Cloud-based image and video storage.
- **Razorpay**: Payment gateway for transaction handling.
- **Nodemailer**: Email service for notifications.
- **Dotenv**: Environment variable management.

## Dependencies
```json
{
    "bcryptjs": "^2.4.3",
    "cloudinary": "^1.40.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^7.5.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.5",
    "nodemon": "^3.0.1",
    "razorpay": "^2.9.2"
}
```

## Project Setup

### Prerequisites
- Node.js (>= 14.x)
- MongoDB (>= 5.x)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ansarialiakbar/lms-backend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd server
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following variables:
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

5. Start the server:
   ```bash
   npm run start
   ```

### Directory Structure
```
server/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── .env
├── package.json
├── server.js
```

## Usage
- Access the API at `http://localhost:5000` (default).
- Integrate with a front-end application to utilize the LMS functionality.

## Scripts
- **Start the server**:
  ```bash
  npm run start
  ```
- **Development mode** (with live reloading):
  ```bash
  nodemon server.js
  ```

## Contributions
Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

---
**Developer:** [Ali Akbar Ansari](https://github.com/ansarialiakbar)

