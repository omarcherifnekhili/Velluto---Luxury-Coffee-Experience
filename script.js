document.addEventListener('DOMContentLoaded', function() {
    const products = [
        {
            id: 1,
            title: "Velluto Classico",
            description: "Our signature blend with velvety texture and notes of dark chocolate",
            price: 29.99,
            image: "https://images.unsplash.com/photo-1522992319-0365e5f11656?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 2,
            title: "Ethiopian Velvet",
            description: "Single-origin with floral aroma and citrus notes",
            price: 34.99,
            image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 3,
            title: "Colombian Supremo",
            description: "Rich and balanced with caramel sweetness",
            price: 27.99,
            image: "https://images.unsplash.com/photo-1522725843938-035891590561?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 4,
            title: "Italian Espresso",
            description: "Dark roast with intense flavor and crema",
            price: 45.99,
            image: "https://images.unsplash.com/photo-1524686788093-aa1f9c0f7c4f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    // DOM Elements
    const productGrid = document.querySelector('.product-grid');
    const cartButton = document.getElementById('cartButton');
    const cartModal = document.getElementById('cartModal');
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartCount = document.querySelector('.cart-count');
    const totalPriceElement = document.querySelector('.total-price');
    
    // Cart state
    let cart = [];
    function renderProducts() {
        productGrid.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            
            productGrid.appendChild(productCard);
        });
    }

    function renderCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
            totalPriceElement.textContent = '$0.00';
            return;
        }

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 2000);
    }

    // Event listeners
    function setupEventListeners() {
        // Add to cart
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = parseInt(e.target.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                
                cart.push({...product});
                updateCartCount();
                showNotification(`${product.title} added to cart`);
            }

            // Remove from cart
            if (e.target.classList.contains('cart-item-remove') || 
                e.target.parentElement.classList.contains('cart-item-remove')) {
                const button = e.target.classList.contains('cart-item-remove') ? 
                    e.target : e.target.parentElement;
                const productId = parseInt(button.getAttribute('data-id'));
                
                cart = cart.filter(item => item.id !== productId);
                updateCartCount();
                renderCart();
                showNotification('Item removed from cart');
            }
        });

        // Cart button
        cartButton.addEventListener('click', () => {
            cartModal.style.display = 'block';
            renderCart();
        });

        // Close modals
        document.querySelectorAll('.close-modal').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.style.display = 'none';
                });
            });
        });
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }
    renderProducts();
    setupEventListeners();
});