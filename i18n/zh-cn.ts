export const i18n = {
    welcome: 'https://npmjs.com/tsrpc\n欢迎进入 TSRPC 实用工具 V${version}',
    help: `
使用说明：

    tsrpc proto <options>                生成TSRPC Proto文件
        -i, --input <folder>                用来生成Proto的协议文件夹路径
        -o, --output <file>                 输出的文件路径，不指定将直接输出到命令行
                                            -o XXX.ts 和 -o XXX.json 将对应输出两种不同的格式
        -c, --compatible <file>             兼容模式：要兼容的旧Proto文件的路径（默认同output）
        -n, --new                           不兼容旧版，生成全新的Proto文件
        -u, --ugly                          输出为可读性较差但体积更小压缩格式
        -v, --verbose                       显示调试信息
    
    tsrpc encode <options> [exp]         编码JS表达式
        [exp]                               要编码的值（JS表达式，例如"123" "new Uint8Array([1,2,3])"）
        -p, --proto <file>                  编码要使用的Proto文件
        -s, --schema <id>                   编码要使用的SchemaID
        -i, --input <file>                  输入为文件，不可与[exp]同用（文件内容为JS表达式）
        -o, --output <file>                 输出的文件路径，不指定将直接输出到命令行
        -v, --verbose                       显示调试信息
                                            
    tsrpc decode <options> [binstr]      解码二进制数据
        [binstr]                            要解码的二进制数据的字符串表示，如"0F A2 E3 F2 D9"
        -p, --proto <file>                  解码要使用的Proto文件
        -s, --schema <id>                   解码要使用的SchemaID
        -i, --input <file>                  输入为文件，不可与[binstr]同用
        -o, --output <file>                 输出的文件路径，不指定将直接输出到命令行
        -v, --verbose                       显示调试信息

    tsrpc validate <options> [exp]       验证JSON数据
        [exp]                               要验证的值（JS表达式，例如"123" "new Uint8Array([1,2,3])"）
        -p, --proto <file>                  验证要使用的Proto文件
        -s, --schema <id>                   验证要使用的SchemaID
        -i, --input <file>                  输入为文件，不可与[exp]同用（文件内容为JS表达式）

    tsrpc show <file>                    打印二进制文件内容
`.trim(),
    example: `
使用示例：

    tsrpc proto -i proto -o proto.ts

    tsrpc encode -p proto.json -s a/b/c/TypeName -o buf.bin "{value: 1}"
    tsrpc decode -p proto.json -s a/b/c/TypeName "01 0A 01"
    tsrpc validate -p proto.json -s a/b/c/TypeName "{value: 1}"
    tsrpc show buf.bin
`.trim(),
    errCmd: '命令格式有误，键入 tsrpc -h 以查看帮助。',
    missingParam: '缺少 ${param} 参数，键入 tsrpc -h 以查看更多信息。',
    inputMustBeFolder: '--input 参数应当为一个文件夹',
    protoSucc: '√ Proto已生成到：${output}',
    fileOpenError: '文件打开失败: ${file}',
    jsParsedError: 'JS表达式解析失败: ${file}',
    protoParsedError: '旧Proto文件解析失败: ${file}',
    expParsedError: '表达式解析失败',
    or: '或',
    and: '和',
    encodeSucc: '√ 编码结果已生成到：${output}',
    decodeSucc: '√ 解码结果已生成到：${output}',
    validateSucc: '√ 验证通过',
    validateFail: '× 验证不通过: ${msg}',
    error: ' 错误 ',
    helpGuide: '键入 tsrpc -h 查看更多帮助信息'
}