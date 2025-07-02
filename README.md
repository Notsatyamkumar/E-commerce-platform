# E-commerce Platform

A simple and responsive e-commerce website where users can browse products, filter by category, view product details, and manage a shopping cart. The site uses localStorage to persist cart data and is designed using Bootstrap for a modern and clean UI.

## 🛍️ Features

- Browse a list of store items with images, prices, and descriptions.
- Filter products by category or name.
- View product details on a dedicated product page.
- Add items to a shopping cart.
- View, clear, and checkout the cart from a sidebar popup or cart page.
- Cart data is stored in `localStorage` for persistence across sessions.

## 🧰 Tools & Technologies

- **HTML5**
- **CSS3**
- **JavaScript (ES6)**
- **Bootstrap 5**
- **localStorage**

## 📁 Project Structure
├── index.html # Home page with store items
├── product.html # Dynamic product details page
├── cart.html # Full cart view (optional if using popup)
├── /js
│ ├── main.js # Core logic for cart, product loading
│ └── utils.js # Utility functions
├── /css
│ └── style.css # Custom styles
├── /images # Product images
└── README.md


## 🧪 How It Works

- Products are displayed on the homepage using cards.
- When a user clicks a product, they are redirected to `product.html` with query parameters (`name`, `price`, `image`).
- The cart is implemented using `localStorage`, allowing users to add or remove items even after refreshing the page.
- The cart can be accessed from a sidebar popup or a separate cart page.

## 📌 Future Improvements

- Add quantity support for cart items.
- Implement login/signup and user-specific carts.
- Integrate payment gateway for checkout.
- Add backend support with a database (e.g., MongoDB, Firebase).

## 🙌 Author

**Satyam Kumar**  
📧 satyamkumar9664@gmail.com  
🌐 [GitHub](https://github.com/Notsatyamkumar) • [LinkedIn](https://linkedin.com/in/notsatyamkumar)
