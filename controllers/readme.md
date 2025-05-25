# 📂 Controllers Folder

This folder contains the core logic (controllers) used to handle various HTTP requests in the application. Each controller is responsible for processing input, interacting with the database or services, and returning a proper response.

---

## 📄 Files Included

### 🔐 `auth.js`
Handles all **authentication and authorization** logic for the application.

#### Features:
- **User Registration** – Validates input, hashes passwords, and saves user info to the database.
- **User Login** – Authenticates users, verifies credentials, and generates session/token (if implemented).
- **Admin Login** – Provides a separate flow for admin authentication.
- **Logout** – Destroys the session or token and logs the user out.

---

## 💡 Usage

These controllers are typically used in your route files. Example usage in a route:

```js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Admin login
router.post('/admin-login', authController.adminLogin);

module.exports = router;

