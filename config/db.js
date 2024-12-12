const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
console.log('MongoDB URI:', uri);

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Connection error:', error.message);
    }
}

module.exports = connectDB;