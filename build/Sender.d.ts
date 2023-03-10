import { ReportContent, SEND_TYPE } from "./interface";
declare class Sender {
    private sendUrl;
    private strategy;
    private sendType;
    private sendFn;
    constructor(props: {
        sendUrl: string;
        sendType: SEND_TYPE;
        sendFn?: (data: ReportContent, sendUrl?: string) => void;
    });
    /**
     * 添加消息
     * @param data 日志内容
     */
    send(data: ReportContent): void;
}
export default Sender;
