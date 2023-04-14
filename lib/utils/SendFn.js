"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendImage = exports.beacon = void 0;
/* report log by img url function */
var sendImage = function sendImage(data, sendUrl) {
  var image = new Image();
  image.src = sendUrl + "/" + encodeURIComponent(JSON.stringify(data));
  image.onerror = function () {
    console.error('EasyLogReport - log data send from image src error');
  };
};
/* report log by sendBeacon function */
exports.sendImage = sendImage;
var beacon = function beacon(data, sendUrl) {
  if (!(navigator === null || navigator === void 0 ? void 0 : navigator.sendBeacon)) {
    console.error('EasyLogReport - current env don\'t support sendBeacon!');
    return;
  }
  navigator.sendBeacon(sendUrl, encodeURIComponent(JSON.stringify(data)));
};
exports.beacon = beacon;