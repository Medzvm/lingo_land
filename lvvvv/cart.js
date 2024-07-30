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
 })