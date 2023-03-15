# EasyLogReport
[![npm](https://img.shields.io/npm/v/easy-log-report.svg)](https://www.npmjs.com/package/easy-log-report)
[![CI](https://github.com/zjw93615/EasyLog/actions/workflows/npmjs.yml/badge.svg?event=release)](https://github.com/zjw93615/EasyLog/actions/workflows/npmjs.yml)
[![Coverage Status](https://coveralls.io/repos/github/zjw93615/EasyLog/badge.svg?branch=master)](https://coveralls.io/github/zjw93615/EasyLog?branch=master)


EasyLogReport is a Typescript library for dealing with log reporting.

## Installation

```sh
yarn add easy-log-report
```
or
```sh
npm install easy-log-report --save
```

## Usage
### Config and Init
Create your 
Report log by sendBeacon function
```javascript
import EasyLogReport from 'easy-log-report'
import { SEND_TYPE } from 'easy-log/build/interface'

const easyLogReport = new EasyLogReport({
    acceptEventType: ['onLaunch', 'onLoad', 'onUnload', 'onShow', 'request', 'onError', 'click'],
    sendInterval: 1000 * 30,
    sendQueueSize: 30,
    sendUrl: 'http://localhost:8080/api/log/beacon/',
    sendType: SEND_TYPE.BEACON,
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
```
OR report log by your custom sendFn
```javascript
import EasyLogReport from 'easy-log-report'

const easyLogReport = new EasyLogReport({
    acceptEventType: ['onLaunch', 'onLoad', 'onUnload', 'onShow', 'request', 'onError', 'click'],
    sendInterval: 1000 * 30,
    sendQueueSize: 30,
    sendFn: e => {
        doReportSend(e)
        console.log('EasyLogReport', e)
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

easyLogReport.init(() => {
    console.log('EasyLogReport init!')
})

export default easyLogReport
```

### Record Log
```javascript
easyLogReport.log({
    eventType: 'onLoad',
    elemId: 'App',
    extraParams: {
        // other extra params
        type: 'onLoad'
    }
})
```
## Config Props
|  Property   | Description  | Type | Default |
|  ----  | ----  | ---- | ---- |
| acceptEventType  | log event types that are allowed to be reported | string[] | ['onLaunch', 'onLoad', 'onUnload', 'onShow', 'request', 'onError', 'click'] |
| sendInterval  | send function trigger interval(millisecond) | number | 1000 * 30 |
| sendQueueSize  | the maximum number of logs in queue | number | 50 |
| singleMode | If it`s singleMode, report log immediately | boolean | false |
| sendUrl  | report url | number | - |
| sendType  | reporting mode | SEND_TYPE.IMG / SEND_TYPE.BEACON | - |
| sendFn  | custom sendFn, If sendFn is set, sendUrl and sendType would be remove | (content: ReportContent) => void | - |
| getCurrentPage  | get current page route | () => string | - |
| getInitialEventContent  | get the default log content | () => InitialReportContent | - |


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)