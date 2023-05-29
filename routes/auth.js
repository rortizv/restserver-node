const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignin } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();


router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }).not(),
    validateFields
], login);

router.post('/google', [
    check('id_token', 'id_token is required').not().isEmpty(),
    validateFields
], googleSignin);

module.exports = router;