const mongoose = require("mongoose");

const materialDrinkSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    },
    level: {
        type: Number,
        required: true,
        default: 1,
    },
});

module.exports = mongoose.model("MaterialDrink", materialDrinkSchema);