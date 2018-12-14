const expect = require('expect');
const {generateMessage } = require('./message');
describe('generateMessage', function () {
    it('should generate correct message object', function () {
        let from = "Miraje";
        let text = "Some text";
        let message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});

    });
});