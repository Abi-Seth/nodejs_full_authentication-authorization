const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.send({
            success: false,
            status: 401,
            message: 'Unauthorized due to missing token!'
        }).status(401)
    }

    try {
        // const decoded = jwt.verify(token.split('Bearer ')[1], config.get('jwtPrivateKey'));
        // req.user = decoded;
        jwt.verify(token.split(' ')[1], config.get('jwtPrivateKey'), (error, payload) => {
            req.user = payload;

        })
        next();

    } catch (err) {
        res.send({
            success: false,
            status: 400,
            message: 'Invalid token && ' + err.message
        }).status(400)
    }

}

module.exports = auth;