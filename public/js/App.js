window._ = require('lodash');
window.context = new AudioContext();
window.b64 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=`;
window.$ = require('jquery');

var handleFileSelect = require('./FileHandler');
var Receiver = require('./Receiver');
var DrivePicker = require('./DrivePicker');
window.FrequencyPlayer = require('./FrequencyPlayer');

$(function() {
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
  }, Receiver.init.bind(Receiver), e => console.error(e));

  if (window.File && window.FileReader && window.FileList && window.Blob) {
      document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
  } else {
      alert('The File APIs are not fully supported in this browser.');
  }
});
