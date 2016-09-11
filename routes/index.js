var express = require('express');
var router = express.Router();

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