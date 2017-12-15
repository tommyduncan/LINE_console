var express = require('express');
var router = express.Router();
var multer = require('multer');
var multerOptions = require('../configs/file.config');
var image = require('../utils/imageUtil');
var storage = multer.diskStorage(multerOptions)
var upload = multer({ storage: storage });

router.post('/', function (req, res, next) {
  upload.single('image')(req, res, function (err) {
    if (err) {
      res.json({status: 0, error: err});
    } else {
      image.resize(req.file.filename);

      res.send({status: 1, result: req.file.filename});
    }
  })
});

module.exports = router;