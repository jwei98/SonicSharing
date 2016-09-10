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
      var freq = (index * 50) + 2000;
      frequencyArray.push(freq);
  }

  console.log(frequencyArray);

  for (var j = 0; j < frequencyArray.length; j++) {
    oscillator = context.createOscillator();
    oscillator.connect(context.destination);
    oscillator.frequency.value = frequencyArray[j];
    oscillator.start();
    // delay for two seconds
    waitForDuration(100);
    oscillator.stop()
    waitForDuration(25);
  }
}

function waitForDuration(milliseconds) {
  var start = new Date().getTime();
  while (true) {
    var end = new Date().getTime();
    var time = end - start;
    if (time >= milliseconds) {
      break;
    }
  }
}
