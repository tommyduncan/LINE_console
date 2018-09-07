const async = require('async');
const moment = require('moment');
const memberModel = require('../schemas/memberSchema');
const LineUsers = require('../schemas/lineUserSchema');
const SendMessage = require('../schemas/sendMessageSchema');
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

    /* 處理欲發送的訊息物件 */
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

    /* 處理欲發送的群組 */
    switch (targets) {
        case 'all':    // 所有使用者
            LineUsers.find((err, lineUsers) => {
                if (err) return console.error(err);

                for (index in lineUsers) {
                    userIds.push(lineUsers[index].userId);
                }

                multicast(targets, userIds, messageObjects, (error, result) => {
                    if (error)
                    callback(error, null);
                else
                    callback(null, result);
                });
            });
            break;

        case 'binded':    // 已綁定的使用者
            memberModel.find(function (err, members) {
                if (err) return console.error(err);

                for (index in members) {
                    userIds.push(members[index].userId);
                }

                multicast(targets, userIds, messageObjects, (error, result) => {
                    if (error)
                    callback(error, null);
                else
                    callback(null, result);
                });
            });
            break;

        default:
        /* Do nothing. */
    }
}

function multicast(targetType, userIds, messageObjects, callback) {
    var group = 1, user_amount = userIds.length, divided_users = [];

    if (user_amount > 250) {
        group = Math.floor(user_amount / 250);

        if ((array.length % 250) > 0)
            group += 1;

        for (var i = 0; i < group; i++) {
            if (i == (group - 1))
                divided_users.push(array.slice(250 * i));
            else
                divided_users.push(array.slice(250 * i, 250 * (i + 1)));
        }
    } else {
        divided_users.push(userIds);
    }

    async.each(divided_users, (users, callback) => {
        message.multicast(users, messageObjects, (error, result) => {
            if (error)
                callback(error, null);
            else
                callback(null, result);
        });
    }, function (error, results) {
        if (error)
            callback(error, null);
        else{
            /* 處理完推播訊息後，將訊息資料記錄在資料庫中 */
            var sendMessage = new SendMessage({
                target: targetType, 
                messages: messageObjects
            });

            sendMessage.save((error, data) => {
                if(!error)
                    callback(null, results);
                else
                    callback('Error occured when inserting sendMessage Object to database.', null);
            });
        }
    });
}

module.exports = {
    checkKeyword: checkKeyword,
    pushMessages: pushMessages,
    multicastMessages: multicastMessages
};