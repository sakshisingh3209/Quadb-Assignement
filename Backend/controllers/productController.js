const Product = require('../models/product');


//get products
const getProducts = async(req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
//get product by id

const getProductById = async(req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};


const addProduct = async(req, res) => {
    const { name, description, price, category, quantity, available } = req.body;
    try {
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            quantity,
            available

        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

//update product
const updateProduct = async(req, res) => {
    const productId = req.params.id;
    const { name, description, price, category, quantity, available } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId, { name, description, price, category, quantity, available, updatedAt: Date.now() }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
//delete product
const deleteProduct = async(req, res) => {
    const productId = req.params.id;
    try {
        const deleteProduct = await Product.findByIdAndDelete(productId);
        if (!deleteProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}
module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}