const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        unique: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    // User that is performing the action
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

ProductSchema.methods.toJSON = function() {
    const { __v, ...product } = this.toObject();
    return product;
}

module.exports = model('Product', ProductSchema);