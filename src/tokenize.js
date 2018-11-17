function tokenize(input) {
    input = input.split('\n').reverse()
    let result = []
    let now = {}
    while (input.length) {
        now = analyze(input.pop())

        switch (now.type) {
            case 'function': {

                while (input.length) {
                    let next = analyze(input.pop())
                    now.children.push(next)
                    if (next.type === '}') {
                        result.push(now)
                        break
                    }
                }
                break
            }
            case 'blank': {
                break
            }
            case 'rawjs': {
                result.push(now)
                break
            }
            default: {
                result.push(now)
                break
            }
        }

    }
    return result

}

function analyze(morpheme) {

    let match

    match = morpheme.match(/^ *$/)
    if (match) {
        return {
            type: 'blank'
        }
    }

    match = morpheme.match(/^ *變量 +([\u4E00-\u9FA5\uF900-\uFA2D]+) *= *(\S+);?/)

    if (match) {
        return {
            type: 'var',
            key: match[1],
            value: match[2]
        }
    }
    match = morpheme.match(/^ *變量 +([\u4E00-\u9FA5\uF900-\uFA2D]+);?/)
    if (match) {
        return ({
            type: 'var',
            key: match[1]
        })
    }
    match = morpheme.match(/^ *函數 +([\u4E00-\u9FA5\uF900-\uFA2D]+) *{?/)
    if (match) {
        return {
            type: 'function',
            key: match[1],
            children: []
        }
    }
    match = morpheme.match(/^ *}/)
    if (match) {
        return {
            type: '}'
        }
    }

    match = morpheme.match(/([\u4E00-\u9FA5\uF900-\uFA2D]+) *\(\)/)
    if (match) {
        return {
            type: 'call',
            key: match[1],
            arguments: match[2] || []
        }
    }
    return {
        type: 'rawjs',
        value: morpheme

    }
}


module.exports = {
    tokenize
}