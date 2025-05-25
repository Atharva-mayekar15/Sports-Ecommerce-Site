const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.stripe_secret_key);

router.post('/create-checkout-session', async (req, res) => {
    console.log("Payment route hit");
    const cart = req.body.cart;
    console.log("Received cart:", cart);

    if (!cart || cart.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
    }

    const lineItems = cart.map(item => ({
        price_data: {
            currency: 'inr',
            product_data: { name: item.name },
            unit_amount: Math.round(item.price * 100),
        },
        quantity: 1,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.base_url}/success?session_id={CHECKOUT_SESSION_ID}`, // Include session ID
            cancel_url: `${process.env.base_url}/cancel`,
        });
        console.log("Session created:", session.id);
        res.json({ id: session.id });
    } catch (error) {
        console.error("Stripe error:", error.message);
        res.status(500).json({ error: "Failed to create checkout session", details: error.message });
    }
});

module.exports = router;