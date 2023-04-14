"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var defaultConfig = {
  acceptEventType: ['onLaunch', 'onLoad', 'onUnload', 'onShow', 'request', 'onError', 'click'],
  sendInterval: 1000 * 30,
  sendQueueSize: 50,
  singleMode: false
};
var _default = defaultConfig;
exports["default"] = _default;