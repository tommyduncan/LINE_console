const sizeOf = require('image-size');
const images = require("images");

var resizeImage = function (imageName) {
    sizeOf('./public/images/uploads/' + imageName, function (err, dimensions) {
        if (!err) {
            if (dimensions.width > 240 || dimensions.height > 240) {
                if (dimensions.width / dimensions.height >= 0 && dimensions.width > 240) {
                    if (dimensions.width > 1024) {
                        images('./public/images/uploads/' + imageName)
                            .resize(1024)
                            .save('./public/images/uploads/' + imageName);
                    }

                    images('./public/images/uploads/' + imageName)
                        .resize(240)
                        .save('./public/images/uploads/preview/' + imageName);
                } else if (dimensions.width / dimensions.height < 0 && dimensions.height > 240) {
                    if (dimensions.height > 1024) {
                        images('./public/images/uploads/' + imageName)
                            .resize(null, 1024)
                            .save('./public/images/uploads/' + imageName);
                    }

                    images('./public/images/uploads/' + imageName)
                        .resize(null, 240)
                        .save('./public/images/uploads/preview/' + imageName);
                }
            } else {
                images('./public/images/uploads/' + imageName)
                    .save('./public/images/uploads/preview/' + imageName);
            }
        } else
            console.log(err);
    });
}

module.exports = {
    resizeImage: resizeImage
}