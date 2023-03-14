import EasyLogReport from "../src/index";
import {EasyEvent, InitialEventContent} from "../build/interface";
import {InitialReportContent, LOG_LEVEL} from "../src/interface";
jest.useFakeTimers();
jest.setSystemTime(new Date('2023-01-01'));

describe('Check EasyLogReport Class', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('init method', () => {
        const EasyLogReportInitSpy = jest.spyOn(EasyLogReport.prototype, 'init')
        const easyLogReport = new EasyLogReport({
            sendFn: () => {},
            getInitialEventContent: () => {
                return {}
            }
        });

        const cb = () => {}
        easyLogReport.init(cb);

        // Equivalent to above check:
        expect(EasyLogReportInitSpy).toHaveBeenCalledWith(cb);
        expect(EasyLogReportInitSpy).toHaveBeenCalledTimes(1);
    });

    it('log method', () => {
        const EasyLogReportLogSpy = jest.spyOn(EasyLogReport.prototype, 'log')
        const easyLogReport = new EasyLogReport({
            sendFn: () => {},
            getInitialEventContent: () => {
                return {}
            },
            getCurrentPage: () => {
                return ''
            }
        });

        const cb = () => {}
        easyLogReport.init(cb);
        const event: EasyEvent = {
            eventType: 'onLoad'
        }
        easyLogReport.log(event)

        // Equivalent to above check:
        expect(EasyLogReportLogSpy).toHaveBeenCalledWith(event);
        expect(EasyLogReportLogSpy).toHaveBeenCalledTimes(1);
    });

    it('warn method', () => {
        const EasyLogReportLogSpy = jest.spyOn(EasyLogReport.prototype, 'log')
        const EasyLogReportWarnSpy = jest.spyOn(EasyLogReport.prototype, 'warn')
        const easyLogReport = new EasyLogReport({
            sendFn: () => {},
            getInitialEventContent: () => {
                return {}
            },
            getCurrentPage: () => {
                return ''
            }
        });

        const cb = () => {}
        easyLogReport.init(cb);
        const event: EasyEvent = {
            eventType: 'onLoad'
        }
        easyLogReport.warn(event)

        // Equivalent to above check:
        expect(EasyLogReportWarnSpy).toHaveBeenCalledWith(event);
        expect(EasyLogReportWarnSpy).toHaveBeenCalledTimes(1);
        expect(EasyLogReportLogSpy).toHaveBeenCalledWith(event, LOG_LEVEL.WARNING);
        expect(EasyLogReportLogSpy).toHaveBeenCalledTimes(1);
    });

    it('error method', () => {
        const EasyLogReportLogSpy = jest.spyOn(EasyLogReport.prototype, 'log')
        const EasyLogReportErrorSpy = jest.spyOn(EasyLogReport.prototype, 'error')
        const easyLogReport = new EasyLogReport({
            sendFn: () => {},
            getInitialEventContent: () => {
                return {}
            },
            getCurrentPage: () => {
                return ''
            }
        });

        const cb = () => {}
        easyLogReport.init(cb);
        const event: EasyEvent = {
            eventType: 'onLoad'
        }
        easyLogReport.error(event)

        // Equivalent to above check:
        expect(EasyLogReportErrorSpy).toHaveBeenCalledWith(event);
        expect(EasyLogReportErrorSpy).toHaveBeenCalledTimes(1);
        expect(EasyLogReportLogSpy).toHaveBeenCalledWith(event, LOG_LEVEL.ERROR);
        expect(EasyLogReportLogSpy).toHaveBeenCalledTimes(1);
    });

    it('debug method', () => {
        const EasyLogReportLogSpy = jest.spyOn(EasyLogReport.prototype, 'log')
        const EasyLogReportDebugSpy = jest.spyOn(EasyLogReport.prototype, 'debug')
        const easyLogReport = new EasyLogReport({
            sendFn: () => {},
            getInitialEventContent: () => {
                return {}
            },
            getCurrentPage: () => {
                return ''
            }
        });

        const cb = () => {}
        easyLogReport.init(cb);
        const event: EasyEvent = {
            eventType: 'onLoad'
        }
        easyLogReport.debug(event)

        // Equivalent to above check:
        expect(EasyLogReportDebugSpy).toHaveBeenCalledWith(event);
        expect(EasyLogReportDebugSpy).toHaveBeenCalledTimes(1);
        expect(EasyLogReportLogSpy).toHaveBeenCalledWith(event, LOG_LEVEL.DEBUG);
        expect(EasyLogReportLogSpy).toHaveBeenCalledTimes(1);
    });

    it('reportCreator method', () => {
        const EasyLogReportReportCreatSpy = jest.spyOn(EasyLogReport.prototype, 'reportCreator')
        
        const easyLogReport = new EasyLogReport({
            sendFn: () => {},
            getInitialEventContent: () => {
                return {}
            },
            getCurrentPage: () => {
                return ''
            }
        });

        const cb = () => {}
        easyLogReport.init(cb);
        const temp = easyLogReport.reportCreator()
        const result = {
            reportTime: String(Date.now())
        }
        expect(EasyLogReportReportCreatSpy).toHaveBeenCalledTimes(1);
        expect(temp).toStrictEqual(result)
        // console.log(easyLogReport.reportOptions)
    });

    it('getInitialEventContent method', () => {
        const EasyLogReportGetInitialEventContentSpy = jest.spyOn(EasyLogReport.prototype, 'getInitialEventContent')
        const initContent: InitialReportContent = {
            appInfo: {
                appID: 'test-001',
                version: '0.0.1',
                appName: 'easy-log-report-jest'
            }
        }
        const easyLogReport = new EasyLogReport({
            sendFn: () => {},
            getInitialEventContent: () => {
                return initContent
            },
            getCurrentPage: () => {
                return ''
            }
        });

        const cb = () => {}
        easyLogReport.init(cb);
        const temp = easyLogReport.getInitialEventContent()
        expect(EasyLogReportGetInitialEventContentSpy).toHaveBeenCalledTimes(1);
        expect(temp).toStrictEqual(initContent)
    });

    it('updateInitialEventContent method', () => {
        const EasyLogReportUpdateInitialEventContentSpy = jest.spyOn(EasyLogReport.prototype, 'updateInitialEventContent')
        const initContent: InitialReportContent = {
            appInfo: {
                appID: 'test-001',
                version: '0.0.1',
                appName: 'easy-log-report-jest'
            }
        }
        const easyLogReport = new EasyLogReport({
            sendFn: () => {},
            getInitialEventContent: () => {
                return initContent
            },
            getCurrentPage: () => {
                return ''
            }
        });

        easyLogReport.init();
        const changedContent: InitialEventContent = {
            key: 'appInfo',
            value: {
                appID: 'test-002',
                version: '0.0.2',
                appName: 'easy-log-report-jest2'
            }
        }

        easyLogReport.updateInitialEventContent(changedContent)
        const temp = easyLogReport.getInitialEventContent()
        expect(EasyLogReportUpdateInitialEventContentSpy).toHaveBeenCalledTimes(1);
        expect(EasyLogReportUpdateInitialEventContentSpy).toHaveBeenCalledWith(changedContent);

        const result = {
            appInfo: {
                appID: 'test-002',
                version: '0.0.2',
                appName: 'easy-log-report-jest2'
            }
        }
        expect(temp).toStrictEqual(result)
    });
})


