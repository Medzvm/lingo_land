document.addEventListener('DOMContentLoaded', function () {
    const cartBtn = document.querySelector('.cart-btn');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const closeModalBtn = document.querySelector('.close-btn');
    const modal = document.getElementById('product-modal');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    let cart = [];

    // Toggle cart dropdown
    cartBtn.addEventListener('click', function () {
        cartDropdown.classList.toggle('show');
    });

    // Close modal
    closeModalBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Click outside modal to close
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function removeCartItem(productId) {
        // Remove item from cart array
        cart = cart.filter(item => item.id !== productId);
        updateCart();
        if (document.querySelector('.swal2-container')) {
            updateCheckoutModal(); // Update checkout modal if it is open
        }
    }

// Add to cart functionality
// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const productCard = this.closest('.product-card');
        const productId = productCard.getAttribute('data-product-id');
        const productName = productCard.querySelector('h2').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productImage = productCard.querySelector('img').src;

        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            // If the product already exists in the cart, increase the quantity
            existingProduct.quantity += 1;
        } else {
            // Otherwise, add a new product with quantity set to 1
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };
            cart.push(product);
        }

        updateCart();
        Swal.fire({
            toast: true,
            position: "bottom",
            showConfirmButton: false,
            timer: 1200,
            timerProgressBar: true,
            icon: "success",
            title: "Item added"
        });
    });
});

// Update cart
function updateCart() {
    cartCount.textContent = cart.length;
    cartItemsContainer.innerHTML = ''; // Clear existing items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.setAttribute('data-product-id', item.id);
        cartItem.innerHTML = `
            <button class="remove-item-btn" aria-label="Remove item">&times;</button>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="price">${item.price}</p>
            </div>
            <div class="cart-item-quantity">
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="9">
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Re-attach remove functionality
    attachRemoveListeners();
}

// Re-attach remove listeners function
function attachRemoveListeners() {
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.closest('.cart-item').getAttribute('data-product-id');
            removeCartItem(productId);
        });
    });
}

// Function to remove cart item
function removeCartItem(productId) {
    // Remove item from cart array
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    if (document.querySelector('.swal2-container')) {
        updateCheckoutModal(); // Update checkout modal if it is open
    }
}


    // Hide cart dropdown when clicking outside
    document.addEventListener('click', function (event) {
        if (!cartBtn.contains(event.target) && !cartDropdown.contains(event.target)) {
            cartDropdown.classList.remove('show');
        }
    });


    // Checkout function to show the product details form


    function checkout() {
        Swal.fire({
            showConfirmButton: false,
            html: `
                <h2>Your Cart</h2>
                <div class="cart-items">
                    ${cart.map(item => `
                        <div class="cart-item" data-product-id="${item.id}">
                            <button class="remove-item-btn" aria-label="Remove item">&times;</button>
                            <img src="${item.image}" alt="Product Image" class="cart-item-image">
                            <div class="cart-item-details">
                                <h3>${item.name}</h3>
                                <p class="price">${item.price}</p>
                            </div>
                            <div class="cart-item-quantity">
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="9">
                            </div>
                        </div>
                    `).join('')}
                </div>
                <h2>Product Details</h2>
                <form id="product-form">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                    <label for="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" required>
                    <label for="country">State:</label>
                    <select id="country" name="country" required>
                        <option value="Tunis">Tunis</option>
                        <option value="Ariana">Ariana</option>
                        <option value="Ben Arous">Ben Arous</option>
                        <option value="Manouba">Manouba</option>
                        <option value="Bizerte">Bizerte</option>
                        <option value="Nabeul">Nabeul</option>
                        <option value="Zaghouan">Zaghouan</option>
                        <option value="Beja">Beja</option>
                        <option value="Jendouba">Jendouba</option>
                        <option value="Kef">Kef</option>
                        <option value="Siliana">Siliana</option>
                        <option value="Kasserine">Kasserine</option>
                        <option value="Sidi Bouzid">Sidi Bouzid</option>
                        <option value="Sousse">Sousse</option>
                        <option value="Monastir">Monastir</option>
                        <option value="Mahdia">Mahdia</option>
                        <option value="Sfax">Sfax</option>
                        <option value="Gabes">Gabes</option>
                        <option value="Mednine">Mednine</option>
                        <option value="Tozeur">Tozeur</option>
                        <option value="Kebili">Kebili</option>
                        <option value="Gafsa">Gafsa</option>
                        <option value="Tataouine">Tataouine</option>
                        <option value="Kairouan">Kairouan</option>
                    </select>
                    <button type="submit" id="submit-btn">Submit</button>
                </form>
            `,
            focusConfirm: false,
        });
    
        // Attach event listeners to quantity inputs within the checkout modal
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function () {
                const cartItemElement = this.closest('.cart-item');
                const productId = cartItemElement.getAttribute('data-product-id');
                const newQuantity = parseInt(this.value, 10);
    
                // Update the cart with the new quantity
                const cartItem = cart.find(item => item.id === productId);
                if (cartItem) {
                    cartItem.quantity = newQuantity;
                }
    
                // Update the cart display (if you want to reflect changes immediately)
                updateCart();
            });
        });
    
        // Listen for form submission
        const form = Swal.getPopup().querySelector('form');
        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault(); // Prevent default form submission
    
                // Extract form values
                const name = form.querySelector('#name')?.value || '';
                const email = form.querySelector('#email')?.value || '';
                const phone = form.querySelector('#phone')?.value || '';
                const country = form.querySelector('#country')?.value || '';
    
                // Handle cart items
                const products = cart.map(item => {
                    return {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity // Use updated quantity from cart
                    };
                });
    
                console.log('Products:', products); // Log products to ensure they're captured correctly
    
                // Call the function to send data
                sendProductToGoogleSheets(name, email, phone, country, products);
            });
        } else {
            console.error('Form not found');
        }
    }
    

    // Expose checkout function globally
    window.checkout = checkout;
});
function sendProductToGoogleSheets(name, email, phone, country, products) {
    console.log('Submitting:', { name, email, phone, country, products });

    Swal.fire({
        title: "Sending...",
        text: "Please wait while your purchase is being processed.",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        },
    });

    const scriptUrl = "https://script.google.com/macros/s/AKfycbxtXUeLDKXPUsIzP9Nys9QyLLekuI6G5GtEfLH-_y80qbVPRKl7R6K5zIBQcM_K5xNCiA/exec"; // Your script URL
    const xhr = new XMLHttpRequest();

    xhr.open("POST", scriptUrl, true);
    xhr.setRequestHeader("Accept", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            Swal.close(); // Close the loading dialog
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log('Google Sheets Response:', response);
                Swal.fire({
                    title: "Success!",
                    text: "Your purchase has been successfully processed.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else {
                console.error('Error:', xhr.status, xhr.statusText);
                Swal.fire({
                    title: "Error!",
                    text: "There was an error processing your request.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        }
    };

    // Prepare the data as FormData
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('country', country);
    formData.append('products', JSON.stringify(products)); // Convert products to JSON string

    xhr.send(formData);
}
