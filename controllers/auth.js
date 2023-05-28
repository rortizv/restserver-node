const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verify if email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'User or Password are not correct - email'
            });
        }

        // Verify if user is active
        if (!user.state) {
            return res.status(400).json({
                msg: 'User or Password are not correct - state: false'
            });
        }

        // Verify password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User or Password are not correct - password'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            msg: 'Login successfully',
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Something went wrong'
        });
    }
}

module.exports = {
    login
}