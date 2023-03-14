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
var Queue = /** @class */ (function () {
    function Queue(props) {
        this.isConsuming = false;
        this.eventQueue = [];
        var sendTimeout = props.sendTimeout, sendQueueSize = props.sendQueueSize, singleMode = props.singleMode, reportCreator = props.reportCreator, sender = props.sender;
        this.sendTimeout = sendTimeout;
        this.sendQueueSize = sendQueueSize;
        this.singleMode = singleMode;
        this.reportCreator = reportCreator;
        this.sender = sender;
    }
    /* 队列启动方法 */
    Queue.prototype.begin = function () {
        var _this = this;
        var sendTimer = setInterval(function () {
            if (_this.eventQueue.length > 0) {
                _this.consume();
            }
            return;
        }, this.sendTimeout);
        this.sendTimer = sendTimer;
        return sendTimer;
    };
    /* 队列终止方法 */
    Queue.prototype.end = function () {
        if (this.sendTimer) {
            clearInterval(this.sendTimer);
        }
    };
    /* 日志推送方法 */
    Queue.prototype.push = function (event) {
        /**
         * 在单日志上报模式下
         * push方法会直接消费日志
         */
        if (this.singleMode) {
            this.eventQueue.push(event);
            this.consume();
            return;
        }
        /**
         * 当队列长度达到限制长度则先触发消费方法
         * 触发之后再将新日志推送入队列
         */
        if (this.eventQueue.length >= this.sendQueueSize) {
            this.consume();
        }
        this.eventQueue.push(event);
    };
    /* 队列消费方法 */
    Queue.prototype.consume = function () {
        if (this.isConsuming)
            return;
        this.isConsuming = true;
        var items = this.eventQueue.slice(0);
        this.eventQueue = [];
        this.isConsuming = false;
        this.sender.send(__assign({ items: items }, this.reportCreator()));
    };
    return Queue;
}());
export default Queue;
