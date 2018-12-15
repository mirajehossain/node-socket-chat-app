const expect = require('expect');
const {generateMessage, generateLocationMessage } = require('./message');
describe('generateMessage', function () {
    it('should generate correct message object', function () {
        let from = "Miraje";
        let text = "Some text";
        let message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});

    });
});

describe('generateLocationMessage', function () {
    it('should generate correct location object', function () {
        let from = "Miraje";
        let lat = 15;
        let lon = 19;
        let url = 'https://www.google.com/maps?q=15,19';
        let message = generateLocationMessage(from, lat, lon);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url})
    });
});