const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async() => {
    try {
        const MONGO_URL = process.env.MONGO_URL;

        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,


        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(`MongoDb Error ${error}`);
    }
}

module.exports = connectDB;