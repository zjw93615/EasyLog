export interface AppInfo {
    appID?: string;
    version?: string;
    appName?: string;
    [key: string]: any;
}
export interface SystemInfo {
    ua?: string;
    isCookie?: number;
    cookie?: string;
    screenHeight?: number | string;
    screenWidth?: number | string;
    [key: string]: any;
}
export interface UserInfo {
    userID?: string;
    userLanguage?: string;
    token?: string;
    [key: string]: any;
}
export interface InitialEventContent {
    key: string;
    value: any;
}
export interface ReportOptions {
    acceptEventType?: string[];
    sendTimeout?: number;
    sendQueueSize?: number;
    sendUrl?: string;
    sendType?: SEND_TYPE;
    singleMode?: boolean;
    sendFn?: (content: ReportContent) => void;
    getCurrentPage?: () => string;
    getInitialEventContent?: () => InitialReportContent;
}
export interface EasyEvent {
    eventType: string;
    logLevel?: LOG_LEVEL;
    elemId?: string;
    createTime?: string;
    extraParams?: object;
}
export interface InitialReportContent {
    appInfo?: AppInfo;
    systemInfo?: SystemInfo;
    userInfo?: UserInfo;
}
export interface ReportContent extends InitialReportContent {
    items?: EasyEvent[];
    reportTime?: string;
    [key: string]: any;
}
export declare enum LOG_LEVEL {
    EMERGENCY = 0,
    ALERT = 1,
    CRITICAL = 2,
    ERROR = 3,
    WARNING = 4,
    NOTICE = 5,
    INFORMATIONAL = 6,
    DEBUG = 7
}
export declare enum SEND_TYPE {
    IMG = "img",
    BEACON = "beacon"
}
