var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var uuid = require('uuid');
var tone = require('tonegenerator');
var header = require('waveheader');

console.log(process.env.NEXMO_PRIVATE_KEY);
var hello = [ [ 3650, 0.5 ],
 [ 1950, 0.5 ],
 [ 3500, 0.5 ],
 [ 1950, 0.5 ],
 [ 3850, 0.5 ],
 [ 1950, 0.5 ],
 [ 3850, 0.5 ],
 [ 1950, 0.5 ],
 [ 4000, 0.5 ],
 [ 1950, 0.5 ] ];

var out = [];
for(var i = 0; i < hello.length; i++) {
  out = out.concat(tone(hello[i][0], hello[i][1] * 2, 1));
}

var writer = new require('fs').createWriteStream('public/test.wav');
writer.write(header(44100 * hello.length));
writer.write(new Buffer(out));
writer.end();

// jwt.sign({
//   'application_id': process.env.NEXMO_APP_ID,
//   'jti': uuid.v1(),
//   'iat': Date.now()
// }, process.env.NEXMO_PRIVATE_KEY, {algorithm: 'RS256'}, (err, token) => {
//   console.log(err, token);
//   var request = require("request");

//   var options = { method: 'POST',
//     url: 'https://api.nexmo.com/beta/calls',
//     headers: 
//      { 'content-type': 'application/json',
//        authorization: 'Bearer ' + token },
//     body: 
//      { to: [ { type: 'phone', number: '19496771775' } ],
//        from: { type: 'phone', number: '12132633129' },
//        answer_url: [ 'https://157d1b24.ngrok.io/answer' ] },
//     json: true };

//   request(options, function (error, response, body) {
//     if (error) throw new Error(error);

//     console.log(body);
//   });

//   jwt.verify(token, process.env.NEXMO_PUBLIC_KEY, (err, decoded) => {
//     console.log(decoded);
//   })
// });