document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const searchBar = document.getElementById('searchBar');
    const cartIcon = document.querySelector('.cart-icon');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutScreen = document.getElementById('checkoutScreen');
    const closeCheckoutBtn = document.getElementById('closeCheckout');
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutTax = document.getElementById('checkoutTax');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    
    let cart = [];
    
    const menuData = 
    [
       { name: 'Cappuccino', description: 'Classic Italian coffee with steamed milk.', price: 120, category: 'beverages' },
   { name: 'Latte', description: 'Creamy coffee with steamed milk and a light foam.', price: 130, category: 'beverages' },
   { name: 'Americano', description: 'Espresso with hot water.', price: 110, category: 'beverages' },
   { name: 'Hot Chocolate', description: 'Rich, creamy chocolate drink.', price: 140, category: 'beverages' },
   { name: 'Masala Chai', description: 'Traditional Indian spiced tea.', price: 80, category: 'beverages' },
   { name: 'Iced Coffee', description: 'Chilled coffee with milk and ice.', price: 150, category: 'beverages' },
   { name: 'Fresh Lime Soda', description: 'Refreshing lime soda with a hint of sweetness.', price: 90, category: 'beverages' },
   { name: 'Cold Brew', description: 'Cold steeped coffee, smooth and less acidic.', price: 160, category: 'beverages' },
   
   { name: 'French Fries', description: 'Crispy golden potato fries.', price: 100, category: 'snacks' },
   { name: 'Garlic Bread (4 pieces)', description: 'Toasted bread with garlic butter.', price: 120, category: 'snacks' },
   { name: 'Cheese Garlic Bread (4 pieces)', description: 'Garlic bread topped with cheese.', price: 150, category: 'snacks' },
   { name: 'Nachos with Salsa & Cheese', description: 'Crispy nachos with salsa and melted cheese.', price: 180, category: 'snacks' },
   { name: 'Vegetable Spring Rolls', description: 'Crispy rolls stuffed with vegetables.', price: 140, category: 'snacks' },
   { name: 'Chicken Nuggets (6 pieces)', description: 'Crispy chicken nuggets.', price: 180, category: 'snacks' },
   { name: 'Paneer Tikka', description: 'Grilled paneer marinated in spices.', price: 200, category: 'snacks' },
   { name: 'Chicken Wings (6 pieces)', description: 'Spicy and tangy grilled chicken wings.', price: 220, category: 'snacks' },
   
   { name: 'Vegetable Grilled Sandwich', description: 'Grilled sandwich with vegetables.', price: 140, category: 'sandwiches' },
   { name: 'Paneer Tikka Sandwich', description: 'Grilled sandwich with paneer tikka filling.', price: 170, category: 'sandwiches' },
   { name: 'Chicken Club Sandwich', description: 'Grilled sandwich with chicken, lettuce, and mayo.', price: 220, category: 'sandwiches' },
   { name: 'Egg Mayo Sandwich', description: 'Sandwich with egg and mayonnaise filling.', price: 150, category: 'sandwiches' },
   { name: 'Veg Wrap', description: 'Wrap filled with sautéed vegetables.', price: 160, category: 'sandwiches' },
   { name: 'Chicken Wrap', description: 'Wrap filled with grilled chicken and veggies.', price: 200, category: 'sandwiches' },
   
   { name: 'Caesar Salad (Veg)', description: 'Classic Caesar salad with lettuce, croutons, and dressing.', price: 180, category: 'salads' },
   { name: 'Caesar Salad (Chicken)', description: 'Caesar salad with grilled chicken strips.', price: 220, category: 'salads' },
   { name: 'Greek Salad', description: 'A refreshing salad with cucumber, tomatoes, olives, and feta cheese.', price: 190, category: 'salads' },
   
   { name: 'Penne Alfredo (White Sauce)', description: 'Penne pasta with creamy white sauce.', price: 220, category: 'pastas' },
   { name: 'Penne Arrabiata (Red Sauce)', description: 'Penne pasta in spicy red sauce.', price: 210, category: 'pastas' },
   { name: 'Spaghetti Aglio e Olio', description: 'Spaghetti with garlic, olive oil, and chili flakes.', price: 230, category: 'pastas' },
   { name: 'Mac and Cheese', description: 'Macaroni in cheesy sauce.', price: 240, category: 'pastas' },
   
   { name: 'Veg Biryani', description: 'Fragrant rice with vegetables and spices.', price: 250, category: 'main-course' },
   { name: 'Chicken Biryani', description: 'Fragrant rice with chicken and spices.', price: 300, category: 'main-course' },
   { name: 'Paneer Butter Masala with Naan (2 pieces)', description: 'Paneer in creamy tomato gravy with naan.', price: 280, category: 'main-course' },
   { name: 'Butter Chicken with Naan (2 pieces)', description: 'Grilled chicken in creamy butter gravy with naan.', price: 320, category: 'main-course' },
   
   { name: 'Chocolate Brownie', description: 'Rich and moist chocolate brownie.', price: 120, category: 'desserts' },
   { name: 'Cheesecake (Slice)', description: 'Creamy cheesecake slice.', price: 180, category: 'desserts' },
   { name: 'Ice Cream Sundae', description: 'Ice cream with toppings and syrup.', price: 150, category: 'desserts' },
   { name: 'Tiramisu (Slice)', description: 'Classic Italian dessert with coffee and mascarpone.', price: 200, category: 'desserts' },
   
   { name: 'Coffee + Sandwich Combo', description: 'Coffee and a sandwich of your choice.', price: 250, category: 'combos' },
   { name: 'Pasta + Cold Drink Combo', description: 'Pasta with a cold drink of your choice.', price: 280, category: 'combos' }
   ];


    const menuContainer = document.querySelector('.menu');


    function addToCart(item) {
        const existingItem = cart.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: item.name,
                price: Number(item.price), // Ensure price is a number
                quantity: 1
            });
        }
        updateCartTotal();
    }

    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `₹${total.toFixed(2)}`;
    }
    function updateCheckoutScreen() {
        checkoutItems.innerHTML = '';
        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.classList.add('checkout-item');
            itemElement.innerHTML = `
                <div class="item-details">
                    <div>${item.name}</div>
                    <div>₹${item.price.toFixed(2)} × ${item.quantity}</div>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <div>₹${itemTotal.toFixed(2)}</div>
            `;
            checkoutItems.appendChild(itemElement);
        });

        // Ensure all calculations use Number type and are properly formatted
        const tax = subtotal * 0.05;
        const total = subtotal + tax;

        checkoutSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
        checkoutTax.textContent = `₹${tax.toFixed(2)}`;
        checkoutTotal.textContent = `₹${total.toFixed(2)}`;
    }
    window.updateQuantity = (index, change) => {
        if (index >= 0 && index < cart.length) {
            const item = cart[index];
            const newQuantity = item.quantity + change;
            
            if (newQuantity > 0) {
                item.quantity = newQuantity;
            } else {
                cart.splice(index, 1);
            }
            
            updateCheckoutScreen();
            updateCartTotal();
        }
    };

    function createMenuItem(item) {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.setAttribute('data-category', item.category);

        menuItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="price">₹${item.price.toFixed(2)}</span>
            <button class="add-to-cart">Add to Cart</button>
        `;

        const addToCartBtn = menuItem.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', () => {
            addToCart(item);
        });

        return menuItem;
    }

    function renderMenu() {
        menuContainer.innerHTML = '';

        menuData.forEach(item => {
            const menuItem = createMenuItem(item);
            menuContainer.appendChild(menuItem);
        });
    }

    // Initialize menu
    renderMenu();

    cartIcon.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        updateCheckoutScreen();
        checkoutScreen.style.display = 'flex';
    });

    closeCheckoutBtn.addEventListener('click', () => {
        checkoutScreen.style.display = 'none';
    });

    placeOrderBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        alert('Order placed successfully! Thank you for your order.');
        cart = [];
        updateCartTotal();
        checkoutScreen.style.display = 'none';
    });
        
    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter menu items
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        const menuItems = document.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            const itemName = item.querySelector('h3').textContent.toLowerCase();
            const itemDesc = item.querySelector('p').textContent.toLowerCase();

            if (itemName.includes(searchTerm) || itemDesc.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });


});