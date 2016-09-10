var listening = false;
var ready = false;

var init = function init(stream) {
  // [1] Creates GainNode (controls volume?)
  // [2] Creates MediaStreamAudioSourceNode
  // [3] Creates an AnalyserNode for collecting frequency results
  // [4] Connects our MediaStreamAudioSourceNode to our GainNode

  var gain = context.createGain(); // 1
  var baseline = context.createGain();
  var mediaStream = context.createMediaStreamSource(stream); // 2
  var streamAnalyzer = context.createAnalyser(); // 3
  var biquadFilter = context.createBiquadFilter();

  biquadFilter.frequency = 1950;
  biquadFilter.type = "highpass";
  biquadFilter.gain.value = 10.0;

  baseline.gain.value = 0.0;
  streamAnalyzer.fftSize = 2048;

  mediaStream.connect(gain); // 4
  mediaStream.connect(biquadFilter);
  biquadFilter.connect(streamAnalyzer);
  gain.connect(baseline);
  baseline.connect(context.destination);

  $('#status').html("Ready");

  this.main(streamAnalyzer, listening);
};

var main = function main(streamAnalyzer) {
  var data = new Uint8Array(streamAnalyzer.frequencyBinCount);
  streamAnalyzer.getByteFrequencyData(data);

  var multiplier = 48000 / streamAnalyzer.fftSize;

  // lolHz - basically Hertz, but wrong!
  var lolhz = Math.round(data.indexOf(_.max(data)) * multiplier);
  var lolhz_normalized = 50 * Math.floor(lolhz / 50 + 0.5);

  if (listening) {
    this.updateTransmission(lolhz, lolhz_normalized);
    // console.log(lolhz_normalized);
  } else if (lolhz_normalized === 2800 && !ready) {
    $('#status').html("Signal received");
    setTimeout(() => {
      listening = ready;
      if(!listening) $('#status').html("Ready");
    }, 3000);
  }

  ready = lolhz_normalized === 2800;
  if(listening) {
    setTimeout(() => this.main(streamAnalyzer), 0);
  } else {
    setTimeout(() => this.main(streamAnalyzer), 0);
  }

};

var updateTransmission = function updateTransmission(hz, normalized) {
  $('#status').html("Now listening");
  $('#freq').html("Current: " + hz);
  $('#transmission').append(b64[(normalized - 2000) / 50]);
}

module.exports = {
  init,
  main,
  updateTransmission
}