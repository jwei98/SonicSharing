var frequencyIndex = 0;
var intervalVar;

var play = function playFrequency() {
    var testBase64String = document.getElementsByName('noteField')[0].value;

    // create an array of the needed frequencies to play
    var frequencyArray = [];
    for (var i = 0; i < testBase64String.length; i++) {
        var index = b64.indexOf(testBase64String[i]);
        var freq = (index * 50) + 2000;
        frequencyArray.push([freq, 0.350]);
        frequencyArray.push([1950, 0.350]); // separator tone
    }

    console.log(frequencyArray);

    var previousTime = 0;
    for (var i = 0; i < frequencyArray.length; i++) {
      var oscillator = context.createOscillator();
      var tone = frequencyArray[i][0];
      var duration = frequencyArray[i][1];
      oscillator.frequency.value = tone;
      oscillator.connect(context.destination);
      oscillator.start(context.currentTime + i * duration);
      setTimeout(() => $('#sound').append('+'), i * duration * 1000);
      // previousTime = ;
      oscillator.stop(context.currentTime + i * duration + duration);

    }
}

var stop = function stopFrequency() {
    oscillator.stop(0);
}

var sendFull = function sendFullFrequency() {
  var fullBase64String = document.getElementById('base64textarea').value;
  var startIndex = fullBase64String.indexOf(",") + 1;
  var frequencyArray = [];

  for (var i = startIndex; i < fullBase64String.length; i++) {
      var index = b64.indexOf(fullBase64String[i]);
      var freq = (index * 50) + 2000;
      frequencyArray.push(freq);
  }

  console.log(frequencyArray);

  // Play a sound every 150 milliseconds
  frequencyIndex = 0;
  intervalVar = setInterval(() => {
      this.playOneSound(frequencyArray)
  }, 150);

}

var playOne = function playOneSound(freq) {
    if (frequencyIndex >= freq.length) {
        clearInterval(intervalVar)
        oscillator.stop();
        return;
    }

    oscillator = context.createOscillator();
    oscillator.connect(context.destination);
    oscillator.frequency.value = freq[frequencyIndex];
    oscillator.start();

    setTimeout(function() {
         oscillator.stop()
         frequencyIndex++;
     }, 145);
}

module.exports = {
  playFrequency: play,
  stopFrequency: stop,
  sendFullFrequency: sendFull,
  playOneSound: playOne
}