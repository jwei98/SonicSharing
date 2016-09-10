var handleFileSelect = function(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
        var reader = new FileReader();
        reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;
            var textarea = document.getElementById("base64textarea");
            textarea.value = "data:" + file.type + ";base64," + btoa(binaryString);
        };

        reader.readAsBinaryString(file);
    }

}
