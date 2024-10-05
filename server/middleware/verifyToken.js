const jwt = require('jsonwebtoken')
const User = require('../models/User');

const verify = async (req, res, next) => {
    const token = req?.header('Authorization')?.slice(7);
    if (!token) return res.status(401).json({ success: false, message: "Access denied" });

    try {
        const verified = await jwt.verify(token, process.env.TOKEN_SECRET)
        let user;
        try {
            user = await User.findById({ _id: verified._id }).select('-password')
        } catch (err) {
            return res.status(401).json({ success: false, message: "Access denied" });
        }
        req.user = user;
        next()
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid token" });
    }
}

module.exports.verify = verify