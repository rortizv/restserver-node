const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');
const { validateFields } = require('../middlewares/validate-fields');
const { getUsers, 
        createUser, 
        updatePutUser, 
        updatePatchUser, 
        deleteUser } = require('../controllers/users');

const router = Router();


router.get('/', getUsers);

router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }).not(),
        check('password', 'Password is required').not().isEmpty(),
        check('role').custom(async(role = '') => {
                const existsRole = await Role.findOne({ role });
                if (!existsRole) {
                        throw new Error(`Role ${role} is not registered in the database`);
                }
        }),
        validateFields
], createUser);

router.put('/:id', updatePutUser);

router.patch('/:id', updatePatchUser);

router.delete('/', deleteUser);

module.exports = router;