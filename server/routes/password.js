const router = require('express').Router();
const { verify } = require('../middleware/verifyToken');
const Password = require('../models/Password');
const User = require('../models/User');
const utils = require('../utility');
const { decryptDEK, encrypt, decrypt } = require('../utilities/encryption');

router.post('/store-password', verify, async (req, res) => {
    if (!req.body.service) return res.status(400).json({ success: false, message: 'service required!!!' });
    if (!req.body.username) return res.status(400).json({ success: false, message: 'username required!!!' });
    if (!req.body.password) return res.status(400).json({ success: false, message: 'password required!!!' });
    if (!req.body.masterKey) return res.status(400).json({ success: false, message: 'Master key required!!!' });

    /* 
        if random password generation option is provided in request body then generate random password
    */

    //check if password already exists
    const passwordExist = await Password.findOne({ service: req.body.service, username: req.body.username });
    if (passwordExist) return res.status(400).json({ success: false, message: 'Password for this service already exists', data: null });

    // const encryptedPassword = utils.encryptPassword(req.body.password, req.user.masterKey);
    const encryptedDEK = req.user.masterKey;

    const dek_to_encrypt = decryptDEK(encryptedDEK, req.body.masterKey);
    // if not decrypted then throw error. (invalid master key)

    const encryptedPassword = encrypt(req.body.password, dek_to_encrypt);

    const password = new Password({
        user: req.user._id,
        service: req.body.service,
        username: req.body.username,
        password: encryptedPassword,
    })

    try {
        const savedPassword = await password.save();
        return res.status(201).json({ success: true, message: 'Password saved successfully', data: null });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.get('/get-passwords', verify, async (req, res) => {

    try {
        const passwords = await Password.find({ user: req.user }).select('-password');

        return res.status(201).json({ success: true, message: 'Passwords retrieved successfully', data: passwords });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.post('/get-password/:id', verify, async (req, res) => {

    if (!req.body.masterKey) return res.status(400).json({ success: false, message: 'Master key required!!!' });
    const encryptedDEK = req.user.masterKey;

    const dek_to_decrypt = decryptDEK(encryptedDEK, req.body.masterKey);
    // if not decrypted then throw error. (invalid master key)

    try {

        const passwordInfo = await Password.findById({ user: req.user, _id: req.params.id });

        if (!passwordInfo) return res.status(400).json({ success: false, message: 'Password info does not exists', data: null });

        // const decryptedPassword = utils.decryptPassword(passwordInfo.password, req.body.masterKey);

        const decryptedPassword = decrypt(passwordInfo.password, dek_to_decrypt);

        passwordInfo.password = decryptedPassword;

        return res.status(201).json({ success: true, message: 'Password retrieved successfully', data: passwordInfo });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.put('/update-password/:id', verify, async (req, res) => {

    if (!req.body.masterKey) return res.status(400).json({ success: false, message: 'Master key required!!!' });

    try {
        let encryptedPassword;
        if (req.body.password) {

            const encryptedDEK = req.user.masterKey;

            const dek_to_encrypt = decryptDEK(encryptedDEK, req.body.masterKey);
            // if not decrypted then throw error. (invalid master key)

            encryptedPassword = encrypt(req.body.password, dek_to_encrypt);

            // encryptedPassword = utils.encryptPassword(req.body?.password, req.user.masterKey);
        }

        const passwordInfo = await Password.findById({ user: req.user, _id: req.params.id });

        const updatedPassword = await Password.findByIdAndUpdate(
            { _id: req.params.id, user: req.user._id },
            {
                service: req.body.service || passwordInfo.service,
                username: req.body.username || passwordInfo.username,
                password: encryptedPassword || passwordInfo.password,
            },
        );

        return res.status(201).json({ success: true, message: 'Password updated successfully', data: null });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.put('/delete-password/:id', verify, async (req, res) => {
    try {
        const updatedPassword = await Password.findByIdAndUpdate(
            { _id: req.params.id, user: req.user._id },
            {
                deleted: true,
            },
        );

        return res.status(201).json({ success: true, message: 'Password deleted successfully', data: null });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.put('/undo-delete-password/:id', verify, async (req, res) => {
    try {
        const updatedPassword = await Password.findByIdAndUpdate(
            { _id: req.params.id, user: req.user._id },
            {
                deleted: false,
            },
        );

        return res.status(201).json({ success: true, message: 'Password unarchived successfully', data: null });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.put('/bookmark-password/:id', verify, async (req, res) => {

    try {
        const updatedPassword = await Password.findByIdAndUpdate(
            { _id: req.params.id, user: req.user._id },
            {
                bookmarked: true,
            },
        );

        return res.status(201).json({ success: true, message: 'Password bookmarked successfully', data: null });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.put('/undo-bookmark-password/:id', verify, async (req, res) => {
    try {
        const updatedPassword = await Password.findByIdAndUpdate(
            { _id: req.params.id, user: req.user._id },
            {
                bookmark: false,
            },
        );

        return res.status(201).json({ success: true, message: 'Password unmarked successfully', data: null });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.get('/get-deleted-passwords', verify, async (req, res) => {

    try {
        const passwords = await Password.find({ user: req.user, deleted: true }).select('-password');

        return res.status(201).json({ success: true, message: 'Passwords retrieved successfully', data: passwords });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.get('/get-bookmarked-passwords', verify, async (req, res) => {

    try {
        const passwords = await Password.find({ user: req.user, bookmarked: true }).select('-password');

        return res.status(201).json({ success: true, message: 'Passwords retrieved successfully', data: passwords });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})



module.exports = router;