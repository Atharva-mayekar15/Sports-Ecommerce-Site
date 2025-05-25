const jwt = require('jsonwebtoken');
const mydatabase = require('../db'); // Adjusted path to reach db.js in root

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.redirect('/register');
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.redirect('/register');
    }
};

const requireAdmin = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.redirect('/register');
            } else {
                mydatabase.query('SELECT isAdmin FROM users WHERE id = ?', [decoded.id], (error, results) => {
                    if (error) {
                        console.log(error);
                        return res.redirect('/register');
                    }
                    if (results.length === 0 || !results[0].isAdmin) {
                        return res.redirect('/');
                    }
                    req.user = decoded;
                    next();
                });
            }
        });
    } else {
        res.redirect('/register');
    }
};

module.exports = { requireAuth, requireAdmin };