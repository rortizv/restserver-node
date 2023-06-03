const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isAdminRole } = require('../middlewares/validate-roles');

const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory, 
    deleteCategory} = require('../controllers/categories');
    
const { categoryByIdExists } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categories
 */


// Get all categories - public
router.get('/', getCategories);

// Get category by id - public
router.get('/:id', [
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(categoryByIdExists),
    validateFields,
], getCategoryById);

// Create category - private
router.post('/', [
    validateJWT,
    check('name', 'Category name is required').not().isEmpty(),
    validateFields
], createCategory);

// Update category - private
router.put('/:id', [
    validateJWT,
    check('name', 'Category name is required').not().isEmpty(),
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(categoryByIdExists),
    validateFields
], updateCategory);

// Delete category - private (set inactive & admin role)
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(categoryByIdExists),
    validateFields
], deleteCategory);

module.exports = router;