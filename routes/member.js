var express = require('express');
var router = express.Router();
var Member = require('../schemas/memberSchema');

router.post('/', (req, res) => {
    var member = new Member({
        userId: req.session.userProfiles.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        lineId: req.body.lineId
    });

    Member.findOne({ userId: member.userId }).exec().then((doc) => {
        if (!doc)
            member.save().then((doc) => {
                console.log(doc);
                res.json({ status: 1, data: doc });
            })
        else
            res.json({ status: 0, data: 'Member is already exist !' });
    });
});

router.get('/checkDuplicateMember', (req, res) => {
    Member.findOne({ userId: req.session.userProfiles.userId }).exec().then((doc) => {
        if(doc)
            res.json({status: 1, data: doc});
        else
            res.json({ status: 0, data: 'This user hasn\'t binded yet.'});
    });
});

router.get('/', (req, res) => {
    Member.find().exec().then((doc) => {
        res.json(doc);
    }, function (err) {
        res.json({ status: 0, data: err});
    });
});

module.exports = router;