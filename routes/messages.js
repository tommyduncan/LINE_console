const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const line = require('../modules/messageModule');
const line = require('../services/lineMessageService');
const imageUtil = require('../utils/imageUtil');
const LineEventLogModel = require('../schemas/lineEventLogModel');
const MessageLogModel = require('../schemas/messageLogModel');

var request = require('request');
var config = require('../configs/general.config');

router.post('/', (req, res, next) => {
  var events = req.body.events;

  var lineEventLogModel = new LineEventLogModel({
    evenType: events[0].type,
    sourceType: events[0].source.type,
    userId: events[0].source.userId,
    timestamp: events[0].timestamp
  });

  switch (events[0].type) {
    case 'follow':
      lineEventLogModel.eventReferenceId = null;

      lineEventLogModel.save((error, data) => {
        if (error) {
          console.log(handleError(error));

          res.json({ status: 0, data: error });
        }
        //res.json({ status: 1, data: data });
      });

      line.replyTemplateMessage(events[0].replyToken, events[0].source.userId, function (error, data) {
        if (error)
          res.json({ status: 0, data: data });
        else
          res.json({ status: 1, data: data });
      });
      break;

    case 'unfollow':
      lineEventLogModel.eventReferenceId = null;

      lineEventLogModel.save((error, data) => {
        if (error) {
          console.log(handleError(error));

          res.json({ status: 0, data: error });
        }
        res.json({ status: 1, data: data });
      });
      break;

    case 'postback':
      console.log(">> Postback event: ");
      console.log(events[0].postback);

      if (events[0].postback.data === 'answer' && events[0].postback.params.date === '2016-12-07')
        line.sendTextMessage("恭喜妳答對了！！\n請點選下列網址進行下一步：\n" + config.baseUrl + "/anniversary", function (error, data) {
          if (error)
            res.json({ status: 0, data: data });
          else
            res.json({ status: 1, data: data });
        });
      else if (events[0].postback.data === 'answer' && events[0].postback.params.date !== '2016-12-07')
        line.sendTextMessage("No No，答錯了唷 ~~~", function (error, data) {
          if (error)
            res.json({ status: 0, data: data });
          else
            res.json({ status: 1, data: data });
        });

      //res.send('postback event.');
      break;

    case 'message':
      console.log(events[0]);

      var messageLogModel = new MessageLogModel({
        _id: new mongoose.Types.ObjectId(),
        messageId: events[0].message.id,
        messageType: events[0].message.type,
        messageContent: (typeof events[0].message.text === 'undefined') ? null : events[0].message.text
      });

      console.log(messageLogModel);

      messageLogModel.save(error => {
        if (error) { console.log(error); res.json({ status: 0, data: error }); }

        lineEventLogModel.eventReferenceId = messageLogModel._id;

        lineEventLogModel.save((error, data) => {
          if (error) { res.json({ status: 0, data: error }); }

          res.json({ status: 1, data: data });
        });
      });
      break;
  }
});

router.post('/push', function (req, res, next) {
  line.pushMessages(req.body.targetUser, req.body.messageObjects, (error, result) => {
    if (error)
      res.json({ status: 0, data: error });
    else
      res.json({ status: 1, data: 'Push message success!' });
  });
});

router.post('/multicast', function (req, res, next) {
  line.multicastMessages(req.body.target, req.body.messages, (error, result) => {
    if (error)
      res.json({ status: 0, data: error });
    else
      res.json({ status: 1, data: 'Push message success!' });
  });
});


/* router.post('/sendTextMessage', function (req, res, next) {
  line.sendTextMessage(req.body.text, function (error, data) {
    if (error)
      res.json({ status: 0, data: data });
    else
      res.json({ status: 1, data: data });
  });
}); */

router.post('/sendImageMessage', function (req, res, next) {
  imageUtil.resizeImage(req.body.imageName);

  line.sendImageMessage(req.body.imageName, function (error, data) {
    if (error)
      res.json({ status: 0, data: data });
    else
      res.json({ status: 1, data: data });
  });
});

router.get('/sendAnniversaryMessage', function (req, res, next) {
  var targetUserId = 'Ub5538a8f30409f45c7e7ba551dca9385';
  var messages = [
    {
      "type": "template",
      "altText": "❤ Happy 1st Anniversary ❤",
      "template": {
        "type": "buttons",
        "thumbnailImageUrl": config.baseUrl + "/images/Tommy&NianJ.jpg",
        "title": "Question",
        "text": "Tommy 跟 NianJ 是什麼時候在一起的呢？",
        "actions": [
          {
            "type": "datetimepicker",
            "label": "請選擇日期",
            "data": "answer",
            "mode": "date",
            "initial": "2017-01-01"
          }
        ]
      }
    }
  ];

  line.pushMessages(targetUserId, messages, (error, result) => {
    if (error)
      res.json({ status: 0, data: error });
    else
      res.json({ status: 1, data: 'Push message success!' });
  });
});

module.exports = router;
