const tokenize = require('./../src/tokenize').tokenize
describe('tokenizer', () => {
    test('var', () => {
        expect(tokenize(`變量 變量a`)).toEqual([{"key": "變量", "type": "var"}])
    })

    test('var =', () => {
        expect(tokenize(`變量 變量a=12312`)).toEqual([{"key": "變量", "type": "var"}])
    })

    test('function', () => {
        expect(tokenize(`函數 函數a(){
            變量 變量s=12312  
            console.log(變量s)          
        }
        `)).toEqual([{"key": "變量", "type": "var"}])
    })

    test('call', () => {
        expect(tokenize(`函數()`)).toEqual([{"key": "變量", "type": "var"}])
    })
})