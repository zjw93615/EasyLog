import PageStack from "../src/PageStack";

describe('Check PageStack Class', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('push method', () => {
        const pageStackPushSpy = jest.spyOn(PageStack.prototype, 'push');
        let number = 0;
        const temp = {
            getCurrentPage: () => {
                number += 1
                return 'getCurrentPage-' + number
            }
        };
        const pageStack = new PageStack(temp);
        pageStack.push();

        // Equivalent to above check:
        expect(pageStackPushSpy).toHaveBeenCalledTimes(1);
    });

    it('getCurrentStack method', () => {
        const pageStackGetCurrentStackSpy = jest.spyOn(PageStack.prototype, 'getCurrentStack');
        let number = 0;
        const temp = {
            getCurrentPage: () => {
                number += 1
                return 'getCurrentPage-' + number
            }
        };
        const pageStack = new PageStack(temp);
        pageStack.push();
        const temp1 = pageStack.getCurrentStack();

        // Equivalent to above check:
        expect(pageStackGetCurrentStackSpy).toHaveBeenCalledTimes(1);
        expect(temp1).toStrictEqual('getCurrentPage-1');

        pageStack.push();
        const temp2 = pageStack.getCurrentStack();
        // Equivalent to above check:
        expect(pageStackGetCurrentStackSpy).toHaveBeenCalledTimes(2);
        expect(temp2).toStrictEqual('getCurrentPage-2');
    });

    it('pop method', () => {
        const pageStackPopSpy = jest.spyOn(PageStack.prototype, 'pop');
        let number = 0;
        const temp = {
            getCurrentPage: () => {
                number += 1
                return 'getCurrentPage-' + number
            }
        };
        const pageStack = new PageStack(temp);
        pageStack.push();
        pageStack.push();
        pageStack.pop();
        const temp1 = pageStack.getCurrentStack();

        // Equivalent to above check:
        expect(pageStackPopSpy).toHaveBeenCalledTimes(1);
        expect(temp1).toStrictEqual('getCurrentPage-1');
    });
})