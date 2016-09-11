const key = 'AIzaSyBm7LwFosS94YvCEqNTq7arzxqA7EfXs2Y';
const client_id = '656109107827-ve602999d265jp3lc47retspo1551f8p.apps.googleusercontent.com';
const scope = ['https://www.googleapis.com/auth/drive'];

var oauth_token;
var pickerApiLoaded = false;

window.onApiLoad = function() {
  console.log('api loaded');
  gapi.load('auth', {callback: authLoad});
  gapi.load('picker', {callback: pickerLoad});
}

function authLoad() {
  gapi.auth.authorize({
    'client_id': client_id,
    'scope': scope,
    'immediate': false
  }, handleAuthResult);
}

function pickerLoad() {
  pickerApiLoaded = true;
  createPicker();
}

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    oauth_token = authResult.access_token;
    console.log(oauth_token);
    // createPicker();
  }
}

window.createPicker = function() {
  console.log('creating picker');
  if (pickerApiLoaded && oauth_token) {
    var picker = new google.picker.PickerBuilder().
        addView(google.picker.ViewId.DOCS).
        setOAuthToken(oauth_token).
        setDeveloperKey(key).
        setCallback(pickerCallback).
        build();
    picker.setVisible(true);
  }
}

function pickerCallback(data) {
  var url = '';
  if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
    var doc = data[google.picker.Response.DOCUMENTS][0];
    url = doc[google.picker.Document.URL];
  }
  var textarea = document.getElementById("base64textarea");
  textarea.value = btoa(url);
  FrequencyPlayer.setMimeType('gd');
  FrequencyPlayer.setFileName('gd');
}

module.exports = {
  createPicker
}