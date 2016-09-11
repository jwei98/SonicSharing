
var play = function playFrequency() {

    var testBase64String = document.getElementById('base64textarea').value;

		if (testBase64String.length > 0) {

				var text = document.getElementById("completed")

		    // create an array of the needed frequencies to play
		    var frequencyArray = [];
				var lightIndices = [];
		    for (var i = 0; i < testBase64String.length; i++) {
		        var index = b64.indexOf(testBase64String[i]);
						lightIndices.push(index);
		        var freq = (index * 50) + 2000;
		        frequencyArray.push([freq, 0.2]);
		        frequencyArray.push([1950, 0.2]); // separator tone
		    }

				for (var i = 0; i < 64; i++) {
					document.getElementById('table').rows[0].cells[i].style.backgroundColor = "white";
				}

				for (var i = 0; i < lightIndices.length; i++) {
					if (lightIndices[i] == -1) {
							lightIndices[i] = 0;
					}
		}

		 count = 0;
		 intervalVar = setInterval(() => {
		     this.lightUp(lightIndices)
		 }, 1000);
    frequencyArray.push([1900, 0.2]);

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
}


listColors = []
for (var i = 0; i < 16; i++) {
	var r = 16*i
	for (var j = 0; j < 4; j++) {
		listColors.push("rgba("+r+",0,255,0.3)");
	}
}

var light = function lightUp(indices) {
   if (count >= indices.length) {
       clearInterval(intervalVar)
			 // light em all up
			 for (var i = 0; i < 64; i++) {
			   document.getElementById('table').rows[0].cells[i].style.backgroundColor = listColors[i];
			 }
			 document.getElementById("completed").innerHTML = "Conversion completed.";
       return;
   }
   var index = indices[count];
   document.getElementById('table').rows[0].cells[index].style.backgroundColor = listColors[index];

   setTimeout(function() {
        document.getElementById('table').rows[0].cells[index].style.backgroundColor = "White";
        count++;
    }, 200);
}

var submit = function verifySubmission() {
	if (document.getElementById("base64textarea").length > 0) {
		playFrequency();
	}
}


module.exports = {
  playFrequency: play,
	lightUp: light,
	verifySubmission: submit
}
