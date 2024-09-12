const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + Path2D.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/mp4|mov|webm/avi/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Images and Videos only!');
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10000000 }
});

module.exports = upload;