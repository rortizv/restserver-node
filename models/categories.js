const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true
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

CategorySchema.methods.toJSON = function() {
    const { __v, state, ...category } = this.toObject();
    return category;
}

module.exports = model('Category', CategorySchema);