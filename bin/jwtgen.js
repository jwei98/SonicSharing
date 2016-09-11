var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var uuid = require('uuid');
var tone = require('tonegenerator');
var header = require('waveheader');

module.exports = function(toPhone) {
  return new Promise(function(resolve, reject) {
    console.log("entered second promise");
    jwt.sign({
      'application_id': process.env.NEXMO_APP_ID,
      'jti': uuid.v1(),
      'iat': Date.now()
    }, process.env.NEXMO_PRIVATE_KEY, {algorithm: 'RS256'}, (err, token) => {
      if (err) return reject(err);
      console.log('signing JWT, received', token);
      var request = require("request");

      var options = { method: 'POST',
        url: 'https://api.nexmo.com/beta/calls',
        headers: 
         { 'content-type': 'application/json',
           authorization: 'Bearer ' + token },
        body: 
         { to: [ { type: 'phone', number: toPhone } ],
           from: { type: 'phone', number: '12132633129' },
           answer_url: [ 'https://157d1b24.ngrok.io/answer' ] },
        json: true };

      request(options, function (error, response, body) {
        if (error) return reject(error);
        resolve(body);
      });
    });
  });
}