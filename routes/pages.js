const express = require('express');
const { requireAuth } = require('./authMiddleware');
const mydatabase = require('../db');
const stripe = require('stripe')(process.env.stripe_secret_key, {
    apiVersion: '2022-11-15'
});
const router = express.Router();

router.get('/', requireAuth, (req, res) => {
    mydatabase.query('SELECT * FROM products', (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Database error');
        }
        mydatabase.query('SELECT isAdmin FROM users WHERE id = ?', [req.user.id], (err, user) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Database error');
            }
            res.render('index', { products: results, user: user[0] });
        });
    });
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/success', requireAuth, async (req, res) => {
    const sessionId = req.query.session_id;
    if (!sessionId) {
        return res.render('success', { receipt: null });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
        
        const receipt = {
            items: lineItems.data.map(item => ({
                name: item.description,
                price: (item.amount_total / 100).toFixed(2),
                quantity: item.quantity
            })),
            total: (session.amount_total / 100).toFixed(2),
            date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            transactionId: session.payment_intent || session.id
        };

        
        mydatabase.query('INSERT INTO orders SET ?', {
            user_id: req.user.id,
            transaction_id: receipt.transactionId,
            total: receipt.total
        }, (err, result) => {
            if (err) {
                console.error('Error saving order:', err);
            } else {
                const orderId = result.insertId;
                const orderItems = receipt.items.map(item => [orderId, item.name, item.price, item.quantity]);
                mydatabase.query('INSERT INTO order_items (order_id, product_name, price, quantity) VALUES ?', [orderItems], (error) => {
                    if (error) console.error('Error saving order items:', error);
                });
            }
        });

        res.render('success', { receipt });
    } catch (error) {
        console.error('Error retrieving Stripe session:', error);
        res.render('success', { receipt: null });
    }
});

router.get('/cancel', requireAuth, (req, res) => {
    res.render('cancel');
});

module.exports = router;