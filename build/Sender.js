import { SEND_TYPE } from "./interface";
import { beacon, sendImage } from "./utils/SendFn";
var Sender = /** @class */ (function () {
    function Sender(props) {
        var _a;
        var _this = this;
        var sendUrl = props.sendUrl, sendType = props.sendType, sendFn = props.sendFn;
        this.sendUrl = sendUrl;
        this.strategy = (_a = {},
            _a[SEND_TYPE.IMG] = sendImage,
            _a[SEND_TYPE.BEACON] = beacon,
            _a);
        this.sendType = sendType;
        if (typeof sendFn === 'function') {
            this.sendFn = sendFn;
        }
        else {
            var sendTypeFn_1 = this.strategy[sendType];
            if (!sendTypeFn_1) {
                console.error("Easylog - no strategy for ".concat(sendType, " type\uFF01Using beacon by default"));
                this.sendFn = function (data) {
                    beacon(data, _this.sendUrl);
                };
            }
            else {
                this.sendFn = function (data) {
                    sendTypeFn_1(data, _this.sendUrl);
                };
            }
        }
    }
    /**
     * 添加消息
     * @param data 日志内容
     */
    Sender.prototype.send = function (data) {
        // 上报日志
        this.sendFn(data);
    };
    return Sender;
}());
export default Sender;
