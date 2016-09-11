var oscillator = require('audio-oscillator');
var slice = require('audio-slice');
var header = require('waveheader');

var streamBuffers = require('stream-buffers');
var streamBuffer = new streamBuffers.WritableStreamBuffer({
  initialSize: (100 * 1024),
  incrementAmount: (10 * 1024)
});

// var hello = [[3300,.5],[1950,.5],[2300,.5],[1950,.5],[3050,.5],[1950,.5],[4200,.5],[1950,.5],[3350,.5],[1950,.5],[2300,.5],[1950,.5],[5e3,.5],[1950,.5],[2500,.5],[1950,.5],[1900,.5]];
module.exports = function(freqArray, toNumber) {
  return new Promise(function(resolve, reject) {
    streamBuffer.setMaxListeners(freqArray.length);
    for(var i = 0; i < freqArray.length; i++) {
      (function(i) {
        setTimeout(() => {
          oscillator({
            frequency: freqArray[i][0] * 2,
            type: 'sine',
            normalize: true
          }).pipe(slice(0.15))
            .pipe(streamBuffer);
          if(i === freqArray.length - 1) {
            setTimeout(() => streamBuffer.end(), 1000);
          }
        }, 150 * i);
      })(i);
    }

    streamBuffer.on('finish', () => {
      var writer = new require('fs').createWriteStream('public/' + toNumber + '.wav');
      writer.write(header(44100 * freqArray.length));
      writer.write(streamBuffer.getContents());
      writer.end();
      resolve('public/' + toNumber + '.wav');
    });
  });
}