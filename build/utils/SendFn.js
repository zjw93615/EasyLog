/* report log by img url function */
export var sendImage = function (data, sendUrl) {
    var image = new Image();
    image.src = sendUrl + "/" + encodeURIComponent(JSON.stringify(data));
    image.onerror = function () {
        console.error('EasyLogReport - log data send from image src error');
    };
};
/* report log by sendBeacon function */
export var beacon = function (data, sendUrl) {
    console.log('sendUrl', sendUrl, data);
    if (!(navigator === null || navigator === void 0 ? void 0 : navigator.sendBeacon)) {
        console.error('EasyLogReport - current env don\'t support sendBeacon!');
        return;
    }
    navigator.sendBeacon(sendUrl, encodeURIComponent(JSON.stringify(data)));
};
