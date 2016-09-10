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
	/*setTimeout(function() {
		document.getElementById('table').rows[j+1].cells[i].style.backgroundColor = "White";
	}, 145);*/
}
