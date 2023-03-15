export interface AppInfo {
    appID?: string
    version?: string
    appName?: string
    [key: string]: any
}

export interface SystemInfo {
    ua?: string
    isCookie?: number
    cookie?: string
    screenHeight?: number | string
    screenWidth?: number | string
    [key: string]: any
}

export interface UserInfo {
    userID?: string
    userLanguage?: string
    token?: string
    [key: string]: any
}

export interface InitialEventContent {
    key: string
    value: any
}

export interface ReportOptions {
    /* log event types that are allowed to be reported */
    acceptEventType?: string[]

    /* send function trigger interval(millisecond) */
    sendInterval?: number

    /* the maximum number of logs in queue */
    sendQueueSize?: number

    /* report url */
    sendUrl?: string

    /* reporting mode */
    sendType?: SEND_TYPE

    /* If it`s singleMode, report log immediately */
    singleMode?: boolean

    /* custom sendFn, If sendFn is set, sendUrl and sendType would be remove */
    sendFn?: (content: ReportContent) => void

    /* get current page route */
    getCurrentPage?: () => string

    /* get the default log content */
    getInitialEventContent?: () => InitialReportContent
}

export interface EasyEvent {
    eventType: string
    logLevel?: LOG_LEVEL
    elemId?: string
    createTime?: string
    extraParams?: object
}

export interface InitialReportContent {
    appInfo?: AppInfo
    systemInfo?: SystemInfo
    userInfo?: UserInfo
}

export interface ReportContent extends InitialReportContent {
    items?: EasyEvent[]
    reportTime?: string
    [key: string]: any
}

export enum LOG_LEVEL {
    EMERGENCY = 0,
    ALERT = 1,
    CRITICAL = 2,
    ERROR = 3,
    WARNING = 4,
    NOTICE = 5,
    INFORMATIONAL = 6,
    DEBUG = 7
}

export enum SEND_TYPE {
    IMG = 'img',
    BEACON = 'beacon',
}