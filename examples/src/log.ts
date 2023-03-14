import EasyLogReport from 'easy-log-report'

const easyLogReport = new EasyLogReport({
    acceptEventType: ['onLaunch', 'onLoad', 'onUnload', 'onShow', 'request', 'onError', 'click'],
    sendTimeout: 1000 * 30,
    sendQueueSize: 30,
    sendFn: e => {
        // doReportSend(e)
        console.log('EasyLog', e)
    },
    singleMode: false,
    getCurrentPage: () => window.location.href,
    getInitialEventContent: () => {
        return {
            appInfo: {
                // appID,
                // version,
                // appName,
            },
            systemInfo: {
                ua: navigator.userAgent,
                is_cookie: window.navigator.cookieEnabled ? 1 : 0,
                cookie: document.cookie || '',
                screen_height: window.screen.availHeight,
                screen_width: window.screen.availWidth,
            },
            userInfo: {
                // userId,
                // openId,
            },
        }
    },
})

export default easyLogReport