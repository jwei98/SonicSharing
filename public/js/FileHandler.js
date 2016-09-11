module.exports = function(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();
        reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;
            var textarea = document.getElementById("base64textarea");
            var mimeType = file.type;
            var fileName = file.name;
            
            textarea.value = btoa(binaryString);
            FrequencyPlayer.setMimeType(mimeType);
            FrequencyPlayer.setFileName(fileName);
        };

        reader.readAsBinaryString(file);
    }

}
