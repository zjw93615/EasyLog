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
        else if (sendType && this.sendUrl != null) {
            var sendTypeFn_1 = this.strategy[sendType];
            if (!sendTypeFn_1) {
                console.error("EasyLogReport - no strategy for ".concat(sendType, " type\uFF01Using beacon by default"));
                this.sendFn = function (data) {
                    beacon(data, _this.sendUrl || '');
                };
            }
            else {
                this.sendFn = function (data) {
                    sendTypeFn_1(data, _this.sendUrl || '');
                };
            }
        }
        else {
            console.error("EasyLogReport - missing sendFn, sendType or sendUrl");
            this.sendFn = function (data) {
                console.error("EasyLogReport - missing sendFn, sendType or sendUrl");
            };
        }
    }
    /* send logs */
    Sender.prototype.send = function (data) {
        this.sendFn(data);
    };
    return Sender;
}());
export default Sender;
