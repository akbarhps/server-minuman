const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: [
        {
            type: ObjectId,
            ref: "Image",
        },
    ],
    type: {
        type: ObjectId,
        ref: "Type",
    },
});

module.exports = mongoose.model("Product", productSchema);