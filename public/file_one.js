// javascript
// the platform access token should alreayd be in the http header X_HTTP_CYBOTIX_PLATFORM_TOKEN 

console.log("call to Cybotix")
function sendDataToExtension(key, value) {
    console.log("call to Cybotix")
    var dataObj = {"key":key, "value":value};
    var storeEvent = new CustomEvent('myCybotixPlatformAccessRequest', {"detail":dataObj});
    document.dispatchEvent(storeEvent);
}
sendDataToExtension("hello", "world");