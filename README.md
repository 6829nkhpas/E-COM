# Vibe Commerce - E-Commerce Application

A full-stack e-commerce application built with React, Node.js, Express, and MongoDB. This project features a complete shopping cart system with product browsing, cart management, and checkout functionality.

![Nexora E-Commerce](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Features

- **Product Catalog**: Browse through a variety of products with images, prices, and descriptions
- **Shopping Cart**: Add, update, and remove items from cart with real-time updates
- **Checkout System**: Complete mock checkout with order confirmation
- **Responsive Design**: Mobile-first design that works on all devices
- **Persistent Cart**: Cart data persists in MongoDB between sessions
- **REST API**: Full-featured backend API with error handling

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Nodemon** - Auto-restart server on changes
- **Jest** - Testing framework
- **Supertest** - HTTP testing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/6829nkhpas/E-COM.git
cd E-com
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Update .env with your MongoDB URI (default: mongodb://localhost:27017/vibe-commerce)

# Seed the database with sample products
npm run seed

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Start the frontend development server
npm run dev
```

The frontend application will start on `http://localhost:3000`

## 🎯 Running the Application

### Development Mode

**Option 1: Run separately (recommended)**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

**Option 2: Production Mode**

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm run build
npm run preview
```

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
  ```json
  { "productId": "string", "qty": number }
  ```
- `PUT /api/cart/:id` - Update cart item quantity
  ```json
  { "qty": number }
  ```
- `DELETE /api/cart/:id` - Remove item from cart

### Checkout
- `POST /api/checkout` - Process checkout
  ```json
  {
    "cartItems": [{ "productId": "string", "name": "string", "price": number, "qty": number }],
    "name": "string",
    "email": "string"
  }
  ```

### Health Check
- `GET /api/health` - Server health status

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 📁 Project Structure

```
vibe-commerce/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── productController.js
│   │   │   ├── cartController.js
│   │   │   └── checkoutController.js
│   │   ├── models/
│   │   │   ├── Product.js
│   │   │   ├── CartItem.js
│   │   │   └── Receipt.js
│   │   ├── routes/
│   │   │   ├── products.js
│   │   │   ├── cart.js
│   │   │   └── checkout.js
│   │   ├── middlewares/
│   │   │   └── errorHandler.js
│   │   ├── utils/
│   │   │   └── db.js
│   │   ├── index.js
│   │   └── seed.js
│   ├── __tests__/
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ReceiptModal.jsx
│   │   ├── pages/
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   └── CheckoutPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🎨 Design Features

- **Orange Theme**: Primary color #FFA500 matching the Nexora brand
- **Responsive Grid**: 1-4 column layout adapting to screen size
- **Clean UI**: Minimalist design with clear call-to-action buttons
- **Stock Badges**: Visual indicators for product availability
- **Cart Badge**: Real-time cart item count in header
- **Modal Receipts**: Elegant order confirmation display

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 📝 Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample products
- `npm test` - Run tests

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Make sure MongoDB is running
sudo systemctl start mongod

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### CORS Issues
Make sure the backend CORS is configured to allow requests from the frontend URL.

## 🚀 Deployment

### Backend (Heroku/Railway)
1. Set environment variables
2. Connect MongoDB Atlas
3. Deploy from Git repository

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Author

**6829nkhpas**
- GitHub: [@6829nkhpas](https://github.com/6829nkhpas)

## 🙏 Acknowledgments

- Design inspiration from Nexora E-Commerce
- Product images from Unsplash
- Icons from Unicode Emoji

---

**Note**: This is a mock e-commerce application for educational purposes. No real transactions are processed.
