function admin(req, res, next) {
    if (req.user.isAdmin) {
        return next();
    } else {
        return res.send('Access denied!').status(403);
    }

}

module.exports = admin;