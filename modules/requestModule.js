var request = require('request');

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
                'Authorization': 'Bearer 9MrCORI6bmHSjyGM3Zz4SIo+E6c6CPmBMkC2Q/GLH36TB1Em0ARtW2O28ZMymKoqb9GPkdMUV+Ksq5znRj4cpa82p78R0LI7isqJngIo+hy+O4JidF+JxSsZGdm6ZDq3/SIigB/ZlTFqQdMRl09vwgdB04t89/1O/w1cDnyilFU='
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
                originalContentUrl: 'https://tommyduncan.csie.io/images/uploads/' + imageName,
                previewImageUrl: 'https://tommyduncan.csie.io/images/uploads/preview/' + imageName
            }
        ]
    };

    request(
        {
            url: 'https://api.line.me/v2/bot/message/push',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer 9MrCORI6bmHSjyGM3Zz4SIo+E6c6CPmBMkC2Q/GLH36TB1Em0ARtW2O28ZMymKoqb9GPkdMUV+Ksq5znRj4cpa82p78R0LI7isqJngIo+hy+O4JidF+JxSsZGdm6ZDq3/SIigB/ZlTFqQdMRl09vwgdB04t89/1O/w1cDnyilFU='
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
                    "thumbnailImageUrl": "https://tommyduncan.csie.io/images/Tommy&NianJ.jpg",
                    "title": "歡迎加入！",
                    "text": "加入會員，成為我們的一員吧 ~ ！",
                    "actions": [
                        {
                            "type": "uri",
                            "label": "註冊會員",
                            "uri": "https://tommyduncan.csie.io/bind#/index?userId=" + userId
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
                'Authorization': 'Bearer 9MrCORI6bmHSjyGM3Zz4SIo+E6c6CPmBMkC2Q/GLH36TB1Em0ARtW2O28ZMymKoqb9GPkdMUV+Ksq5znRj4cpa82p78R0LI7isqJngIo+hy+O4JidF+JxSsZGdm6ZDq3/SIigB/ZlTFqQdMRl09vwgdB04t89/1O/w1cDnyilFU='
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