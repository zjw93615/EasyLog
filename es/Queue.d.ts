/// <reference types="node" />
import { EasyEvent, ReportContent } from "./interface";
import Sender from "./Sender";
declare class Queue {
    private isConsuming;
    private eventQueue;
    private singleMode;
    private sendInterval;
    private sendQueueSize;
    private sendTimer;
    private reportCreator;
    private sender;
    constructor(props: {
        reportCreator: () => ReportContent;
        sendInterval: number;
        sendQueueSize: number;
        singleMode: boolean | undefined;
        sender: Sender;
    });
    begin(): NodeJS.Timer;
    end(): void;
    push(event: EasyEvent): void;
    consume(): void;
}
export default Queue;
