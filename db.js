const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: './.env' });

const mydatabase = mysql.createConnection({
    host: process.env.database_host,
    user: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database,
});

mydatabase.connect((error) => {
    if (error) {
        console.log("MySQL connection error:", error);
    } else {
        console.log("Mysql connected");
    }
});

module.exports = mydatabase;