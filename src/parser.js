function parser(tokens) {
    let current = 1, token = tokens[0],
        ast = {
            type: "Program",
            body: []
        }
    while (current <= tokens.length) {
        if (token.type === 'var') {
            const name = tokens[current]
            const assignment = tokens[current + 1]
            const value = tokens[current + 2]
            if (name.type === 'identity' && assignment.type === 'assignment' && value.type === 'literal') {
                ast.body.push({
                    type: 'assignment',
                    name,
                    value
                })
            }
        }
        break;
    }

    return ast
}

module.exports = parser
