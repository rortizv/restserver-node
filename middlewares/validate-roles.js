const { response } = require('express')


const isAdminRole = (req, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'Need token to validate role'
        });
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not authorized to perform this action`
        });
    }

    next();
}

const hasRole = ( ...roles ) => {
    return (req, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Need token to validate role'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `Role ${roles} is not authorized to perform this action`
            });
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}