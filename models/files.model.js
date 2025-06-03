const mongoose = require('mongoose');
const upload = require('../config/cloudinary.config');

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    }, 
    cloudinaryUrl: {
        type: String,
        required: true
    },cloudinaryId: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, 
{ timestamps: true }
);

module.exports = mongoose.model('File', fileSchema);
