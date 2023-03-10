var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/* 每次上报都会默认带上的内容 */
import { LOG_LEVEL } from "./interface";
import Queue from "./Queue";
import PageStack from "./PageStack";
import Sender from "./Sender";
import defaultConfig from "./defaultConfig";
var defaultEventContent = {};
/* 埋点插件实例 */
var EasyLog = /** @class */ (function () {
    function EasyLog(props) {
        this.reportOptions = __assign(__assign({}, defaultConfig), props);
    }
    /* 埋点上报插件初始化方法 */
    EasyLog.prototype.init = function (cb) {
        var reportCreator = this.reportCreator;
        var _a = this.reportOptions, sendTimeout = _a.sendTimeout, sendQueueSize = _a.sendQueueSize, singleModel = _a.singleModel, sendFn = _a.sendFn, getCurrentPage = _a.getCurrentPage, sendUrl = _a.sendUrl, sendType = _a.sendType, getInitialEventContent = _a.getInitialEventContent;
        this.sender = new Sender({
            sendUrl: sendUrl,
            sendType: sendType,
            sendFn: sendFn,
        });
        this.queue = new Queue({
            sendTimeout: sendTimeout,
            sendQueueSize: sendQueueSize,
            singleModel: singleModel,
            reportCreator: reportCreator,
            sender: this.sender
        });
        if (!singleModel) {
            this.queue.begin();
        }
        this.stack = new PageStack({ getCurrentPage: getCurrentPage });
        defaultEventContent = getInitialEventContent ? getInitialEventContent() : {};
        cb && cb();
    };
    /* 埋点上报方法 */
    EasyLog.prototype.log = function (event, logLevel) {
        var eventType = event.eventType;
        logLevel = logLevel || LOG_LEVEL.NOTICE;
        /* 过滤未在init方法中初始化的事件上报 */
        if (this.reportOptions.acceptEventType.indexOf(eventType) === -1)
            return console.warn('EasyLog - unregister event');
        if (eventType === 'onLoad') {
            this.stack.push();
        }
        var _evnet = __assign(__assign({}, event), { logLevel: logLevel, path: this.stack.getCurrentStack() });
        if (eventType === 'onUnLoad') {
            this.stack.pop();
        }
        if (!_evnet.createTime)
            _evnet.createTime = String(Date.now());
        this.queue.push(_evnet);
    };
    EasyLog.prototype.warn = function (event) {
        return this.log(event, LOG_LEVEL.WARNING);
    };
    EasyLog.prototype.error = function (event) {
        return this.log(event, LOG_LEVEL.ERROR);
    };
    EasyLog.prototype.debug = function (event) {
        return this.log(event, LOG_LEVEL.DEBUG);
    };
    /* 日志生成方法 */
    EasyLog.prototype.reportCreator = function () {
        return __assign(__assign({}, defaultEventContent), { reportTime: String(Date.now()) });
    };
    /* 更新队列状态 */
    EasyLog.prototype.updateQueueStatus = function (status) {
        if (status) {
            return this.queue.begin();
        }
        this.queue.end();
    };
    /* 更新日志默认参数 */
    EasyLog.prototype.updateInitialEventContent = function (updateContent) {
        var key = updateContent.key, value = updateContent.value;
        // @ts-ignore
        defaultEventContent[key] = value;
    };
    /* 查询日志默认参数 */
    EasyLog.prototype.getInitialEventContent = function () {
        return defaultEventContent;
    };
    return EasyLog;
}());
// export LOG_LEVEL;
export default EasyLog;
