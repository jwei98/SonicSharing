var oscillator = require('audio-oscillator');
var slice = require('audio-slice');
var streamBuffers = require('stream-buffers');
var streamBuffer = new streamBuffers.WritableStreamBuffer({
  initialSize: (100 * 1024),
  incrementAmount: (10 * 1024)
});

var hello = [[3300,.5],[1950,.5],[2300,.5],[1950,.5],[3050,.5],[1950,.5],[4200,.5],[1950,.5],[3350,.5],[1950,.5],[2300,.5],[1950,.5],[5e3,.5],[1950,.5],[2500,.5],[1950,.5],[1900,.5]];

var out = [];
for(var i = 0; i < hello.length; i++) {
  // console.log(oscillator({
  //   frequency: hello[i][0],
  //   type: 'sine',
  //   normalize: true
  // }))
  oscillator({
    frequency: hello[i][0],
    type: 'sine',
    normalize: true
  }).on('data', audioBuffer => {
    console.log(audioBuffer.getChannelData(0))
  })
}

var header = require('waveheader');

var writer = new require('fs').createWriteStream('public/test.wav');
writer.write(header(48000 * hello.length));
console.log(streamBuffer.size());
streamBuffer.end();
console.log(streamBuffer.getContents())
writer.write(streamBuffer.getContents());
writer.end();