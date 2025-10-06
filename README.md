# Astrape: E-Commerce Platform ⚡

A modern, full-stack web application combining a seamless accommodation booking experience with a feature-rich e-commerce shopping cart. This project is built with the MERN stack and showcases best practices in API design, state management, and user authentication.

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render">
</p>

## 🚀 Live Demo & Screenshots

-   **Live Site:** [**astrape.vercel.app**](https://astrape-git-main-anuragkumar07070s-projects.vercel.app)
-   **Backend API:** [**astrape-backend.onrender.com**](https://astrape-backend-mzl8.onrender.com)

## ✨ Core Features

-   **✅ Secure User Authentication**: JWT-based registration and login system with password hashing (bcrypt).
-   **✅ Dynamic Shopping Cart**: Add, update quantities, and remove items with real-time total calculations.
-   **✅ Product & Accommodation Browsing**: A clean and intuitive interface for users to browse available items.
-   **✅ Protected API Routes**: Middleware ensures that sensitive actions (like cart management) are restricted to authenticated users.
-   **✅ Responsive Design**: Fully functional and visually appealing on both desktop and mobile devices.
-   **✅ Centralized State Management**: React Context API with reducers for predictable state changes (Auth & Cart).
-   **✅ Admin Capabilities (Optional)**: A foundation for admin users to perform CRUD operations on items and manage bookings.

## 🛠️ Technology Stack

| Area | Technologies |
|---|---|
| **Frontend** | React.js, React Context API, Axios, Bootstrap, CSS3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | JSON Web Tokens (JWT), bcrypt |
| **Deployment** | Vercel (Frontend), Render (Backend) |

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js & npm (or yarn)
-   MongoDB (local instance or a cloud URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/anuragkumar07070/Astrape
    cd astrape
    ```

2.  **Backend Setup:**
    ```sh
    # Navigate to the backend directory
    cd backend

    # Install dependencies
    npm install

    # Create .env file from the example
    cp .env.example .env
    ```
    Now, open `/backend/.env` and add your database URI and JWT secret:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```
    Finally, start the backend server:
    ```sh
    npm run dev
    # Server will be running on http://localhost:5000
    ```

3.  **Frontend Setup:**
    ```sh
    # Open a new terminal and navigate to the frontend directory
    cd frontend

    # Install dependencies
    npm install

    # Start the React development server
    npm start
    # App will be running on http://localhost:3000
    ```

## 📡 API Endpoints

The backend exposes the following RESTful API endpoints:

| Method   | Endpoint             | Description                           |
| :------- | :------------------- | :------------------------------------ |
| `POST`   | `/api/auth/register` | Register a new user.                  |
| `POST`   | `/api/auth/login`    | Log in an existing user.              |
| `GET`    | `/api/items`         | Fetch all available items.            |
| `GET`    | `/api/cart`          | Get the authenticated user's cart.    |
| `POST`   | `/api/cart`          | Add an item to the user's cart.       |
| `PUT`    | `/api/cart/:itemId`  | Update an item's quantity in the cart. |
| `DELETE` | `/api/cart/:itemId`  | Remove an item from the cart.         |


## 🗺️ Future Roadmap

-   [ ] **Admin Dashboard**: A full-featured dashboard for managing products, users, and orders.
-   [ ] **Payment Gateway**: Integrate Stripe or PayPal for real-world transactions.
-   [ ] **Advanced Filtering**: Implement search, sort, and filter functionality for products.
-   [ ] **Real-time Availability**: Use WebSockets for live updates on accommodation booking availability.

## 👤 Author

**Anurag**
-   **GitHub:** https://github.com/anuragkumar07070
-   **LinkedIn:** https://www.linkedin.com/in/anurag-kumar-648957286/
