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
                    <input type="number" class="quantity-input" value="1" min="1" max="9">
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Re-attach remove functionality
        attachRemoveListeners();
    }

    function attachRemoveListeners() {
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.closest('.cart-item').getAttribute('data-product-id');
                removeCartItem(productId);
            });
        });
    }

    function removeCartItem(productId) {
        // Remove item from cart array
        cart = cart.filter(item => item.id !== productId);
        updateCart();
        if (document.querySelector('.swal2-container')) {
            updateCheckoutModal(); // Update checkout modal if it is open
        }
    }

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const productId = productCard.getAttribute('data-product-id');
            const productName = productCard.querySelector('h2').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const productImage = productCard.querySelector('img').src;

            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage
            };

            cart.push(product);
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

    // Hide cart dropdown when clicking outside
    document.addEventListener('click', function (event) {
        if (!cartBtn.contains(event.target) && !cartDropdown.contains(event.target)) {
            cartDropdown.classList.remove('show');
        }
    });

    // Function to update checkout modal content
    function updateCheckoutModal() {
        Swal.getPopup().querySelector('.cart-items').innerHTML = `
            ${cart.map(item => `
                <div class="cart-item" data-product-id="${item.id}">
                    <button class="remove-item-btn" aria-label="Remove item">&times;</button>
                    <img src="${item.image}" alt="Product Image" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p class="price">${item.price}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <input type="number" class="quantity-input" value="1" min="1">
                    </div>
                </div>
            `).join('')}
        `;
        attachRemoveListeners(); // Re-attach remove listeners
    }

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
                                <input type="number" id="count" class="quantity-input" value="1" min="1">
                            </div>
                        </div>
                    `).join('')}
                </div>
                <h2>Product Details</h2>
                <form id="product-form">
                    <input type="hidden" id="product-id" name="product-id">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                    <label for="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" required>
                    <label for="country">State:</label>
                    <select id="country" name="country" required>
                        <option value="tn-01" selected>Tunis</option>
                        <option value="tn-02">Ariana</option>
                        <option value="tn-03">Ben Arous</option>
                        <option value="tn-04">Manouba</option>
                        <option value="tn-05">Bizerte</option>
                        <option value="tn-06">Nabeul</option>
                        <option value="tn-07">Zaghouan</option>
                        <option value="tn-08">Beja</option>
                        <option value="tn-09">Jendouba</option>
                        <option value="tn-10">Kef</option>
                        <option value="tn-11">Siliana</option>
                        <option value="tn-12">Kasserine</option>
                        <option value="tn-13">Sidi Bouzid</option>
                        <option value="tn-14">Sousse</option>
                        <option value="tn-15">Monastir</option>
                        <option value="tn-16">Mahdia</option>
                        <option value="tn-17">Gabes</option>
                        <option value="tn-18">Mednine</option>
                        <option value="tn-19">Tozeur</option>
                        <option value="tn-20">Kebili</option>
                        <option value="tn-21">Gafsa</option>
                        <option value="tn-22">Tataouine</option>
                        <option value="tn-23">Sfax</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
            `,
            focusConfirm: false,
            didOpen: () => {
                updateCheckoutModal(); // Update modal content after it opens
            },
            preConfirm: () => {
                const name = Swal.getPopup().querySelector('#name').value;
                const email = Swal.getPopup().querySelector('#email').value;
                const address = Swal.getPopup().querySelector('#address')?.value || ''; // Adjust if you need to handle address
                const phone = Swal.getPopup().querySelector('#phone').value;
                const productCount = Swal.getPopup().querySelector('#count').value;

                // Calculate the total count of items in the cart
                const count = Array.from(Swal.getPopup().querySelectorAll('.quantity-input')).reduce((total, input) => total + parseInt(input.value, 10), 0);

                if (!name || !email || !address || !phone) {
                    Swal.showValidationMessage(`Please fill in all fields`);
                }

                return { name, email, address, phone, productCount };
            }
        });
    }

    // Expose checkout function globally
    window.checkout = checkout;
});
