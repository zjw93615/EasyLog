# EasyLog

EasyLog is a Typescript library for dealing with log reporting.

## Installation

```sh
yarn add easy-log-report
```
or
```sh
npm install easy-log-report --save
```

## Usage
Report log by sendBeacon function
```javascript
import EasyLogReport from 'easy-log-report'
import { SEND_TYPE } from 'easy-log/build/interface'

const easyLogReport = new EasyLogReport({
    acceptEventType: ['onLaunch', 'onLoad', 'onUnload', 'onShow', 'request', 'onError', 'click'],
    sendTimeout: 1000 * 30,
    sendQueueSize: 30,
    sendUrl: 'http://localhost:8080/api/log/beacon/',
    sendType: SEND_TYPE.BEACON,
    singleModel: false,
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
```
OR report log by your custom sendFn
```javascript
import EasyLogReport from 'easy-log-report'

const easyLogReport = new EasyLogReport({
    acceptEventType: ['onLaunch', 'onLoad', 'onUnload', 'onShow', 'request', 'onError', 'click'],
    sendTimeout: 1000 * 30,
    sendQueueSize: 30,
    sendFn: e => {
        doReportSend(e)
        console.log('EasyLog', e)
    },
    singleModel: false,
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
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)