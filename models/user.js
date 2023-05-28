const { Schema, model } = require('mongoose');
const Role = require('./role');

const role = new Role();

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        minlength: 4,
        required: [true, 'Password is required']
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: role.name
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = model('User', UserSchema);