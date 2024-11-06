const router = require('express').Router()
const User = require('../models/User')
const { registerUserValidation, loginUserValidation } = require('../validation/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utils = require('../utility')
const { encryptDEK } = require('../utilities/encryption')

router.post('/register', async (req, res) => {
    if (!req.body.email) return res.status(400).json({ success: false, message: 'email required!!!' });
    if (!req.body.password) return res.status(400).json({ success: false, message: 'password required!!!' });
    if (!req.body.masterKey) return res.status(400).json({ success: false, message: 'Master key required!!!' });

    //validate the data before saving to database
    const error = registerUserValidation(req.body)
    if (error?.message) return res.status(400).json({ success: false, message: error.message, data: null });

    //check if email exists in the database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).json({ success: false, message: 'Email already exists', data: null });

    // hash password using bcrypt 
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const encryptedDEK = encryptDEK(null, req.body.masterKey);
    console.log('register dek', encryptedDEK);

    const user = new User({
        email: req.body.email,
        password: hashedPassword,
        masterKey: encryptedDEK,
    })

    try {
        const savedUser = await user.save();
        return res.status(201).json({ success: true, message: 'User registered successfully', data: null });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.post('/login', async (req, res) => {
    console.log(req.body)
    if (!req.body.email) return res.status(400).json({ success: false, message: 'email required!!!' });
    if (!req.body.password) return res.status(400).json({ success: false, message: 'password required!!!' });

    try {
        // validate the data before saving to database
        const error = loginUserValidation(req.body)
        if (error?.message) return res.status(400).json({ success: false, message: error.message, data: null });
        // check if email exists in the database and get the user's password(data) so that we can compare hashes
        const user = await User.findOne({ email: req.body.email })
        if (!user) return utils.responseHandler(res, 400, 'error', 'Email not found', null);

        const matched = await bcrypt.compare(req.body.password, user.password);
        if (!matched) return res.status(400).json({ success: false, message: 'Invalid password', data: null });

        // create token using jsonwebtoken library
        const token = jwt.sign({ _id: user._id, username: user.name }, process.env.TOKEN_SECRET)
        const userData = await User.findOne({ email: req.body.email })

        const userinfo = {
            'email': userData.email,
            'username': userData.username,
        }

        const response = { ...userinfo, token }
        console.log(response)
        return res.status(200).json({ success: true, message: 'User logged in successfully', data: response });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Interal server error', data: null });
    }
})

router.post('/verifyToken', async (req, res) => {
    if (!req.body.token) return res.status(400).json({ success: false, message: 'Token required', data: null });

    const verified = await jwt.verify(req?.body?.token, process.env.TOKEN_SECRET)

    if (verified) return res.status(200).json({ success: true, message: 'OK', data: { token: req.body.token } });
    return res.status(400).json({ success: false, message: 'Invalid token', data: null });
})


module.exports = router