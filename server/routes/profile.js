const router = require('express').Router()
const User = require('../models/User')
const { encryptDekWithMasterPassword, decryptDekWithMasterPassword } = require('../utilities/encryption')
const { verify } = require('../middleware/verifyToken');

router.put('/update-master-key', verify, async (req, res) => {

    if (!req.body.masterPassword) return res.status(400).json({ success: false, message: 'Master password required!!!' });
    if (!req.body.newMasterKey) return res.status(400).json({ success: false, message: 'New Master password required!!!' });

    try {
        let newEncryptedDEK;
        if (req.body.newMasterKey) {

            const encryptedDEK = req.user.masterPassword;

            const decryptedDEK = decryptDekWithMasterPassword(encryptedDEK, req.body.masterPassword);
            // if not decrypted then throw error. (invalid master key)
            newEncryptedDEK = encryptDekWithMasterPassword(decryptedDEK, req.body.newMasterKey);
        }

        const userInfo = await User.findById({ _id: req.user._id });

        const updatedMasterKey = await User.findByIdAndUpdate(
            { _id: req.user._id },
            {
                email: req.body.service || userInfo.service,
                password: req.body.password || userInfo.password,
                masterPassword: newEncryptedDEK || userInfo.masterPassword,
            },
        );

        return res.status(201).json({ success: true, message: 'Password updated successfully', data: null });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

module.exports = router