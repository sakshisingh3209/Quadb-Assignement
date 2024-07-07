const express = require('express');
const connectDB = require('./config/db');

//routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const app = express();

require('dotenv').config();

app.use(express.json());


connectDB();
//use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

//port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})