function compiler(ast) {
    if (Array.isArray(ast)) {
        let node, current = 0,
            result = ['const _={};']
        while (true) {
            node = ast[current++]
            console.log(node)
            if (!node) break
            if (node.type === 'assignment') {
                result.push(`_['${node.name.value}'] = ${node.value.value};`)
            }
        }
        return result
    } else if (typeof ast === 'object') {
        if (ast.type === 'Program') {
            return compiler(ast.body)
        }
    }
}

module.exports = compiler
