var request = require('./requestModule');

var sendTextMessage = function (text, callback) {
    request.sendTextMessage(text, function (error, data) {
        if (error)
            callback(error, null);
        else
            callback(null, data);
    });
};

module.exports = {
    sendTextMessage: sendTextMessage
};