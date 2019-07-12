const tokenizer = require('../src/tokenizer')
const parser = require('../src/parser')
const compiler = require('../src/compiler')
test('', () => {
    const script = compiler(parser(tokenizer(`声明 变量='a'`))).join('\n')
    console.log(script)
    eval(script)
    expect(script).toBe({})
})
