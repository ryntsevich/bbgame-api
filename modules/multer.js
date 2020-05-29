const multer = require('multer');

exports.upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads')
        },
        filename: function (req, file, cb) {
            let filename = Math.random().toString().slice(2,10) + Date.now() + '.' + file.originalname.split('.').pop();
            cb(null, filename);
        }
    })
});