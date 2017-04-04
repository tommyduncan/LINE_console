const express = require('express');
const line = require('../modules/messageModule');
const router = express.Router();
const image = require('../modules/imageModule');

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