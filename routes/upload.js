var express = require('express');
var router = express.Router();
var multer = require('multer');
var multerOptions = require('../modules/upload');
var storage = multer.diskStorage(multerOptions)
var upload = multer({ storage: storage });

router.post('/', upload.single('image'), function (req, res, next) {
  console.log(req.file);
  res.send("Ok");
});

module.exports = router;