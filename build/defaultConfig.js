var defaultConfig = {
    acceptEventType: ['onLaunch', 'onLoad', 'onUnload', 'onShow', 'request', 'onError', 'click'],
    sendTimeout: 1000 * 5,
    sendQueueSize: 30,
    singleModel: false,
    getCurrentPage: function () { return window.location.href; },
    getInitialEventContent: function () {
        return {
            appInfo: {},
            systemInfo: {
                ua: navigator.userAgent,
                is_cookie: window.navigator.cookieEnabled ? 1 : 0,
                cookie: document.cookie || '',
                screen_height: window.screen.availHeight,
                screen_width: window.screen.availWidth,
            },
            userInfo: {},
        };
    },
};
export default defaultConfig;
