import Queue from "../src/Queue";
import Sender from "../src/Sender";
jest.useFakeTimers();

describe('Check Queue Class', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
    });

    it('begin method', () => {
        const queueBeginSpy = jest.spyOn(Queue.prototype, 'begin');
        const sendFn = jest.fn();
        const sender = new Sender({
            sendFn,
        });
        const queue = new Queue({
            sendInterval: 100,
            sendQueueSize: 10,
            singleMode: false,
            reportCreator: () => {return {}},
            sender,
        })
        queue.begin()
        queue.push({
            eventType: 'onLoad'
        })

        // Equivalent to above check:
        expect(sendFn).toHaveBeenCalledTimes(0);
        expect(queueBeginSpy).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(100);
        expect(sendFn).toHaveBeenCalledTimes(1);

        // push second time
        queue.push({
            eventType: 'onLoad'
        })
        jest.advanceTimersByTime(100);
        expect(sendFn).toHaveBeenCalledTimes(2);
    });

    it('end method', () => {
        const queueEndSpy = jest.spyOn(Queue.prototype, 'end');
        const sendFn = jest.fn();
        const sender = new Sender({
            sendFn,
        });
        const queue = new Queue({
            sendInterval: 100,
            sendQueueSize: 10,
            singleMode: false,
            reportCreator: () => {return {}},
            sender,
        })
        queue.begin()
        queue.end()
        queue.push({
            eventType: 'onLoad'
        })

        // Equivalent to above check:
        expect(queueEndSpy).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(100);
        expect(sendFn).toHaveBeenCalledTimes(0);

        // push second time
        queue.push({
            eventType: 'onLoad'
        })
        jest.advanceTimersByTime(100);
        expect(sendFn).toHaveBeenCalledTimes(0);
    });

    it('push method', () => {
        const queuePushSpy = jest.spyOn(Queue.prototype, 'push');
        const sendFn = jest.fn();
        const sender = new Sender({
            sendFn,
        });
        const queue = new Queue({
            sendInterval: 100,
            sendQueueSize: 10,
            singleMode: false,
            reportCreator: () => {return {}},
            sender,
        })
        queue.begin()
        queue.push({
            eventType: 'onLoad'
        })

        // Equivalent to above check:
        expect(queuePushSpy).toHaveBeenCalledTimes(1);
    });

    it('push method (single mode)', () => {
        const queuePushSpy = jest.spyOn(Queue.prototype, 'push');
        const sendFn = jest.fn();
        const sender = new Sender({
            sendFn,
        });
        const queue = new Queue({
            sendInterval: 100,
            sendQueueSize: 10,
            singleMode: true,
            reportCreator: () => {return {}},
            sender,
        })
        queue.begin()
        queue.push({
            eventType: 'onLoad'
        })

        // Equivalent to above check:
        expect(queuePushSpy).toHaveBeenCalledTimes(1);
        expect(sendFn).toHaveBeenCalledTimes(1);
    });

    it('consume method', () => {
        const queueConsumeSpy = jest.spyOn(Queue.prototype, 'consume');
        const sendFn = jest.fn();
        const sender = new Sender({
            sendFn,
        });
        const queue = new Queue({
            sendInterval: 100,
            sendQueueSize: 10,
            singleMode: false,
            reportCreator: () => {return {}},
            sender,
        })
        queue.begin()
        queue.push({
            eventType: 'onLoad'
        })

        // Equivalent to above check:
        expect(queueConsumeSpy).toHaveBeenCalledTimes(0);
        jest.advanceTimersByTime(100);
        expect(queueConsumeSpy).toHaveBeenCalledTimes(1);
        expect(sendFn).toHaveBeenCalledTimes(1);
    });

    it('reach sendQueueSize', () => {
        const queueConsumeSpy = jest.spyOn(Queue.prototype, 'consume');
        const sendFn = jest.fn();
        const sender = new Sender({
            sendFn,
        });
        const queue = new Queue({
            sendInterval: 100,
            sendQueueSize: 2,
            singleMode: false,
            reportCreator: () => {return {}},
            sender,
        })
        queue.begin()
        queue.push({
            eventType: 'onLoad'
        })

        // Equivalent to above check:
        expect(queueConsumeSpy).toHaveBeenCalledTimes(0);
        queue.push({
            eventType: 'onLoad'
        })
        queue.push({
            eventType: 'onLoad'
        })

        // Equivalent to above check:
        expect(queueConsumeSpy).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(100);
        expect(queueConsumeSpy).toHaveBeenCalledTimes(2);
        expect(sendFn).toHaveBeenCalledTimes(2);
    });
});