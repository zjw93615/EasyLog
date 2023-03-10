/* 每次上报都会默认带上的内容 */
import {
    EasyEvent,
    InitialEventContent,
    InitialReportContent,
    LOG_LEVEL,
    SEND_TYPE,
    ReportOptions
} from "./interface";
import Queue from "./Queue";
import PageStack from "./PageStack";
import Sender from "./Sender";
import defaultConfig from "./defaultConfig";

let defaultEventContent: InitialReportContent = {}
/* 埋点插件实例 */
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

    /* 埋点上报插件初始化方法 */
    init(cb?: () => void) {
        const { reportCreator } = this
        const { sendTimeout, sendQueueSize, singleModel, sendFn, getCurrentPage, sendUrl, sendType, getInitialEventContent } = this.reportOptions
        this.sender = new Sender({
            sendUrl: sendUrl!,
            sendType: sendType!,
            sendFn: sendFn,
        })
        this.queue = new Queue({
            sendTimeout: sendTimeout!,
            sendQueueSize: sendQueueSize!,
            singleModel: singleModel,
            reportCreator: reportCreator,
            sender: this.sender
        })
        if (!singleModel) {
            this.queue.begin()
        }
        this.stack = new PageStack({ getCurrentPage: getCurrentPage! })
        defaultEventContent = getInitialEventContent ? getInitialEventContent() : {}
        cb && cb()
    }

    /* 埋点上报方法 */
    log(event: EasyEvent, logLevel?: LOG_LEVEL) {
        const { eventType } = event
        logLevel = logLevel || LOG_LEVEL.NOTICE

        /* 过滤未在init方法中初始化的事件上报 */
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

    warn(event: EasyEvent) {
        return this.log(event, LOG_LEVEL.WARNING)
    }

    error(event: EasyEvent) {
        return this.log(event, LOG_LEVEL.ERROR)
    }

    debug(event: EasyEvent) {
        return this.log(event, LOG_LEVEL.DEBUG)
    }

    /* 日志生成方法 */
    reportCreator() {
        return {
            ...defaultEventContent,
            reportTime: String(Date.now()),
        }
    }

    /* 更新队列状态 */
    updateQueueStatus(status: boolean) {
        if (status) {
            return this.queue.begin()
        }
        this.queue.end()
    }

    /* 更新日志默认参数 */
    updateInitialEventContent(updateContent: InitialEventContent) {
        const { key, value } = updateContent
        // @ts-ignore
        defaultEventContent[key] = value
    }

    /* 查询日志默认参数 */
    getInitialEventContent() {
        return defaultEventContent
    }
}


// export LOG_LEVEL;
export default EasyLog