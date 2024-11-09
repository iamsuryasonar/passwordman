const router = require('express').Router();
const { verify } = require('../middleware/verifyToken');
const Service = require('../models/Service');
const { decryptDekWithMasterPassword, encryptPasswordWithDek, decryptPasswordWithDek } = require('../utilities/encryption');

router.post('/store-service', verify, async (req, res) => {
    if (!req.body.service) return res.status(400).json({ success: false, message: 'service required!!!' });
    if (!req.body.username) return res.status(400).json({ success: false, message: 'username required!!!' });
    if (!req.body.password) return res.status(400).json({ success: false, message: 'password required!!!' });
    if (!req.body.masterKey) return res.status(400).json({ success: false, message: 'Master key required!!!' });

    try {
        /* 
            if random password generation option is provided in request body then generate random password
        */

        //check if password already exists
        const serviceExist = await Service.findOne({ service: req.body.service, username: req.body.username });
        if (serviceExist) return res.status(400).json({ success: false, message: 'Service already exists', data: null });

        // const encryptedPassword = utils.encryptPassword(req.body.password, req.user.masterKey);
        const encryptedDEK = req.user.masterKey;

        const dek_to_encrypt = decryptDekWithMasterPassword(encryptedDEK, req.body.masterKey);
        // if not decrypted then throw error. (invalid master key)

        const encryptedPassword = encryptPasswordWithDek(req.body.password, dek_to_encrypt);

        const service = new Service({
            user: req.user._id,
            service: req.body.service,
            username: req.body.username,
            password: encryptedPassword,
        })

        const savedService = await service.save();

        const allServices = await Service.find({ user: req.user }).select('-password');
        return res.status(201).json({ success: true, message: 'Service saved successfully', data: allServices });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.get('/get-services', verify, async (req, res) => {

    try {
        const service = await Service.find({ user: req.user }).select('-password');

        return res.status(201).json({ success: true, message: 'Services retrieved successfully', data: service });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.post('/get-service/:id', verify, async (req, res) => {

    if (!req.body.masterKey) return res.status(400).json({ success: false, message: 'Master key required!!!' });
    try {
        const encryptedDEK = req.user.masterKey;

        const dek_to_decrypt = decryptDekWithMasterPassword(encryptedDEK, req.body.masterKey);
        // if not decrypted then throw error. (invalid master key)


        const serviceInfo = await Service.findById({ user: req.user, _id: req.params.id });

        if (!serviceInfo) return res.status(400).json({ success: false, message: 'Service info does not exists', data: null });

        // const decryptedPassword = utils.decryptPassword(serviceInfo.password, req.body.masterKey);

        const decryptedPassword = decryptPasswordWithDek(serviceInfo.password, dek_to_decrypt);

        serviceInfo.password = decryptedPassword;

        return res.status(201).json({ success: true, message: 'Service retrieved successfully', data: serviceInfo });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.put('/update-service/:id', verify, async (req, res) => {

    if (!req.body.masterKey) return res.status(400).json({ success: false, message: 'Master key required!!!' });

    try {
        let encryptedPassword;
        if (req.body.password) {

            const encryptedDEK = req.user.masterKey;

            const dek_to_encrypt = decryptDekWithMasterPassword(encryptedDEK, req.body.masterKey);
            // if not decrypted then throw error. (invalid master key)

            encryptedPassword = encryptPasswordWithDek(req.body.password, dek_to_encrypt);

            // encryptedPassword = utils.encryptPassword(req.body?.password, req.user.masterKey);
        }

        const serviceInfo = await Service.findById({ user: req.user, _id: req.params.id });

        const updatedService = await Service.findByIdAndUpdate(
            { _id: req.params.id, user: req.user._id, deleted: false },
            {
                service: req.body.service || serviceInfo.service,
                username: req.body.username || serviceInfo.username,
                password: encryptedPassword || serviceInfo.password,
            },
        );
        const service = await Service.find({ user: req.user }).select('-password');

        return res.status(201).json({ success: true, message: 'Service updated successfully', data: service });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.put('/delete-service/:id', verify, async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(
            { _id: req.params.id, user: req.user._id },
            {
                deleted: true,
                bookmarked: false,
            },
        );

        const service = await Service.find({ user: req.user }).select('-password');

        return res.status(201).json({ success: true, message: 'Service moved to trash successfully', data: service });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.put('/undo-deleted-service/:id', verify, async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(
            { _id: req.params.id, user: req.user._id },
            {
                deleted: false,
            },
        );

        const service = await Service.find({ user: req.user }).select('-password');

        return res.status(201).json({ success: true, message: 'Service unarchived successfully', data: service });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.put('/bookmark-service/:id', verify, async (req, res) => {

    try {
        const updatedService = await Service.findByIdAndUpdate(
            { _id: req.params.id, user: req.user._id, deleted: false },
            {
                bookmarked: true,
            },
        );
        const service = await Service.find({ user: req.user }).select('-password');
        return res.status(201).json({ success: true, message: 'Service bookmarked successfully', data: service });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.put('/undo-bookmark-service/:id', verify, async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(
            { _id: req.params.id, user: req.user._id, deleted: false },
            {
                bookmarked: false,
            },
        );
        const service = await Service.find({ user: req.user }).select('-password');
        return res.status(201).json({ success: true, message: 'Service unmarked successfully', data: service });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.get('/get-deleted-services', verify, async (req, res) => {

    try {
        const service = await Service.find({ user: req.user, deleted: true }).select('-password');

        return res.status(201).json({ success: true, message: 'Services retrieved successfully', data: service });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.get('/get-bookmarked-services', verify, async (req, res) => {

    try {
        const service = await Service.find({ user: req.user, bookmarked: true, deleted: false }).select('-password');

        return res.status(201).json({ success: true, message: 'Services retrieved successfully', data: service });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})

router.delete('/permanently-delete-service/:id', verify, async (req, res) => {
    try {
        let deletedService = await Service.deleteOne({ _id: req.params.id, user: req.user._id });
        const service = await Service.find({ user: req.user }).select('-password');

        return res.status(201).json({ success: true, message: 'Services deleted permanently', data: service });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Internal server error', data: null });
    }
})


module.exports = router;