import Sender from "../src/Sender";
import {SEND_TYPE} from "../src/interface";
import {beacon, sendImage} from "../src/utils/SendFn";
import {ReportContent} from "../src/interface";
jest.mock('../src/utils/SendFn', () => {
    //Mock the default export and named export 'foo'
    return {
        __esModule: true,
        sendImage: jest.fn((data: ReportContent,sendUrl: string) => {}),
        beacon: jest.fn((data: ReportContent,sendUrl: string) => {}),
    };
});
jest.useFakeTimers();
jest.setSystemTime(new Date('2023-01-01'));

describe('Check Sender Class', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('beacon send method', () => {
        const temp = {
            sendUrl: 'localhost',
            sendType: SEND_TYPE.BEACON
        };
        const sender = new Sender(temp);
        const data = {
            reportTime: String(Date.now())
        }
        sender.send(data)
        expect(beacon).toHaveBeenCalledTimes(1);
        expect(beacon).toHaveBeenLastCalledWith(data, 'localhost')
    });

    it('image send method', () => {
        const temp = {
            sendUrl: 'localhost',
            sendType: SEND_TYPE.IMG
        };
        const sender = new Sender(temp);
        const data = {
            reportTime: String(Date.now())
        }
        sender.send(data)
        expect(sendImage).toHaveBeenCalledTimes(1);
        expect(sendImage).toHaveBeenLastCalledWith(data, 'localhost')
    });

    it('custom send method', () => {
        const sendFn = jest.fn();
        const temp = {
            sendFn
        };
        const sender = new Sender(temp);
        const data = {
            reportTime: String(Date.now())
        }
        sender.send(data)
        expect(sendFn).toHaveBeenCalledTimes(1);
        expect(sendFn).toHaveBeenLastCalledWith(data)
    });

    it('no strategy for sendType', () => {
        const sendFn = jest.fn();
        const temp = {
            sendUrl: 'localhost',
            sendType: 'none' as SEND_TYPE
        };
        const sender = new Sender(temp);
        const data = {
            reportTime: String(Date.now())
        }
        sender.send(data)
        expect(beacon).toHaveBeenCalledTimes(1);
        expect(beacon).toHaveBeenLastCalledWith(data, 'localhost')
    });

    it('missing sendFn, sendType or sendUrl', () => {
        const sendFn = jest.fn();
        const temp = {};
        const sender = new Sender(temp);
        const data = {
            reportTime: String(Date.now())
        }
        sender.send(data)
        expect(beacon).toHaveBeenCalledTimes(1);
        expect(beacon).toHaveBeenLastCalledWith(data, '')
    });
});