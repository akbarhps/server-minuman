const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});
module.exports = mongoose.model("Product", productSchema);