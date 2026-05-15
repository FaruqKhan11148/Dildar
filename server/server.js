const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');
dotenv.config();
const app = express();
const server = http.createServer(app);

// SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: '*',

    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on(
    'join_order_room',

    (orderId) => {
      socket.join(orderId);
    },
  );

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// ACCESS IO IN CONTROLLERS
app.set('io', io);

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

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
