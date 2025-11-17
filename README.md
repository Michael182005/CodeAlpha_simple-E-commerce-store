📌 E-Commerce Website – Full Stack Project

This is a basic Full Stack E-Commerce Web Application developed as part of my internship task at CodeAlpha.
The platform allows users to browse products, view product details, add items to a cart, and place orders after authentication.

🚀 Tech Stack
Frontend

HTML5

CSS3

Vanilla JavaScript (Fetch API)

Backend

Node.js

Express.js

Database

MongoDB

Mongoose ORM

Authentication & Security

JWT (JSON Web Token) for login authentication

bcrypt for password hashing

Environment variables stored in .env

🛒 Features
Module	Features
User	Register, Login, Logout, Auth-protected routes
Products	Browse all products, View product details
Shopping Cart	Add/Remove items, Quantity update, Total price calculation
Orders	Place orders, Order stored in DB, View past orders
Security	JWT validation for protected actions
🔗 API Endpoints
Authentication
Method	Endpoint	Description
POST	/api/auth/register	Create new user
POST	/api/auth/login	Authenticate and return JWT
Products
Method	Endpoint	Description
GET	/api/products	Get all products
GET	/api/products/:id	Get single product details
Cart
Method	Endpoint	Description
POST	/api/cart/add	Add item to cart
GET	/api/cart	Get user cart
DELETE	/api/cart/remove/:productId	Remove item
Orders
Method	Endpoint	Description
POST	/api/orders	Place order
GET	/api/orders/my	Get user’s order history
🔐 Authentication Flow

1️⃣ Register a user → JWT not required
2️⃣ Login → JWT token stored in localStorage
3️⃣ Token included in Authorization: Bearer <token> for:

Add to Cart

Place Order

View My Orders

If token missing → user blocked from protected actions

📦 Future Enhancements (Optional)

✔ Admin panel for product management
✔ Payment gateway integration
✔ Search & filtering
✔ Product reviews

👨‍💻 Developer

Name: Karthikeyan
Role: Full Stack Intern – CodeAlpha
Contact: karthick182005@gmail.com
