var request = require('./requestModule');

var sendTextMessage = function (text, callback) {
    request.sendTextMessage(text, function (error, data) {
        if (error)
            callback(error, null);
        else
            callback(null, data);
    });
};

var sendImageMessage = function (imageName, callback) {
    request.sendImageMessage(imageName, function (error, data) {
        if (error)
            callback(error, null);
        else
            callback(null, data);
    });
};

var replyTemplateMessage = function (replyToken, callback) {
    request.replyTemplateMessage(replyToken, function (error, data) {
        if (error)
            callback(error, null);
        else
            callback(null, data);
    });
};

module.exports = {
    sendTextMessage: sendTextMessage,
    sendImageMessage: sendImageMessage,
    replyTemplateMessage: replyTemplateMessage
};