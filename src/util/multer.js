const multer = require("multer");
const path = require('path');

const storageConfig = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'dump\\images'));
    },
    filename: (req, file, cb) => {
        cb(null, `${req.body.name}_${Date.now()}_${file.originalname}`);
    },
});

function validateFile(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}

exports.handleImageUpload = multer({
    storage: storageConfig,
    limits: {fileSize: 5000000},
    fileFilter: validateFile
}).array("images", 12);