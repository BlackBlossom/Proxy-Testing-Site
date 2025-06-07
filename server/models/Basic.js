const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BasicSchema = new Schema({
    //Name of the website
    name: {
        type: String,
        required: true,
        trim: true
    },
    //Logo URL
    logoUrl: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true // adds createdAt & updatedAt fields
});

module.exports = mongoose.model('Basic', BasicSchema);