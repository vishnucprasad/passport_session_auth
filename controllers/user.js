const User = require("../models/user")

exports.register = async (req, res, next) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json(user);
    } catch (e) {
        return next(e);
    }
}

exports.login = async (req, res, next) => {
    res.status(200).json(req.user);
}

exports.getAuth = (req, res, next) => res.status(200).json(req.user);

exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.status(200).json({ logout: true });
    });
}