const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    mongoose.connection.on('connected', () => {
      console.log('Connected DB:', mongoose.connection.name);
    });

    console.log('MongoDB Connected 🚀');

  } catch (error) { 
    console.log('MongoDB Connection Error:', error.message);

    process.exit(1);
  }
};

module.exports = connectDB;
