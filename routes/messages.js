const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const line = require('../modules/messageModule');
const imageUtil = require('../utils/imageUtil');
const LineEventLogModel = require('../schemas/lineEventLogModel');
const MessageLogModel = require('../schemas/messageLogModel');

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
        if (error) console.log(handleError(error));
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
      });
      break;
    case 'postback':
      console.log(events[0].postback);
      res.send('postback event.');
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

router.post('/sendTextMessage', function (req, res, next) {
  line.sendTextMessage(req.body.text, function (error, data) {
    if (error)
      res.json({ status: 0, data: data });
    else
      res.json({ status: 1, data: data });
  });
});

router.post('/sendImageMessage', function (req, res, next) {
  imageUtil.resizeImage(req.body.imageName);

  line.sendImageMessage(req.body.imageName, function (error, data) {
    if (error)
      res.json({ status: 0, data: data });
    else
      res.json({ status: 1, data: data });
  });
});

module.exports = router;
