const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const isAdmin = require('../middlewares/isAdmin');
const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', verifyToken, isAdmin, addProduct);
router.put('/:id', verifyToken, isAdmin, updateProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

module.exports = router;