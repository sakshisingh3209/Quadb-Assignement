const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');

//create a new order
const createOrder = async(req, res) => {
    const { user, products, totalAmount, status } = req.body;

    try {
        const newOrder = new Order({
            user,
            products,
            totalAmount,
            status
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// retrieve all orders
const getOrders = async(req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//retrieve details of a specific order
const getOrderById = async(req, res) => {
    const orderId = req.params.id;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



//update the status of an order

const updateOrder = async(req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status, updatedAt: Date.now() }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(updatedOrder);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//cancel an order
const deleteOrder = async(req, res) => {
    const orderId = req.params.id;
    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};