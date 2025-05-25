const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mydatabase = require("../db"); 

exports.register = (req, res) => {
    console.log(req.body);
    const { name, email, password, passwordConfirm } = req.body;

    mydatabase.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            return res.render('register', { message: "That email is already in use" });
        } else if (password !== passwordConfirm) {
            return res.render('register', { message: 'Passwords do not match' });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        mydatabase.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', { message: 'User registered' });
            }
        });
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    mydatabase.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
            return res.render('register', { message: 'An error occurred' });
        }
        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.render('register', { message: 'Email or password is incorrect' });
        }

        const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
        
        if (results[0].isAdmin) {
            res.redirect('/admin/dashboard');
        } else {
            res.redirect('/');
        }
    });
};

exports.logout = (req, res) => {
    console.log("Logout route hit");
    res.clearCookie('jwt');
    res.redirect('/register');
};