const express = require('express');
const line = require('../modules/messageModule');
const router = express.Router();
const image = require('../modules/imageModule');

router.post('/', (req, res, next) => {
  var events = req.body.events;

  if (events[0].type === 'follow') {
    /*console.log('userId: ' + events[0].source.userId);
    console.log('replyToken: ' + events[0].replyToken);*/

    line.replyTemplateMessage(events[0].replyToken, events[0].source.userId, function (error, data) {
      if (error)
        res.json({ status: 0, data: data });
      else
        res.json({ status: 1, data: data });
    });
  } else if (events[0].type === 'postback') {
    console.log(events[0].postback);
    res.send('postback event.');
  } else {
    res.send('message event.');
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
  image.resizeImage(req.body.imageName);

  line.sendImageMessage(req.body.imageName, function (error, data) {
    if (error)
      res.json({ status: 0, data: data });
    else
      res.json({ status: 1, data: data });
  });
});

module.exports = router;