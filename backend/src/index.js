require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
const errorHandler = require("./middlewares/errorHandler");

const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const checkoutRoutes = require("./routes/checkout");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Vibe Commerce API is running" });
});

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
