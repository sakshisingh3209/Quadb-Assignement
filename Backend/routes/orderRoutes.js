const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController');
const verifyToken = require('../middlewares/verifyToken'); // Ensure the path is correct

router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getOrders);
router.get('/:id', verifyToken, getOrderById);
router.put('/:id', verifyToken, updateOrder);
router.delete('/:id', deleteOrder);
module.exports = router;