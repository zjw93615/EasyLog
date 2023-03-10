import { EasyEvent, InitialEventContent, InitialReportContent, LOG_LEVEL, ReportOptions } from "./interface";
declare class EasyLog {
    private reportOptions;
    private queue;
    private stack;
    private sender;
    constructor(props: ReportOptions);
    init(cb?: () => void): void;
    log(event: EasyEvent, logLevel?: LOG_LEVEL): void;
    warn(event: EasyEvent): void;
    error(event: EasyEvent): void;
    debug(event: EasyEvent): void;
    reportCreator(): {
        reportTime: string;
        appInfo?: import("./interface").AppInfo | undefined;
        systemInfo?: import("./interface").SystemInfo | undefined;
        userInfo?: import("./interface").UserInfo | undefined;
    };
    updateQueueStatus(status: boolean): number | undefined;
    updateInitialEventContent(updateContent: InitialEventContent): void;
    getInitialEventContent(): InitialReportContent;
}
export default EasyLog;
