const express = require('express');
const { requireAdmin } = require('./authMiddleware');
const mydatabase = require('../db');
const router = express.Router();

router.get('/dashboard', requireAdmin, (req, res) => {
    mydatabase.query('SELECT * FROM products', (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Database error');
        }
        // Check query params for success/error with unique names
        const success = req.query.success === 'added';
        const addError = req.query.error === 'add_failed'; // Renamed to avoid conflict
        res.render('admin/dashboard', { products: results, success, error: addError });
    });
});

router.post('/add-product', requireAdmin, (req, res) => {
    const { name, price, imgSrc } = req.body;
    mydatabase.query('INSERT INTO products SET ?', { name, price, imgSrc }, (error) => {
        if (error) {
            console.log(error);
            return res.redirect('/admin/dashboard?error=add_failed');
        }
        res.redirect('/admin/dashboard?success=added');
    });
});

router.post('/remove-product', requireAdmin, (req, res) => {
    const { id } = req.body;
    mydatabase.query('DELETE FROM products WHERE id = ?', [id], (error) => {
        if (error) {
            console.log(error);
            return res.redirect('/admin/dashboard?error=remove_failed');
        }
        res.redirect('/admin/dashboard?success=removed');
    });
});

module.exports = router;