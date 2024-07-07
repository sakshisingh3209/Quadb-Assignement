const express = require('express');
const { getCart, addItem, deleteItem } = require('../controllers/cartController');
const router = express.Router();



router.get('/', getCart);
router.post('/', addItem);
router.delete('/:id', deleteItem);


module.exports = router;