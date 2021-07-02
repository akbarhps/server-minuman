const Product = require('../model/product.model');
const Image = require('../model/image.model');
const path = require('path');
const {productAggregate} = require('../util/aggregate');

exports.insertProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);
        await product.save();

        for (const file of req.files) {
            await new Image({
                parentId: product._id,
                url: path.join(file.destination, file.filename)
            }).save();
        }

        const data = await doAggregate(next, product._id);
        sendResponse(res, 200, "Success", data);
    } catch (e) {
        next({status, message: e.message});
    }
}

exports.getProducts = async (req, res, next) => {
    const page = Number(req.query.page) || 0;
    const limit = Number(req.query.limit) || 10;
    const data = await doAggregate(next, undefined, page, limit);
    sendResponse(res, 200, "Success", data);
}

exports.getProductById = async (req, res, next) => {
    const data = await doAggregate(next, req.params.id);
    sendResponse(res, 200, "Success", data);
}

exports.editProduct = async (req, res, next) => {
    try {
        let product = await findProduct(next, req.params.id);
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;

        for (const file of req.files) {
            await new Image({
                parentId: product._id,
                url: `${file.destination}\\${file.filename}`
            }).save();
        }

        await product.save();
        product = await doAggregate(next, product._id);
        sendResponse(res, 200, "Product Successfully Updated", product);
    } catch (e) {
        next({status: 500, message: e.message});
    }
}

exports.deleteProduct = async (req, res, next) => {
    const product = await findProduct(next, req.params.id);
    try {
        await Image.deleteMany({"parentId": product._id});
        await product.delete();
        sendResponse(res, 200, "Product Successfully Deleted");
    } catch (e) {
        next({status: 500, message: e.message});
    }
}

const findProduct = async (next, id) => {
    const product = await Product.findById(id);
    if (!product) {
        next({status: 404, message: 'Product not found!'});
        return;
    }
    return product;
};

async function doAggregate(next, id = undefined, page = 0, limit = 10) {
    try {
        return await Product.aggregate(productAggregate(id, page, limit));
    } catch (e) {
        next({status: 500, message: e.message});
    }
}

function sendResponse(res, status = 200, message = "Success", data = []) {
    res.status(status).json({status, message, data});
}