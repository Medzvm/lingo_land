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

})