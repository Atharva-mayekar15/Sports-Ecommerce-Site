# 🛣️ Routes Folder

This folder contains all the **Express.js route handlers** that define the various endpoints of the application. Each file modularizes specific parts of the site — like authentication, admin controls, page routing, payments, and middleware.

---

## 📄 File Breakdown

### 🔐 `auth.js`
Handles all user and admin **authentication routes**.

**Endpoints may include:**
- `POST /login` – User login
- `POST /register` – User registration
- `POST /admin-login` – Admin-specific login

---

### 🧑‍💼 `admin.js`
Routes specifically for admin actions like managing equipment.

**Endpoints may include:**
- `POST /admin/add-equipment` – Add new product
- `DELETE /admin/remove-equipment/:id` – Remove a product
- `PUT /admin/update-equipment/:id` – Update product details

---

### 🌐 `pages.js`
Handles **static and dynamic page routing** for the frontend.

**Examples:**
- `GET /` – Home page
- `GET /login` – Login page
- `GET /products` – Product listings
- `GET /admin` – Admin dashboard

---

### 💳 `payment.js`
Handles **payment processing logic** (Stripe integration).

**Endpoints may include:**
- `POST /create-checkout-session` – Create a Stripe session
- `GET /success` – Payment success page
- `GET /cancel` – Payment cancellation/failure page

---

### 🛡️ `middleware.js`
Custom **middleware functions** for route protection and other reusable logic.

**Functions may include:**
- `isAuthenticated` – Ensures user is logged in
- `isAdmin` – Restricts access to admin-only routes
- `validateInput` – Validates form data before hitting the controller

---

## 📌 Usage Example

In your main server file (`index.js` or `app.js`):

```js
const express = require('express');
const app = express();

// Route imports
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const pageRoutes = require('./routes/pages');
const paymentRoutes = require('./routes/payment');

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/', pageRoutes);
app.use('/payment', paymentRoutes);
