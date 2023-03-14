import {EasyEvent, ReportContent} from "./interface";
import Sender from "./Sender";

class Queue {
    private isConsuming: boolean = false
    private eventQueue: EasyEvent[] = []
    private singleMode: boolean | undefined
    private sendTimeout!: number
    private sendQueueSize!: number
    private sendTimer!: number
    private reportCreator!: () => ReportContent
    private sender!: Sender

    constructor (props: {
        reportCreator: () => ReportContent
        sendTimeout: number,
        sendQueueSize: number,
        singleMode: boolean | undefined,
        sender: Sender,
    }) {
        const { sendTimeout, sendQueueSize, singleMode, reportCreator, sender } = props
        this.sendTimeout = sendTimeout
        this.sendQueueSize = sendQueueSize
        this.singleMode = singleMode
        this.reportCreator = reportCreator
        this.sender = sender
    }

    /* start the queue */
    begin() {
        const sendTimer = setInterval(() => {
            if (this.eventQueue.length > 0) {
                this.consume()
            }
            return
        }, this.sendTimeout)
        this.sendTimer = sendTimer;
        return sendTimer
    }

    /* end the queue */
    end() {
        if (this.sendTimer) {
            clearInterval(this.sendTimer)
        }
    }

    /* push log into queue */
    push(event: EasyEvent) {
        /**
         * In singleMode
         * push will consume the log immediately
         */
        if (this.singleMode) {
            this.eventQueue.push(event)
            this.consume()
            return
        }
        /**
         * If queue length reach the max size
         * consume the log immediately and then push new log into the queue
         */
        if (this.eventQueue.length >= this.sendQueueSize) {
            this.consume()
        }
        this.eventQueue.push(event)
    }

    /* consume and send logs in the queue and reset queue */
    consume() {
        if (this.isConsuming) return
        this.isConsuming = true
        const items = this.eventQueue.slice(0)
        this.eventQueue = []
        this.isConsuming = false
        this.sender.send({
            items,
            ...this.reportCreator()
        })
    }
}

export default Queue