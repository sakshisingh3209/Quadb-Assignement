const express = require('express');
const Cart = require('../models/cart');




//retrieve the user's shopping cart
const getCart = async(req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price');
        if (!cart) {
            return res.status(400).json({ error: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


//add item to the cart

const addItem = async(req, res) => {
    try {
        const { product, price, quantity } = req.body;
        const userId = req.user.id;
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId });
        }
        await cart.addItem(productId, price, quantity);
        res.json(cart);
    } catch (error) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const deleteItem = async(req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        await cart.removeItem(productId);
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { getCart, addItem, deleteItem };