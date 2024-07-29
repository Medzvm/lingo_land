document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('show');
    });
});
document.getElementById('logo').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default anchor behavior
    window.location.reload(); // Reload the page
});
document.addEventListener('DOMContentLoaded', function () {
    const cartBtn = document.querySelector('.cart-btn');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const closeModalBtn = document.querySelector('.close-btn');
    const modal = document.getElementById('product-modal');
    const cartItemsContainer = document.querySelector('.cart-items');

    // Toggle cart dropdown
    cartBtn.addEventListener('click', function () {
        cartDropdown.classList.toggle('show');
    });

    // Show modal with product details
    cartItemsContainer.addEventListener('click', function (event) {
        if (event.target.closest('.cart-item')) {
            const cartItem = event.target.closest('.cart-item');
            const productId = cartItem.getAttribute('data-product-id');
            document.getElementById('product-id').value = productId;
            // Additional logic to populate other fields if needed
            modal.style.display = 'block';
        }
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

    // Cart functionality
    const cart = [];
    const cartCount = document.querySelector('.cart-count');

    function updateCart() {
        cartCount.textContent = cart.length;
        cartItemsContainer.innerHTML = ''; // Clear existing items
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.setAttribute('data-product-id', item.id);
            cartItem.innerHTML = `
                <img src="${item.image}" alt="Product Image">
                <h3>${item.name}</h3>
                <p class="price">${item.price}</p>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

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
            alert(`${productName} has been added to your cart!`);
        });
    });

    // Hide cart dropdown when clicking outside
    document.addEventListener('click', function (event) {
        if (!cartBtn.contains(event.target) && !cartDropdown.contains(event.target)) {
            cartDropdown.classList.remove('show');
        }
    });
});