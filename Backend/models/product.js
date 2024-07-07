const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0,
    },
    available: {
        type: Boolean,
        default: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

//pre save hook to update updatedAt field
productSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
})

module.exports = mongoose.model('Product', productSchema);