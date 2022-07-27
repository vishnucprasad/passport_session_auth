const verifyLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send('Unauthorized');
    }

    next();
}

module.exports = verifyLogin;