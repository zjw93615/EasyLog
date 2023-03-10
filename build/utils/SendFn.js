export var sendImage = function (data, sendUrl) {
    var image = new Image();
    image.src = sendUrl + "/" + encodeURIComponent(JSON.stringify(data));
    image.onerror = function () {
        console.error('EasyLog - log data send from image src error');
    };
};
// sendBecaon上报
export var beacon = function (data, sendUrl) {
    console.log('sendUrl', sendUrl, data);
    if (!(navigator === null || navigator === void 0 ? void 0 : navigator.sendBeacon)) {
        console.error('EasyLog - current env don\'t support sendBeacon!');
        return;
    }
    navigator.sendBeacon(sendUrl, encodeURIComponent(JSON.stringify(data)));
};
