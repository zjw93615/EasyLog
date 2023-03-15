import {ReportOptions} from "./interface";

const defaultConfig: ReportOptions = {
    acceptEventType: ['onLaunch', 'onLoad', 'onUnload', 'onShow', 'request', 'onError', 'click'],
    sendInterval: 1000 * 30,
    sendQueueSize: 50,
    singleMode: false,
}

export default defaultConfig