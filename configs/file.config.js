const path = require('path');
const uuidv4 = require('uuid/v4');

var options = {
    destination: function (req, file, callback) {
        callback(null, './public/images/uploads')
    },
    filename: function (req, file, callback) {
        // callback(null, file.originalname)
        callback(null, uuidv4() + path.extname(file.originalname))
    }
};

module.exports = options;