const toneTime = 0.1;
var intervalVar;
var play = function playFrequency() {

    var testBase64String = document.getElementById('base64textarea').value;

		if (testBase64String.length > 0) {

				var text = document.getElementById("completed")

		    var b64MimeType = btoa(mimeType);
		    var b64FileName = btoa(fileName);
		    var testBase64String = b64MimeType + b64FileName + document.getElementById('base64textarea').value;

		    // create an array of the needed frequencies to play
		    var frequencyArray = _.fill(Array(15), [2800, 0.1]);
		    var lightIndices = [0,0,0,0,0];

				console.log(testBase64String.length);

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

				for (var i = 0; i < lightIndices.length; i++) {
					if (lightIndices[i] == 64) {
						lightIndices[i] = 0;
					}
				}

				console.log(lightIndices);


				// Light square every 200 milliseconds
				count = 0;
				intervalVar = setInterval(() => {
			        this.lightUp(lightIndices)
				}, 200);
			    frequencyArray.push([1900, toneTime]);

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

var setMime = function setMimeType(mimeParam) {
    mimeType = mimeParam || 'text/plain';
    console.log(btoa(mimeType));
    console.log(mimeType);
}

var setName = function setFileName(nameParam) {
    fileName = nameParam || 'download';
    console.log(btoa(fileName));
    console.log(fileName);
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
		 	// console.log("we're out")
       clearInterval(intervalVar)
			 // light em all up
			 for (var i = 0; i < 64; i++) {
					  document.getElementById('table').rows[0].cells[i].style.backgroundColor = listColors[i];
   			}
				document.getElementById("completed").innerHTML = "Conversion completed.";
				return;
 		}
		else {
		 // console.log("lighting up square");
	   var index = indices[count];
		 // console.log(count,index);
		 document.getElementById('table').rows[0].cells[index].style.backgroundColor = listColors[index];

	   setTimeout(function() {
	        document.getElementById('table').rows[0].cells[index].style.backgroundColor = "White";
	    }, 200);
			count++;
		}
}

var submit = function verifySubmission() {
	if (document.getElementById("base64textarea").length > 0) {
		playFrequency();
	}
}


module.exports = {
  playFrequency: play,
	lightUp: light,
	verifySubmission: submit,
  setMimeType: setMime,
  setFileName: setName
}
