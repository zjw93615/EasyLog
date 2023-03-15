import {beacon, sendImage} from "../src/utils/SendFn";
const LOAD_FAILURE_SRC = 'LOAD_FAILURE_SRC';
const LOAD_SUCCESS_SRC = 'LOAD_SUCCESS_SRC';


describe('Check SendFn', () => {

    it('sendImage method', () => {
        sendImage({}, '')
    });

    it('beacon method', () => {
        beacon({}, '')
    });

    it('sendBeacon method', () => {
        navigator.sendBeacon = jest.fn()
        beacon({}, '')
    });
})