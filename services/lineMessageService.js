const memberModel = require('../schemas/memberSchema');
const message = require('../utils/messageUtil');
var config = require('../configs/general.config');

var checkKeyword = function (inputText) {
    /* 關鍵字觸發 */
}

var pushMessages = function (target, messageObjects, callback) {
    message.push(target, messageObjects, (err, res) => {
        if (err)
            callback(err, null);
        else
            callback(null, res);
    });
}

/* 群發訊息 */
var multicastMessages = function (targets, messages, callback) {
    var userIds = [];
    var messageObjects = []

    /* 處理欲發送的群組與訊息物件 */
    switch (targets) {
        case 'all':    // 所有使用者
            break;
        case 'binded':    // 已綁定的使用者
            memberModel.find(function (err, members) {
                if (err) return console.error(err);

                for (index in members) {
                    userIds.push(members[index].userId);
                }

                for (let i = 0; i < messages.length; i++) {
                    switch (messages[i].type) {
                        case 'text':
                            var messageObject = { type: 'text', text: messages[i].content };

                            messageObjects.push(messageObject);

                            break;

                        case 'image':
                            var messageObject = {
                                type: 'image',
                                originalContentUrl: config.baseUrl + '/images/uploads/' + messages[i].content,
                                previewImageUrl: config.baseUrl + '/images/uploads/preview/' + messages[i].content
                            };

                            messageObjects.push(messageObject);

                            break;

                        case 'sticker':
                            var packageId = messages[i].content.split('-')[0];
                            var stickerId = messages[i].content.split('-')[1];

                            var messageObject = {
                                type: 'sticker',
                                packageId: packageId,
                                stickerId: stickerId
                            };

                            messageObjects.push(messageObject);

                            break;
                    }
                }

                message.multicast(userIds, messageObjects, (error, result) => {
                    console.log(result)
                    if (error)
                        callback(error, null);
                    else
                        callback(null, result);
                });
            });
            break;
        default:
    }
}

module.exports = {
    checkKeyword: checkKeyword,
    pushMessages: pushMessages,
    multicastMessages: multicastMessages
};