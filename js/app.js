// add items to the cart and manage popup cart visibility and totals
(function(){
    const cartBtn = document.querySelectorAll('.store-item-icon');
    const popupCartItemsContainer = document.getElementById('cart-items');
    const popupCart = document.getElementById('popup-cart');
    const popupCartTotalDisplay = document.getElementById('cart-total-display');
    const popupCartTotalContainer = document.getElementById('cart-total-popup');
    const popupCartButtonsContainer = document.getElementById('cart-buttons-popup');

    cartBtn.forEach(function(btn){
        btn.addEventListener('click', function(event){
            if (event.target.parentElement.classList.contains('store-item-icon')) {
                let fullPath =
                event.target.parentElement.previousElementSibling.src;
                
                // --- EXTRACTING IMAGE PATH FOR CART --- 
                // This takes the original image path (e.g., img/cake-1.jpeg) and changes it to img-cart/cake-1.jpeg
                let pos = fullPath.indexOf('img') + 3;
                let partPath = fullPath.slice(pos);

                const item = {};
                item.img = `img-cart${partPath}`;

                // --- EXTRACTING ITEM NAME AND PRICE --- 
                let name = event.target.parentElement.parentElement.nextElementSibling
                .children[0].children[0].textContent;
                item.name = name;

                let price = event.target.parentElement.parentElement.nextElementSibling
                .children[0].children[1].textContent;

                let finalPrice = price.slice(1).trim();
                item.price = finalPrice;

                const cartItem = document.createElement('div');
                cartItem.classList.add(
                    'cart-item',
                    'd-flex',
                    'justify-content-between',
                    'text-capitalize',
                    'my-3');

                // --- CONSTRUCTING AND ADDING CART ITEM HTML --- 
                cartItem.innerHTML = `
                  <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                  <div class="item-text">
      
                    <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                    <span>$</span>
                    <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                  </div>
                  <a href="#" id='cart-item-remove' class="cart-item-remove">
                    <i class="fas fa-trash"></i>
                  </a>
                </div>
                `;

                popupCartItemsContainer.appendChild(cartItem);
                alert('Item added to the cart');
                
                // Add event listener to remove button for dynamically created items
                const removeBtn = cartItem.querySelector('.cart-item-remove');
                removeBtn.addEventListener('click', function() {
                    cartItem.remove();
                    showTotals();
                });

                showTotals(); // --- UPDATE TOTALS AFTER ADDING ITEM ---
            }
        });
    });

    // show Totals for the new popup cart
    function showTotals(){
        const total = [];
        // Select prices within the popup cart's items container
        const items = popupCartItemsContainer.querySelectorAll('.cart-item-price');
        items.forEach(function(item){
            total.push(parseFloat(item.textContent));
        });
        
        const totalMoney = total.reduce((total, item) => {
            total += item;
            return total;
        }, 0);
        const finalMoney = totalMoney.toFixed(2);

        // Remove the "Your cart is empty" message if it exists in the popup cart
        const emptyMessage = popupCartItemsContainer.querySelector('.text-center.text-capitalize');
        if (emptyMessage) {
            emptyMessage.remove();
        }

        if (total.length === 0) {
            // If cart is empty, display message and hide total and buttons
            popupCartTotalContainer.style.display = 'none';
            popupCartButtonsContainer.style.display = 'none';
            popupCartItemsContainer.innerHTML = '<p class="text-center text-capitalize">Your cart is empty</p>';
            if(popupCartTotalDisplay) popupCartTotalDisplay.textContent = '0.00';

        } else {
            // If cart has items, show total and buttons
            popupCartTotalContainer.style.display = 'flex';
            popupCartButtonsContainer.style.display = 'flex';
            if(popupCartTotalDisplay) popupCartTotalDisplay.textContent = finalMoney;
        }
    }

    // Clear Cart button for popup cart
    const clearCartBtn = document.getElementById('clear-cart-popup');
    clearCartBtn.addEventListener('click', function() {
        const cartItems = popupCartItemsContainer.querySelectorAll('.cart-item');
        cartItems.forEach(function(item) {
            item.remove();
        });
        showTotals();
    });

    // Checkout button for popup cart
    const checkoutBtn = document.getElementById('checkout-popup');
    checkoutBtn.addEventListener('click', function() {
        alert('Checkout is not yet implemented.');
    });

    // Floating cart button toggle for popup cart
    const floatingCartButton = document.querySelector('.floating-cart-button');
    floatingCartButton.addEventListener('click', function() {
        popupCart.classList.toggle('show-popup-cart');
        showTotals(); // Update totals when opening the cart to ensure correct state
    });

    // Initial call to showTotals for popup cart (to display "Your cart is empty" if no items)
    showTotals();

})();

// Functionality for other buttons and search (already existing and targeting the main page)
(function() {
    // Smooth scroll for Explore button in banner
    const exploreBtn = document.querySelector('.banner-link');
    exploreBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const storeSection = document.getElementById('store');
        storeSection.scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Smooth scroll for Explore button in about section
    const aboutExploreBtn = document.querySelector('.about .btn-black');
    aboutExploreBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const storeSection = document.getElementById('store');
        storeSection.scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            const filter = event.target.dataset.filter;
            const storeItems = document.querySelectorAll('.store-item');

            storeItems.forEach(function(item) {
                if (filter === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });

    // Search functionality
    const searchInput = document.getElementById('search-item');
    searchInput.addEventListener('keyup', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const storeItems = document.querySelectorAll('.store-item');
        storeItems.forEach(function(item) {
            const itemName = item.querySelector('#store-item-name').textContent.toLowerCase();
            if (itemName.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

})();
document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");

  // Retrieve cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="text-center text-muted">Your cart is empty.</p>`;
    return;
  }

  cart.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item d-flex align-items-center mb-3";

    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img me-3" />
      <div class="cart-item-info">
        <h5 class="mb-1">${item.name}</h5>
        <p class="mb-0 fw-bold">$${item.price}</p>
      </div>
    `;

    cartItemsContainer.appendChild(itemElement);
  });
});
