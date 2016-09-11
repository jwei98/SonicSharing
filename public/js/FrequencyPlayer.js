const toneTime = 0.1;
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
=======
    var b64MimeType = btoa(mimeType);
    var b64FileName = btoa(fileName);
    var testBase64String = b64MimeType + b64FileName + document.getElementById('base64textarea').value;

    // create an array of the needed frequencies to play
    var frequencyArray = _.fill(Array(10), [2800, 0.1]);
    var lightIndices = [];

    for (var i = 0; i < testBase64String.length; i++) {
        var index = b64.indexOf(testBase64String[i]);
        var freq = (index * 50) + 2000;
        frequencyArray.push([freq, toneTime]);
        frequencyArray.push([1950, toneTime]); // separator tone

        if (i == b64MimeType.length - 1 || i == b64FileName.length + b64MimeType.length - 1) {
            frequencyArray.push([1850, toneTime]);
            frequencyArray.push([1950, toneTime]);
        }

        index != -1 ? lightIndices.push(index) : lightIndices.push(0);
    }

	// Light square every 150 milliseconds
	count = 0;
	intervalVar = setInterval(() => {
        this.lightUp(lightIndices)
	}, 1000);
    frequencyArray.push([1900, toneTime]);
>>>>>>> d339bfffed702006dc995df52d280d957412541f

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
<<<<<<< HEAD
	}
=======

    console.log(frequencyArray);

}

var setMime = function setMimeType(mimeParam) {
    mimeType = mimeParam || 'text/plain';
    console.log(btoa(mimeType));
    console.log(mimeType);
>>>>>>> d339bfffed702006dc995df52d280d957412541f
}

var setName = function setFileName(nameParam) {
    fileName = nameParam || 'download';
    console.log(btoa(fileName));
    console.log(fileName);
}

<<<<<<< HEAD
listColors = []
for (var i = 0; i < 16; i++) {
	var r = 16*i
	for (var j = 0; j < 4; j++) {
		listColors.push("rgba("+r+",0,255,0.3)");
	}
}
=======
listColors = ['Red','Red', 'rgb(255, 90, 50)', 'rgb(255, 100, 50)', 'Orange', 'DarkOrange','rgb(140, 125, 51)','rgb(255, 153, 51)',
							'Gold', 'Yellow','rgb(240, 255, 51)','rgb(204, 255, 51)', 'GreenYellow','LimeGreen', '	rgb(135, 255, 51)','	rgb(120, 255, 51)',
							'LawnGreen','rgb(110, 255, 51)','rgb(125,255,1)','rgb(102, 255, 51)	','rgb(51, 255, 51)','Green','Green','rgb(51, 255, 51)',
							'	rgb(51, 255, 102)','SeaGreen','SpringGreen','Aquamarine','Aquamarine','rgb(51, 255, 153)','rgb(51, 255, 225)','Cyan',
							'DarkTurquoise','Aqua','rgb(51, 204, 255)','rgb(51, 204, 255)','CornflowerBlue','rgb(51, 153, 255)','rgb(51, 125, 255)','	rgb(51, 102, 255)',
							'Blue','Blue','rgb(51, 51, 255)	','Indigo','rgb(70, 51, 255)	','BlueViolet','Violet','DarkOrchid',
							'Purple','rgb(204, 51, 255)	','rgb(247,1,255)', 'HotPink','Magenta', 'Magenta','Orchid','DeepPink',
							'Fuchsia','rgb(255,1,153)','rgb(255, 51, 125)','rgb(255, 51, 102)','rgb(255, 51, 80)','Crimson','Crimson','red']
>>>>>>> d339bfffed702006dc995df52d280d957412541f

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
<<<<<<< HEAD
   document.getElementById('table').rows[0].cells[index].style.backgroundColor = listColors[index];
=======
   var j = Math.floor(index/8);
   var i = index % 8;

   document.getElementById('table').rows[j+1].cells[i].style.backgroundColor = listColors[index];
>>>>>>> d339bfffed702006dc995df52d280d957412541f

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
<<<<<<< HEAD
	lightUp: light,
	verifySubmission: submit
=======
  lightUp: light,
  setMimeType: setMime,
  setFileName: setName
>>>>>>> d339bfffed702006dc995df52d280d957412541f
}
