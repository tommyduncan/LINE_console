var options = {
    destination: function (req, file, callback) {
        callback(null, './public/images/uploads')
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
};

module.exports = options;