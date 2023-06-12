const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/validate-roles');

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct, 
    deleteProduct } = require('../controllers/products');
    
const { categoryByIdExists, productByIdExists } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/products
 */


// Get all products - public
router.get('/', getProducts);

// Get product by id - public
router.get('/:id', [
    check('id', 'Not a valid id').isMongoId(),
    validateFields,
], getProductById);

// Create product - private
router.post('/', [
    validateJWT,
    check('name', 'Product name is required').not().isEmpty(),
    check('category', 'Not a valid category').isMongoId(),
    check('category').custom(categoryByIdExists),
    validateFields
], createProduct);

// Update product - private
router.put('/:id', [
    validateJWT,
    check('id', 'Not a valid id').isMongoId(),
    check('category', 'Not a valid category').isMongoId(),
    check('id').custom(productByIdExists),
    validateFields
], updateProduct);

// Delete product - private (set inactive & admin role)
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Not a valid id').isMongoId(),
    validateFields
], deleteProduct);

module.exports = router;