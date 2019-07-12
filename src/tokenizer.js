const keyword = [
    '声明', '常量', '变量', '函数',
]

function tokenizer(input) {
    let row = 1, col = 0, current = 0,
        morpheme = '', tokens = [], token = ''

    while (true) {
        morpheme = input[current++]

        if (morpheme === undefined) {
            break
        }

        if (morpheme.match(/\t\n\r\f\0x20/)) {
            continue
        }

        if (morpheme && morpheme.match(/[\u4e00-\u9fa5]/)) {
            token = morpheme
            while (true) {
                morpheme = input[current++]
                if (morpheme === undefined) break;

                if (morpheme && morpheme.match(/[\u4e00-\u9fa5]/)) {
                    token += morpheme
                } else {
                    if (token === '声明') {
                        tokens.push({
                            type: 'var',
                        })
                    } else {
                        tokens.push({
                            type: 'identity',
                            value: token
                        })
                    }
                    break
                }
            }
        }

        if (morpheme && morpheme.match(/=/)) {
            tokens.push({
                type: 'assignment'
            })
            continue
        }

        if (morpheme && morpheme.match(/['"]/)) {
            token = ''
            while (true) {
                morpheme = input[current++]
                if (morpheme === undefined) break;
                if (!morpheme.match(/['"]/)) {
                    token += morpheme
                } else {
                    tokens.push({
                        type: 'literal',
                        value: `'${token}'`
                    })
                    break;
                }
            }
        }

        if (morpheme && morpheme.match(/[1-9]/)) {
            token = ''
            while (true) {
                morpheme = input[current++]
                if (morpheme === undefined) break;
                if (!morpheme.match([0 - 9])) {
                    token += morpheme
                } else {
                    tokens.push({
                        type: 'literal',
                        value: +token
                    })
                    break;
                }
            }
        }
    }
    return tokens
}

module.exports = tokenizer
