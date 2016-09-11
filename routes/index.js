var express = require('express');
var router = express.Router();
var generateAudio = require('../bin/audiogen');
var placeCall = require('../bin/jwtgen');

router.post('/call', (req, res, next) => {
  var calling = req.body.to || process.env.TO;
  generateAudio(
    JSON.parse(req.body.freqArray), calling
  ).then(() => {
    console.log("resolved 1st")
    return placeCall(calling)
  })
   .then(() => res.json({success: true}))
   .catch((e) => next(e));
});

router.get('/answer', (req, res, next) => {
  console.log("Now calling " + req.query.to + " from Nexmo "
    + req.query.from + " on ID: " + req.query.conversation_uuid);
  res.json([{
    action: "stream",
    streamUrl: ["https://157d1b24.ngrok.io/test.wav"]
  }]);
});

router.get('/event', (req, res, next) => {
  console.log(req.body);
  res.status(200).end();
});

module.exports = router;