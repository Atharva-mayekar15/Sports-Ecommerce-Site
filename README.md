# 🏀 Sports Equipment E-commerce Website

A full-stack sports shopping website where users can buy equipment and admins can manage inventory. Built using Node.js for backend, and HTML/CSS/JavaScript for frontend, with phpMyAdmin (MySQL) for database and Stripe for payment integration.

---

## 🔑 Features

### 👤 User
- Login / Register
- Browse & order sports goods
- Stripe-based payment system

### 🛠️ Admin
- Admin login
- Add, update, or remove products
- Manage inventory live

---

## 🧰 Tech Stack

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js  
- **Database**: MySQL (via phpMyAdmin)  
- **Payment Gateway**: Stripe  
- **Local Server**: XAMPP  

---

## 🚀 How to Run This Project

### 1. 🧑‍💻 Prerequisites
- [XAMPP](https://www.apachefriends.org/index.html) (Apache + MySQL)
- [Node.js](https://nodejs.org/)
- Internet for Stripe API
- Code editor (like VS Code)

---

### 2. 🔧 Setup Instructions

#### 🗃️ Database Setup
1. Open **XAMPP** and start **Apache** and **MySQL**
2. Go to `http://localhost/phpmyadmin`
3. Create a new database (e.g. `sports_db`)
4. Import the `.sql` file (included in the project) into the database

#### 🔐 Stripe Setup
1. Create a free [Stripe account](https://stripe.com/)
2. Get your **test API keys**
3. In the root project folder, create a `.env` file:
   ```env
   STRIPE_SECRET_KEY=your_test_secret_key
   STRIPE_PUBLISHABLE_KEY=your_test_publishable_key

