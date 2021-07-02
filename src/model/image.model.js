const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
    parentId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    url: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Image", imagesSchema);