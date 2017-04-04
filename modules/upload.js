var options = {
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
};

module.exports = options;