var context = new AudioContext();
var _ = require('lodash');

navigator.getUserMedia({
  audio: {
    mandatory: {
      googEchoCancellation: "false",
      googAutoGainControl: "false",
      googNoiseSuppression: "false",
      googHighpassFilter: "false"
    },
    optional: []
  }
}, init, e => console.error(e));

function init(stream) {
  // [1] Creates GainNode (controls volume?)
  // [2] Creates MediaStreamAudioSourceNode
  // [3] Creates an AnalyserNode for collecting frequency results 
  // [4] Connects our MediaStreamAudioSourceNode to our GainNode
  
  var gain = context.createGain(); // 1
  var baseline = context.createGain();
  var mediaStream = context.createMediaStreamSource(stream); // 2
  var streamAnalyzer = context.createAnalyser(); // 3
  var biquadFilter = context.createBiquadFilter();

  biquadFilter.frequency = 1900;
  biquadFilter.type = "highshelf";
  biquadFilter.gain.value = 10.0;

  baseline.gain.value = 0.0;
  streamAnalyzer.fftSize = 2048;

  mediaStream.connect(gain); // 4
  mediaStream.connect(biquadFilter);
  biquadFilter.connect(streamAnalyzer);
  gain.connect(baseline);
  baseline.connect(context.destination);
  main(streamAnalyzer);
}; 

function main(streamAnalyzer) {
  var data = new Uint8Array(streamAnalyzer.frequencyBinCount);  
  streamAnalyzer.getByteFrequencyData(data);

  var multiplier = 48000 / streamAnalyzer.fftSize;
  
  document.getElementById('freq').innerHTML = Math.round(data.indexOf(_.max(data)) * multiplier)
    + " lolHz 2";
  setTimeout(() => main(streamAnalyzer), 10);
}