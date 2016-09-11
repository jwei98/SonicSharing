var listening = true;
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

  biquadFilter.frequency = 1800;
  biquadFilter.type = "highshelf";
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

  var multiplier = context.sampleRate / streamAnalyzer.fftSize;

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
    }, 1000);
  }

  ready = lolhz_normalized === 2800;
  if(listening) {
    setTimeout(() => this.main(streamAnalyzer), 0);
  } else {
    setTimeout(() => this.main(streamAnalyzer), 0);
  }

};

var currChar = '';
var currString = '';
var separator = false;
var updateTransmission = function updateTransmission(hz, normalized) {
  $('#status').html("Now listening for signal...");
  $('#freq').html("Current Frequency: " + hz + " Hz");
  // End of Divider - 1850 lolHz
  if (normalized === 1850) {
    currChar = " ";
  }

  // End of Transmission - 1900 lolHz
  if (normalized === 1900) {
    this.download(currString);
  }

  // End of Character - 1950 lolHz
  if (normalized === 1950) {
    separator = true;
  } else if (separator && currChar) {
    currString += currChar;
    $('#transmission').append(currChar);
    separator = false;
  }
  else {
    currChar = b64[(normalized - 2000) / 50];
    // console.log(currChar);
    // if (currChar) {
      // currString += currChar;
      // console.log(currString);
    // }
  }
}

var download = function(out) {
  console.warn("Calling download()!");
  // thank u SO <3
  // http://stackoverflow.com/questions/3665115/
  // create-a-file-in-memory-for-user-to-download-
  // not-through-server
  var parsed = out.split(' ');
  try {
    var fileName = atob(parsed[0]);
  } catch(e) {
    console.warn(e);
    var fileName = 'download';
  }
  try {
    var mimeType = atob(parsed[1]);
  } catch(e) {
    console.warn(e);
    var mimeType = 'text/plain'
  }

  var rawOutput = parsed[2];

  var el = document.createElement('a');
  el.setAttribute('href', 'data:' + mimeType
    + ';base64,' + rawOutput);
  el.setAttribute('download', fileName)
  el.style.display = 'none';

  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}

module.exports = {
  init,
  main,
  updateTransmission,
  download
}
