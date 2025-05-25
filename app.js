const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const mydatabase = require("./db");


if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    console.log('SSL verification disabled for development');
}

dotenv.config({ path: './.env' });

const app = express();

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

app.use('/', require('./routes/pages'));
console.log("Mounting auth routes");
app.use('/auth', require('./routes/auth'));
app.use('/payment', require('./routes/payment'));
app.use('/admin', require('./routes/admin'));

app.listen(5000, () => {
    console.log("Server started on port 5000");
});