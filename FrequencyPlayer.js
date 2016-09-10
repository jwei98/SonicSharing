context = new AudioContext();

var base64String = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function playFrequency() {
    var testBase64String = document.getElementsByName('noteField')[0].value;

    // create an array of the needed frequencies to play
    var frequencyArray = [];
    for (var i = 0; i < testBase64String.length; i++) {
        var index = base64String.indexOf(testBase64String[i]);
        var freq = (index * 250) + 4000;
        frequencyArray.push(freq);
    }

    oscillator = context.createOscillator();
    oscillator.frequency.value = frequencyArray[0];

    oscillator.connect(context.destination);

    oscillator.start(0);
}

function stopFrequency() {
    oscillator.stop(0);
}

function sendFullFrequency() {
  var fullBase64String = document.getElementById('base64textarea').value;
  var startIndex = fullBase64String.indexOf(",") + 1;
  var frequencyArray = [];
  for (var i = startIndex; i < fullBase64String.length; i++) {
      var index = base64String.indexOf(fullBase64String[i]);
      var freq = (index * 250) + 4000;
      frequencyArray.push(freq);
  }

  console.log(frequencyArray);

  for (var j = 0; j < frequencyArray.length; j++) {
      setTimeout(function(){playSingleFrequency(frequencyArray[j]);},2000);
      setTimeout(function(){oscillator.stop();},4000);
  }

function playSingleFrequency(freq) {
  oscillator = context.createOscillator();
  oscillator.connect(context.destination);
  oscillator.frequency.value = freq;
  console.log("start");
  oscillator.start();
}
