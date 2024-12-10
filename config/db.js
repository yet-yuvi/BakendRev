const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
console.log('MongoDB URI:', uri);

const connectDB = async() => {
    try {
        await mongoose.connect(
            uri, {
                useNewUrlParser: true
            }
        )
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Connection error:', error.message);
    }
}

module.exports = connectDB;