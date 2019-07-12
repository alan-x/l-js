const tokenizer = require('../src/tokenizer')
const parser = require('../src/parser')

test('', () => {
   expect( parser(tokenizer(`声明 变量='a'`))).toBe({})
})
