import { EasyEvent, ReportContent } from "./interface";
import Sender from "./Sender";
declare class Queue {
    private isConsuming;
    private eventQueue;
    private singleMode;
    private sendTimeout;
    private sendQueueSize;
    private sendTimer;
    private reportCreator;
    private sender;
    constructor(props: {
        reportCreator: () => ReportContent;
        sendTimeout: number;
        sendQueueSize: number;
        singleMode: boolean | undefined;
        sender: Sender;
    });
    begin(): number;
    end(): void;
    push(event: EasyEvent): void;
    consume(): void;
}
export default Queue;
