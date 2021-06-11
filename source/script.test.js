const add = require('./script');


describe('focus_item has correct assignments', () => {
    test('focus_item ', () => {
        expect(add(1,2)).toBe(3);
    });
});