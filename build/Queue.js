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
    /* start the queue */
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
    /* end the queue */
    Queue.prototype.end = function () {
        if (this.sendTimer) {
            clearInterval(this.sendTimer);
        }
    };
    /* push log into queue */
    Queue.prototype.push = function (event) {
        /**
         * In singleMode
         * push will consume the log immediately
         */
        if (this.singleMode) {
            this.eventQueue.push(event);
            this.consume();
            return;
        }
        /**
         * If queue length reach the max size
         * consume the log immediately and then push new log into the queue
         */
        if (this.eventQueue.length >= this.sendQueueSize) {
            this.consume();
        }
        this.eventQueue.push(event);
    };
    /* consume and send logs in the queue and reset queue */
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
