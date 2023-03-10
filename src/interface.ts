export interface AppInfo {
    appID?: string
    version?: string
    appName?: string
    [key: string]: any
}

export interface SystemInfo {
    ua?: string
    isCookie?: number // 错误信息
    cookie?: string
    screenHeight?: number | string
    screenWidth?: number | string
    [key: string]: any
}

export interface UserInfo {
    userID?: string // 触发错误的用户
    userLanguage?: string // 访问网站语言
    token?: string // 用户token
    [key: string]: any
}

export interface InitialEventContent {
    key: string
    value: any
}

export interface ReportOptions {
    /* 允许上报的事件类型 */
    acceptEventType?: string[]

    /* 上报函数触发间隔 */
    sendTimeout?: number

    /* 上报队列最大数量 */
    sendQueueSize?: number

    /* 上报url */
    sendUrl?: string

    /* 上报模式 */
    sendType?: SEND_TYPE

    /**
     * 是否启动单日志上报模式
     * 如果启动单日志上报模式，则不会启动上报队列，其余特性不变
     */
    singleModel?: boolean

    /* 使用方传入的上报方法，参数为待上报队列 */
    sendFn?: (content: ReportContent) => void

    /* 获取当前页面路由 */
    getCurrentPage?: () => string

    /* 获取默认上报内容 */
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