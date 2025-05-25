let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCountElement = document.getElementById('cart-count');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartModal = document.getElementById('cart-modal');
const cartBtn = document.querySelector('.cart-btn');
const closeCart = document.querySelector('.close-cart');
const proceedPaymentBtn = document.getElementById('proceed-payment');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const searchBar = document.querySelector('.search-bar');
const productItems = document.querySelectorAll('.product-item');


cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'block';
});


closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});


window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});


addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const imgSrc = button.getAttribute('data-img');

        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({ name, price, imgSrc, quantity: 1 });
        }
        updateCart();
        button.textContent = 'Added!';
        setTimeout(() => button.textContent = 'Add to Cart', 1000);
    });
});


function updateCart() {
    cartCountElement.textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * (item.quantity || 1);
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}">
            <span>${item.name} - ₹${item.price.toFixed(2)} (x${item.quantity || 1})</span>
            <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
            <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartItemsElement.appendChild(itemElement);
    });

    cartTotalElement.textContent = `Total: ₹${total.toFixed(2)}`;
    localStorage.setItem('cart', JSON.stringify(cart));

  
    document.querySelectorAll('.qty-btn').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            const action = button.getAttribute('data-action');
            if (action === 'increase') {
                cart[index].quantity = (cart[index].quantity || 1) + 1;
            } else if (action === 'decrease') {
                if ((cart[index].quantity || 1) > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1); // Remove if quantity drops to 0
                }
            }
            updateCart();
        });
    });

 
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        });
    });
}


proceedPaymentBtn.addEventListener('click', async () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const response = await fetch('/payment/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart })
    });

    const { id } = await response.json();
    const stripe = Stripe('pk_test_51Qwc8XAhbcFtVucLPCGuBSrqpT3w00BKg8R6aXFnxLEXwKfLqjQEJggXmoJunb0BBFij1OihRELgFmv0AhM3KhN400lYEmljuI');
    stripe.redirectToCheckout({ sessionId: id });
});


searchBar.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    productItems.forEach(item => {
        const productName = item.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchText)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
});


const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));


updateCart();