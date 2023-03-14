import {
    EasyEvent,
    InitialEventContent,
    InitialReportContent,
    LOG_LEVEL,
    ReportOptions
} from "./interface";
import Queue from "./Queue";
import PageStack from "./PageStack";
import Sender from "./Sender";
import defaultConfig from "./defaultConfig";

let defaultEventContent: InitialReportContent = {}
/* EasyLog Class */
class EasyLog {
    private reportOptions: ReportOptions
    private queue!: Queue
    private stack!: PageStack
    private sender!: Sender

    constructor (props: ReportOptions) {
        this.reportOptions = {
            ...defaultConfig,
            ...props
        }
    }

    /* init function */
    init(cb?: () => void) {
        const { reportCreator } = this
        const { sendTimeout, sendQueueSize, singleMode, sendFn, getCurrentPage, sendUrl, sendType, getInitialEventContent } = this.reportOptions
        this.sender = new Sender({
            sendUrl: sendUrl!,
            sendType: sendType!,
            sendFn: sendFn,
        })
        this.queue = new Queue({
            sendTimeout: sendTimeout!,
            sendQueueSize: sendQueueSize!,
            singleMode: singleMode,
            reportCreator: reportCreator,
            sender: this.sender
        })
        if (!singleMode) {
            this.queue.begin()
        }
        this.stack = new PageStack({ getCurrentPage: getCurrentPage! })
        defaultEventContent = getInitialEventContent ? getInitialEventContent() : {}
        cb && cb()
    }

    /* log method */
    log(event: EasyEvent, logLevel?: LOG_LEVEL) {
        const { eventType } = event
        logLevel = logLevel || LOG_LEVEL.NOTICE

        /* Filter the log of events that are not initialized in the init method */
        if (this.reportOptions.acceptEventType!.indexOf(eventType) === -1) return console.warn('EasyLog - unregister event')

        if (eventType === 'onLoad') {
            this.stack.push()
        }

        const _evnet = {
            ...event,
            logLevel,
            path: this.stack.getCurrentStack()
        }

        if (eventType === 'onUnLoad') {
            this.stack.pop()
        }

        if (!_evnet.createTime) _evnet.createTime = String(Date.now())
        this.queue.push(_evnet)
    }

    /* warn method */
    warn(event: EasyEvent) {
        return this.log(event, LOG_LEVEL.WARNING)
    }

    /* error method */
    error(event: EasyEvent) {
        return this.log(event, LOG_LEVEL.ERROR)
    }

    /* debug method */
    debug(event: EasyEvent) {
        return this.log(event, LOG_LEVEL.DEBUG)
    }

    /* create default log content */
    reportCreator() {
        return {
            ...defaultEventContent,
            reportTime: String(Date.now()),
        }
    }

    /* update default log content */
    updateInitialEventContent(updateContent: InitialEventContent) {
        const { key, value } = updateContent
        // @ts-ignore
        defaultEventContent[key] = value
    }

    /* get the default log content */
    getInitialEventContent() {
        return defaultEventContent
    }
}


export default EasyLog