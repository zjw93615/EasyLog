/* 队列实例 */
import {EasyEvent, ReportContent} from "./interface";
import Sender from "./Sender";

class Queue {
    private isConsuming: boolean = false
    private eventQueue: EasyEvent[] = []
    private singleModel: boolean | undefined
    private sendTimeout!: number
    private sendQueueSize!: number
    private sendTimer!: number
    private reportCreator!: () => ReportContent
    private sender!: Sender

    constructor (props: {
        reportCreator: () => ReportContent
        sendTimeout: number,
        sendQueueSize: number,
        singleModel: boolean | undefined,
        sender: Sender,
    }) {
        const { sendTimeout, sendQueueSize, singleModel, reportCreator, sender } = props
        this.sendTimeout = sendTimeout
        this.sendQueueSize = sendQueueSize
        this.singleModel = singleModel
        this.reportCreator = reportCreator
        this.sender = sender
    }

    /* 队列启动方法 */
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

    /* 队列终止方法 */
    end() {
        if (this.sendTimer) {
            clearInterval(this.sendTimer)
        }
    }

    /* 日志推送方法 */
    push(event: EasyEvent) {
        /**
         * 在单日志上报模式下
         * push方法会直接消费日志
         */
        if (this.singleModel) {
            this.eventQueue.push(event)
            this.consume()
            return
        }
        /**
         * 当队列长度达到限制长度则先触发消费方法
         * 触发之后再将新日志推送入队列
         */
        if (this.eventQueue.length >= this.sendQueueSize) {
            this.consume()
        }
        this.eventQueue.push(event)
    }

    /* 队列消费方法 */
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