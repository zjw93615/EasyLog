import {beacon, sendImage} from "../src/utils/SendFn";



describe('Check SendFn', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.clearAllTimers();
        global.Image = window.Image;
    });

    it('sendImage method', () => {
        sendImage({}, '')
    });

    it('beacon method', () => {
        beacon({}, '')
    });
})