const { Router } = require('express');
const { getUsers, 
        createUser, 
        updatePutUser, 
        updatePatchUser, 
        deleteUser } = require('../controllers/users');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();


router.get('/', getUsers);

router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }).not(),
        check('password', 'Password is required').not().isEmpty(),
        check('role', 'Role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        validateFields
], createUser);

router.put('/:id', updatePutUser);

router.patch('/:id', updatePatchUser);

router.delete('/', deleteUser);

module.exports = router;