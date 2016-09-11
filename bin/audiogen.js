var oscillator = require('audio-oscillator');
var slice = require('audio-slice');
var header = require('waveheader');

var streamBuffers = require('stream-buffers');
var streamBuffer = new streamBuffers.WritableStreamBuffer({
  initialSize: (100 * 1024),
  incrementAmount: (10 * 1024)
});

var hello = [[3300,.5],[1950,.5],[2300,.5],[1950,.5],[3050,.5],[1950,.5],[4200,.5],[1950,.5],[3350,.5],[1950,.5],[2300,.5],[1950,.5],[5e3,.5],[1950,.5],[2500,.5],[1950,.5],[1900,.5]];
streamBuffer.setMaxListeners(hello.length);
for(var i = 0; i < hello.length; i++) {
  (function(i) {
    setTimeout(() => {
      oscillator({
        frequency: hello[i][0] * 2,
        type: 'sine',
        normalize: true
      }).pipe(slice(0.15))
        .pipe(streamBuffer);
      if(i === hello.length - 1) {
        setTimeout(() => streamBuffer.end(), 1000);
      }
    }, 150 * i);
  })(i);
}

streamBuffer.on('finish', () => {
  var writer = new require('fs').createWriteStream('public/test.wav');
  writer.write(header(44100 * hello.length));
  console.log(streamBuffer.size());
  writer.write(streamBuffer.getContents());
  writer.end();
})

// setTimeout(() => {
//   var writer = new require('fs').createWriteStream('public/test.wav');
//   writer.write(header(44100 * hello.length));
//   console.log(streamBuffer.size());
//   writer.write(streamBuffer.getContents());
//   writer.end();
// }, 150 * hello.length + 5000)


