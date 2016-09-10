var frequencyIndex = 0;
var intervalVar;

var play = function playFrequency() {
    var testBase64String = document.getElementsByName('noteField')[0].value;

    // create an array of the needed frequencies to play
    var frequencyArray = [];
    for (var i = 0; i < testBase64String.length; i++) {
        var index = b64.indexOf(testBase64String[i]);
        var freq = (index * 50) + 2000;
        frequencyArray.push([freq, 0.200]);
        frequencyArray.push([1950, 0.200]); // separator tone
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
	var b64indices = [];

  for (var i = startIndex; i < fullBase64String.length; i++) {
      var index = b64.indexOf(fullBase64String[i]);
			b64indices.push(index);
      var freq = (index * 50) + 2000;
      frequencyArray.push(freq);
  }

  console.log(frequencyArray);

  // Play a sound every 150 milliseconds
  frequencyIndex = 0;
  intervalVar = setInterval(() => {
      this.playOneSound(b64indices[frequencyIndex],frequencyArray)
  }, 150);

}

var playOne = function playOneSound(index,freq) {
    if (frequencyIndex >= freq.length) {
        clearInterval(intervalVar)
        oscillator.stop();
        return;
    }

    oscillator = context.createOscillator();
    oscillator.connect(context.destination);
    oscillator.frequency.value = freq[frequencyIndex];
    oscillator.start();
		lightUp(index);
    setTimeout(function() {
         oscillator.stop()
         frequencyIndex++;
     }, 145);
}

listColors = ['Red','Red', 'rgb(255, 90, 50)', 'rgb(255, 100, 50)', 'Orange', 'DarkOrange','rgb(140, 125, 51)','rgb(255, 153, 51)',
							'Gold', 'Yellow','rgb(240, 255, 51)','rgb(204, 255, 51)', 'GreenYellow','LimeGreen', '	rgb(135, 255, 51)','	rgb(120, 255, 51)',
							'LawnGreen','rgb(110, 255, 51)','rgb(125,255,1)','rgb(102, 255, 51)	','rgb(51, 255, 51)','Green','Green','rgb(51, 255, 51)',
							'	rgb(51, 255, 102)','SeaGreen','SpringGreen','Aquamarine','Aquamarine','rgb(51, 255, 153)','rgb(51, 255, 225)','Cyan',
							'DarkTurquoise','Aqua','rgb(51, 204, 255)','rgb(51, 204, 255)','CornflowerBlue','rgb(51, 153, 255)','rgb(51, 125, 255)','	rgb(51, 102, 255)',
							'Blue','Blue','rgb(51, 51, 255)	','Indigo','rgb(70, 51, 255)	','BlueViolet','Violet','DarkOrchid',
							'Purple','rgb(204, 51, 255)	','rgb(247,1,255)', 'HotPink','Magenta', 'Magenta','Orchid','DeepPink',
							'Fuchsia','rgb(255,1,153)','rgb(255, 51, 125)','rgb(255, 51, 102)','rgb(255, 51, 80)','Crimson','Crimson','red']

function lightUp(index) {
	console.log(index);
	var j = Math.floor(index/8);
	var i = index % 8;
	console.log(listColors[index])
	document.getElementById('table').rows[j+1].cells[i].style.backgroundColor = listColors[index];
	setTimeout(function() {
		document.getElementById('table').rows[j+1].cells[i].style.backgroundColor = "White";
	}, 145);
}

module.exports = {
  playFrequency: play,
  stopFrequency: stop,
  sendFullFrequency: sendFull,
  playOneSound: playOne
}
