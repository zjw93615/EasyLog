"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SEND_TYPE = exports.LOG_LEVEL = void 0;
var LOG_LEVEL;
exports.LOG_LEVEL = LOG_LEVEL;
(function (LOG_LEVEL) {
  LOG_LEVEL[LOG_LEVEL["EMERGENCY"] = 0] = "EMERGENCY";
  LOG_LEVEL[LOG_LEVEL["ALERT"] = 1] = "ALERT";
  LOG_LEVEL[LOG_LEVEL["CRITICAL"] = 2] = "CRITICAL";
  LOG_LEVEL[LOG_LEVEL["ERROR"] = 3] = "ERROR";
  LOG_LEVEL[LOG_LEVEL["WARNING"] = 4] = "WARNING";
  LOG_LEVEL[LOG_LEVEL["NOTICE"] = 5] = "NOTICE";
  LOG_LEVEL[LOG_LEVEL["INFORMATIONAL"] = 6] = "INFORMATIONAL";
  LOG_LEVEL[LOG_LEVEL["DEBUG"] = 7] = "DEBUG";
})(LOG_LEVEL || (exports.LOG_LEVEL = LOG_LEVEL = {}));
var SEND_TYPE;
exports.SEND_TYPE = SEND_TYPE;
(function (SEND_TYPE) {
  SEND_TYPE["IMG"] = "img";
  SEND_TYPE["BEACON"] = "beacon";
})(SEND_TYPE || (exports.SEND_TYPE = SEND_TYPE = {}));