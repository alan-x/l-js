function compile(ast) {
    let result = 'var arguments={};'
    ast = ast.reverse()
    while (ast.length) {
        result += toSource(ast.pop())
    }

    return result
}

function toSource(token) {
    let result = ''
    switch (token.type) {
        case 'var': {
            result += `arguments['${token.key}']`
            if (token.value) {
                result += `=${token.value}`
            }
            result += ';'
            break
        }
        case 'rawjs': {
            result += `${token.value.trim()};`
            break
        }
        case 'function': {
            result += `arguments['${token.key}']=function(){var arguments={};`
            let children = token.children.reverse()
            while (children.length) {
                result += toSource(children.pop())
            }
            break
        }
        case '}': {
            result += '};'
            break
        }
        case 'call': {
            result += `arguments['${token.key}']();`
        }
    }
    return result
}

module.exports = {
    compile
}