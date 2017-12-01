var request = require('request');
var config = require('../configs/general.config');

var sendTextMessage = function (textContent, callback) {
    var requestBody = {
        to: 'Ub5538a8f30409f45c7e7ba551dca9385',
        messages: [
            {
                type: 'text',
                text: textContent
            }
        ]
    };

    request(
        {
            url: 'https://api.line.me/v2/bot/message/push',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + config.LINE.channelAccessToken
            },
            method: 'POST',
            body: JSON.stringify(requestBody)
        },
        function (error, response, body) {
            if (error)
                callback(error, null);
            else if (response.body.error)
                callback(response.body.error, null);
            else
                callback(null, body);
        }
    );
};

var sendImageMessage = function (imageName, callback) {
    var requestBody = {
        to: 'Ub5538a8f30409f45c7e7ba551dca9385',
        messages: [
            {
                type: 'image',
                originalContentUrl: config.baseUrl + 'images/uploads/' + imageName,
                previewImageUrl: config.baseUrl + 'images/uploads/preview/' + imageName
            }
        ]
    };

    request(
        {
            url: 'https://api.line.me/v2/bot/message/push',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + config.LINE.channelAccessToken
            },
            method: 'POST',
            body: JSON.stringify(requestBody)
        },
        function (error, response, body) {
            if (error)
                callback(error, null);
            else if (response.body.error)
                callback(response.body.error, null);
            else
                callback(null, body);
        }
    );
};

var replyTemplateMessage = function (replyToken, userId,  callback) {
    var requestBody = {
        replyToken: replyToken,
        messages: [
            {
                "type": "template",
                "altText": "歡迎訊息",
                "template": {
                    "type": "buttons",
                    "thumbnailImageUrl": config.baseUrl +  + "images/Tommy&NianJ.jpg",
                    "title": "歡迎加入！",
                    "text": "加入會員，成為我們的一員吧 ~ ！",
                    "actions": [
                        {
                            "type": "uri",
                            "label": "註冊會員",
                            "uri": config.baseUrl + "bind#/?userId=" + userId
                        }
                    ]
                }
            }
        ]
    };
    
    request(
        {
            url: 'https://api.line.me/v2/bot/message/reply',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + config.LINE.channelAccessToken
            },
            method: 'POST',
            body: JSON.stringify(requestBody)
        },
        function (error, response, body) {
            if (error)
                callback(error, null);
            else if (response.body.error)
                callback(response.body.error, null);
            else
                callback(null, body);
        }
    );
};

module.exports = {
    sendTextMessage: sendTextMessage,
    sendImageMessage: sendImageMessage,
    replyTemplateMessage: replyTemplateMessage
};