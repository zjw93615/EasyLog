import {ReportContent, SEND_TYPE} from "./interface";
import {beacon, sendImage} from "./utils/SendFn";

class Sender {
    private sendUrl: string;
    private strategy!: {[key in SEND_TYPE]: (data: ReportContent, sendUrl: string) => void}
    private sendType!: SEND_TYPE
    private sendFn!: (data: ReportContent) => void

    constructor(props: {
        sendUrl: string,
        sendType: SEND_TYPE,
        sendFn?: (data: ReportContent, sendUrl?: string) => void,
    }) {
        const { sendUrl, sendType, sendFn } = props
        this.sendUrl = sendUrl;
        this.strategy = {
            [SEND_TYPE.IMG]: sendImage,
            [SEND_TYPE.BEACON]: beacon
        }
        this.sendType = sendType
        if(typeof sendFn === 'function') {
            this.sendFn = sendFn
        }else {
            const sendTypeFn = this.strategy[sendType]
            if (!sendTypeFn) {
                console.error(`Easylog - no strategy for ${sendType} type！Using beacon by default`)
                this.sendFn = (data: ReportContent) => {
                    beacon(data, this.sendUrl)
                }
            }else {
                this.sendFn = (data: ReportContent) => {
                    sendTypeFn(data, this.sendUrl)
                }
            }
        }
    }

    /**
     * 添加消息
     * @param data 日志内容
     */
    send(data: ReportContent) {
        // 上报日志
        this.sendFn(data);
    }
}

export default Sender;