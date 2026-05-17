const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');
dotenv.config();
const app = express();

// CONNECT DB
connectDB();

// MIDDLEWARE
app.use(cors());

app.use(express.json());

// ROUTES
app.use('/api/products', productRoutes);

app.use('/api/orders', orderRoutes);

// TEST ROUTE
app.get('/', (req, res) => {
  res.send('Dildar Chicken API Running 🚀');
});

// ERROR HANDLER
app.use(errorHandler);

// SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});