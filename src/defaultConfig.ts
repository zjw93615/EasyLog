import {ReportOptions} from "./interface";

const defaultConfig: ReportOptions = {
    acceptEventType: ['onLaunch', 'onLoad', 'onUnload', 'onShow', 'request', 'onError', 'click'],
    sendTimeout: 1000 * 5,
    sendQueueSize: 30,
    singleModel: false,
    getCurrentPage: () => window.location.href,
    getInitialEventContent: () => {
        return {
            appInfo: {

            },
            systemInfo: {
                ua: navigator.userAgent,
                is_cookie: window.navigator.cookieEnabled ? 1 : 0,
                cookie: document.cookie || '',
                screen_height: window.screen.availHeight,
                screen_width: window.screen.availWidth,
            },
            userInfo: {

            },
        }
    },
}

export default defaultConfig