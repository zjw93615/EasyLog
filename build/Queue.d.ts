import { EasyEvent, ReportContent } from "./interface";
import Sender from "./Sender";
declare class Queue {
    private isConsuming;
    private eventQueue;
    private singleModel;
    private sendTimeout;
    private sendQueueSize;
    private sendTimer;
    private reportCreator;
    private sender;
    constructor(props: {
        reportCreator: () => ReportContent;
        sendTimeout: number;
        sendQueueSize: number;
        singleModel: boolean | undefined;
        sender: Sender;
    });
    begin(): number;
    end(): void;
    push(event: EasyEvent): void;
    consume(): void;
}
export default Queue;
