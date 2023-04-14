"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _interface = require("./interface");
var _Queue = _interopRequireDefault(require("./Queue"));
var _PageStack = _interopRequireDefault(require("./PageStack"));
var _Sender = _interopRequireDefault(require("./Sender"));
var _defaultConfig = _interopRequireDefault(require("./defaultConfig"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var defaultEventContent = {};
/* EasyLogReport Class */
var EasyLogReport = /** @class */function () {
  function EasyLogReport(props) {
    this.reportOptions = __assign(__assign({}, _defaultConfig["default"]), props || {});
  }
  /* init function */
  EasyLogReport.prototype.init = function (cb) {
    var reportCreator = this.reportCreator;
    var _a = this.reportOptions,
      sendInterval = _a.sendInterval,
      sendQueueSize = _a.sendQueueSize,
      singleMode = _a.singleMode,
      sendFn = _a.sendFn,
      getCurrentPage = _a.getCurrentPage,
      sendUrl = _a.sendUrl,
      sendType = _a.sendType,
      getInitialEventContent = _a.getInitialEventContent;
    this.sender = new _Sender["default"]({
      sendUrl: sendUrl,
      sendType: sendType,
      sendFn: sendFn
    });
    this.queue = new _Queue["default"]({
      sendInterval: sendInterval,
      sendQueueSize: sendQueueSize,
      singleMode: singleMode,
      reportCreator: reportCreator,
      sender: this.sender
    });
    if (!singleMode) {
      this.queue.begin();
    }
    this.stack = new _PageStack["default"]({
      getCurrentPage: getCurrentPage
    });
    defaultEventContent = getInitialEventContent ? getInitialEventContent() : {};
    cb && cb();
  };
  /* log method */
  EasyLogReport.prototype.log = function (event, logLevel) {
    var eventType = event.eventType;
    logLevel = logLevel || _interface.LOG_LEVEL.NOTICE;
    /* Filter the log of events that are not initialized in the init method */
    if (this.reportOptions.acceptEventType.indexOf(eventType) === -1) return console.warn('EasyLogReport - unregister event');
    if (eventType === 'onLoad') {
      this.stack.push();
    }
    var _evnet = __assign(__assign({}, event), {
      logLevel: logLevel,
      path: this.stack.getCurrentStack()
    });
    if (eventType === 'onUnload') {
      this.stack.pop();
    }
    if (!_evnet.createTime) _evnet.createTime = String(Date.now());
    this.queue.push(_evnet);
  };
  /* warn method */
  EasyLogReport.prototype.warn = function (event) {
    this.log(event, _interface.LOG_LEVEL.WARNING);
  };
  /* error method */
  EasyLogReport.prototype.error = function (event) {
    this.log(event, _interface.LOG_LEVEL.ERROR);
  };
  /* debug method */
  EasyLogReport.prototype.debug = function (event) {
    this.log(event, _interface.LOG_LEVEL.DEBUG);
  };
  /* create default log content */
  EasyLogReport.prototype.reportCreator = function () {
    return __assign(__assign({}, defaultEventContent), {
      reportTime: String(Date.now())
    });
  };
  /* update default log content */
  EasyLogReport.prototype.updateInitialEventContent = function (updateContent) {
    var key = updateContent.key,
      value = updateContent.value;
    // @ts-ignore
    defaultEventContent[key] = value;
  };
  /* get the default log content */
  EasyLogReport.prototype.getInitialEventContent = function () {
    return defaultEventContent;
  };
  return EasyLogReport;
}();
var _default = EasyLogReport;
exports["default"] = _default;