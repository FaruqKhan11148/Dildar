const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const server = http.createServer(app);

// SOCKET SETUP
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

app.set("io", io);

// SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
});

// DB
connectDB();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// TEST
app.get('/', (req, res) => {
  res.send('API Running 🚀');
});

// ERROR
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});