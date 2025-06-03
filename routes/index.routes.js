const express = require('express');
const router = express.Router();
const { upload, cloudinary } = require('../config/multer.config');
const filesModel = require('../models/files.model');
const auth = require('../middleware/authe');

router.get('/home', auth, async (req, res) => {
    try {
        const userFiles = await filesModel.find({ uploadedBy: req.user.userId });
        res.render('home', { files: userFiles, user: req.user });
    } catch (error) {
        console.error('Get /home error:', error);
        res.status(500).send('Server Error');
    }
});

router.post('/upload', auth, upload.single('file'), async (req, res) => {
    try {
        const newFile = await filesModel.create({
            filename: req.file.originalname,
            cloudinaryUrl: req.file.path,
            cloudinaryId: req.file.filename,
            uploadedBy: req.user.userId
        });
        // Redirect to home page after successful upload
        res.redirect('/home');
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).send('Server Error');
    }
});

router.post('/delete/:fileId', auth, async (req, res) => {
    try {
        const file = await filesModel.findOne({ 
            _id: req.params.fileId, 
            uploadedBy: req.user.userId 
        });

        if (!file) {
            return res.status(404).redirect('/home');
        }

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(file.cloudinaryId);
        
        // Delete from database
        await filesModel.deleteOne({ _id: req.params.fileId });

        res.redirect('/home');
    } catch (error) {
        console.error('Delete error:', error);
        res.redirect('/home');
    }
});

module.exports = router;

