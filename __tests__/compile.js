const tokenize = require('./../src/tokenize').tokenize
const compile = require('./../src/compile').compile
describe('compile', () => {
    test('var', () => {
        expect(tokenize(`變量 變量a`)).toEqual([{"key": "變量", "type": "var"}])
    })

    test('var =', () => {
        expect(tokenize(`變量 變量a=12312`)).toEqual([{"key": "變量", "type": "var"}])
    })

    test('function', () => {
        let ast=tokenize(`
        函數 輸出(){
            變量 數量=12312  
            console.log(arguments['數量'])          
        }
        輸出()
        `)
        console.log(ast)
        expect(compile(ast)).toEqual([{"key": "變量", "type": "var"}])
    })
})