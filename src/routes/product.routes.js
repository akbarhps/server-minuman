const router = require('express').Router();
const controller = require('../controller/product.controller');
const {handleImageUpload} = require('../util/multer');

router.get('/', controller.getProducts);

router.get('/:id', controller.getProductById);

router.post('/', handleImageUpload, controller.insertProduct);

router.post('/:id', handleImageUpload, controller.editProduct);

router.delete('/:id', controller.deleteProduct);

module.exports = router;