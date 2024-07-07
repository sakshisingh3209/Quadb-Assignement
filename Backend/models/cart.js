const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        price: {
            type: Number,
            required: true,
        },
        subtotal: {
            type: Number,
            required: true,
            default: function() {
                return this.quantity * this.price;
            }
        }
    }],
    status: {
        type: String,
        enum: ['active', 'checked_out', 'abandoned'],
        default: 'active',
    },
    total: {
        type: Number,
        default: function() {
            return this.items.reduce((acc, item) => acc + item.subtotal, 0);
        }
    }

}, { timestamps: true });

cartSchema.methods.addItem = function(productId, price, quantity = 1) {
    const existingItem = this.items.find(item => item.productId.equals(productId));
    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.subtotal = existingItem.quantity * existingItem.price;
    } else {
        this.items.push({ productId, price, quantity, subtotal: price * quantity });
    }
    this.total = this.items.reduce((acc, item) => acc + item.subtotal, 0);
    return this.save();
}


cartSchema.methods.removeItem = function(productId) {
    this.items = this.items.filter(item => !item.productId.equals(productId));
    this.total = this.items.reduce((acc, item) => acc + item.subtotal, 0);
    return this.save();
}
module.exports = mongoose.model('Cart', cartSchema);