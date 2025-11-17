const API_BASE = 'http://localhost:5000/api';
let currentUser = null;
let token = localStorage.getItem('token');

// Mock data for demo
const mockProducts = [
  { _id: '1', name: 'Laptop', description: 'High-performance laptop', price: 999, imageUrl: 'https://via.placeholder.com/300', category: 'Electronics', stock: 10 },
  { _id: '2', name: 'Phone', description: 'Smartphone', price: 599, imageUrl: 'https://via.placeholder.com/300', category: 'Electronics', stock: 20 },
  { _id: '3', name: 'Book', description: 'Programming book', price: 29, imageUrl: 'https://via.placeholder.com/300', category: 'Books', stock: 50 },
];

let mockCart = JSON.parse(localStorage.getItem('cart')) || [];
let mockOrders = JSON.parse(localStorage.getItem('orders')) || [];

if (token) {
  currentUser = JSON.parse(localStorage.getItem('user'));
  updateNav();
}

function updateNav() {
  const authLinks = document.getElementById('auth-links');
  const userLinks = document.getElementById('user-links');
  if (currentUser) {
    authLinks.style.display = 'none';
    userLinks.style.display = 'block';
  } else {
    authLinks.style.display = 'block';
    userLinks.style.display = 'none';
  }
}

function showPage(page) {
  const content = document.getElementById('content');
  switch (page) {
    case 'home':
      loadProducts();
      break;
    case 'cart':
      loadCart();
      break;
    case 'login':
      content.innerHTML = `
        <form id="login-form">
          <h2>Login</h2>
          <div>
            <label>Email:</label>
            <input type="email" id="login-email" required>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" id="login-password" required>
          </div>
          <button type="submit" class="btn">Login</button>
        </form>
      `;
      document.getElementById('login-form').addEventListener('submit', login);
      break;
    case 'register':
      content.innerHTML = `
        <form id="register-form">
          <h2>Register</h2>
          <div>
            <label>Name:</label>
            <input type="text" id="register-name" required>
          </div>
          <div>
            <label>Email:</label>
            <input type="email" id="register-email" required>
          </div>
          <div>
            <label>Password:</label>
            <input type="password" id="register-password" required>
          </div>
          <button type="submit" class="btn">Register</button>
        </form>
      `;
      document.getElementById('register-form').addEventListener('submit', register);
      break;
    case 'orders':
      loadOrders();
      break;
  }
}

function loadProducts() {
  const content = document.getElementById('content');
  content.innerHTML = '<h2>Products</h2><div class="product-list"></div>';
  const productList = content.querySelector('.product-list');
  mockProducts.forEach(product => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${product.imageUrl}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>$${product.price}</p>
        <button class="btn" onclick="addToCart('${product._id}')">Add to Cart</button>
        <button class="btn" onclick="viewProduct('${product._id}')">View Details</button>
      </div>
    `;
  });
}

function viewProduct(id) {
  const product = mockProducts.find(p => p._id === id);
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="product-card">
      <img src="${product.imageUrl}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p>$${product.price}</p>
      <p>Stock: ${product.stock}</p>
      <button class="btn" onclick="addToCart('${product._id}')">Add to Cart</button>
      <button class="btn" onclick="showPage('home')">Back to Products</button>
    </div>
  `;
}

function addToCart(productId) {
  if (!currentUser) {
    alert('Please login to add to cart');
    showPage('login');
    return;
  }
  const existingItem = mockCart.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    mockCart.push({ productId, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(mockCart));
  alert('Added to cart');
}

function loadCart() {
  if (!currentUser) {
    alert('Please login to view cart');
    showPage('login');
    return;
  }
  const content = document.getElementById('content');
  content.innerHTML = '<h2>Cart</h2>';
  if (mockCart.length === 0) {
    content.innerHTML += '<p>Your cart is empty</p>';
  } else {
    let total = 0;
    mockCart.forEach(item => {
      const product = mockProducts.find(p => p._id === item.productId);
      total += product.price * item.quantity;
      content.innerHTML += `
        <div class="cart-item">
          <div>
            <h3>${product.name}</h3>
            <p>$${product.price} x ${item.quantity}</p>
          </div>
          <button class="btn" onclick="removeFromCart('${item.productId}')">Remove</button>
        </div>
      `;
    });
    content.innerHTML += `<p>Total: $${total}</p><button class="btn" onclick="placeOrder()">Place Order</button>`;
  }
}

function removeFromCart(productId) {
  mockCart = mockCart.filter(item => item.productId !== productId);
  localStorage.setItem('cart', JSON.stringify(mockCart));
  loadCart();
}

function placeOrder() {
  if (mockCart.length === 0) {
    alert('Cart is empty');
    return;
  }
  const order = {
    _id: Date.now().toString(),
    items: mockCart.map(item => {
      const product = mockProducts.find(p => p._id === item.productId);
      return { product: product, quantity: item.quantity, price: product.price };
    }),
    totalAmount: mockCart.reduce((total, item) => {
      const product = mockProducts.find(p => p._id === item.productId);
      return total + product.price * item.quantity;
    }, 0),
    status: 'Pending',
  };
  mockOrders.push(order);
  localStorage.setItem('orders', JSON.stringify(mockOrders));
  mockCart = [];
  localStorage.setItem('cart', JSON.stringify(mockCart));
  alert('Order placed successfully');
  showPage('home');
}

function loadOrders() {
  if (!currentUser) {
    alert('Please login to view orders');
    showPage('login');
    return;
  }
  const content = document.getElementById('content');
  content.innerHTML = '<h2>My Orders</h2>';
  if (mockOrders.length === 0) {
    content.innerHTML += '<p>No orders yet</p>';
  } else {
    mockOrders.forEach(order => {
      content.innerHTML += `
        <div class="order-item">
          <h3>Order ID: ${order._id}</h3>
          <p>Total: $${order.totalAmount}</p>
          <p>Status: ${order.status}</p>
          <ul>
            ${order.items.map(item => `<li>${item.product.name} x ${item.quantity} - $${item.price * item.quantity}</li>`).join('')}
          </ul>
        </div>
      `;
    });
  }
}

function login(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  // Mock login
  if (email === 'user@example.com' && password === 'password') {
    currentUser = { name: 'User', email: email };
    localStorage.setItem('user', JSON.stringify(currentUser));
    updateNav();
    showPage('home');
  } else {
    alert('Invalid credentials');
  }
}

function register(e) {
  e.preventDefault();
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  // Mock register
  currentUser = { name: name, email: email };
  localStorage.setItem('user', JSON.stringify(currentUser));
  updateNav();
  showPage('home');
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  token = null;
  currentUser = null;
  updateNav();
  showPage('home');
}

// Load home page on start
showPage('home');
