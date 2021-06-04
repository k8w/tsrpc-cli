export const i18nZhCn = {
    welcome: 'https://npmjs.com/tsrpc\n欢迎进入 TSRPC 实用工具 V${version}',
    help: `
使用说明：

    tsrpc proto <options>                生成TSRPC Proto文件
        -i, --input <folder>                用来生成Proto的协议文件夹路径
        -o, --output <file>                 输出的文件路径，不指定将直接输出到命令行
                                            -o XXX.ts 和 -o XXX.json 将对应输出两种不同的格式
        -c, --compatible <file>             兼容模式：要兼容的旧Proto文件的路径（默认同output）
        --new                               不兼容旧版，生成全新的Proto文件
        --ugly                              输出为可读性较差但体积更小压缩格式
        --verbose                           显示调试信息
        --ignore <glob>                     从--input范围中要忽略的文件

    tsrpc api <options>                  自动生成TSRPC API实现
        -i, --input <file>                  Proto文件的路径
        -o, --output <folder>               输出的API文件夹路径

    tsrpc sync --from <dir> --to <dir>   同步文件夹内容，以只读方式同步到目标位置

    tsrpc link --from <dir> --to <dir>   在目标位置创建到源的 Symlink，以实现自动同步

    tsrpc build <options>                构建 TSRPC 后端项目
        --proto <protoPath>                 proto 文件地址，默认为 src/shared/protocols/serviceProto.ts
        --proto-dir <folder>                protocols 目录，默认为 serviceProto.ts 所在目录
    
    tsrpc encode <options> [exp]         编码JS表达式
        [exp]                               要编码的值（JS表达式，例如"123" "new Uint8Array([1,2,3])"）
        -p, --proto <file>                  编码要使用的Proto文件
        -s, --schema <id>                   编码要使用的SchemaID
        -i, --input <file>                  输入为文件，不可与[exp]同用（文件内容为JS表达式）
        -o, --output <file>                 输出的文件路径，不指定将直接输出到命令行
        --verbose                           显示调试信息
                                            
    tsrpc decode <options> [binstr]      解码二进制数据
        [binstr]                            要解码的二进制数据的字符串表示，如"0F A2 E3 F2 D9"
        -p, --proto <file>                  解码要使用的Proto文件
        -s, --schema <id>                   解码要使用的SchemaID
        -i, --input <file>                  输入为文件，不可与[binstr]同用
        -o, --output <file>                 输出的文件路径，不指定将直接输出到命令行
        --verbose                           显示调试信息

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

    tsrpc encode -p proto.ts -s a/b/c/TypeName -o buf.bin "{value: 1}"
    tsrpc decode -p proto.ts -s a/b/c/TypeName "01 0A 01"
    tsrpc validate -p proto.ts -s a/b/c/TypeName "{value: 1}"
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
    apiSucc: '√ Api${apiName} 生成成功: ${apiPath}',
    validateSucc: '√ 验证通过',
    validateFail: '× 验证不通过: ${msg}',
    error: ' 错误 ',
    success: ' 成功 ',
    helpGuide: '键入 tsrpc -h 查看更多帮助信息',
    compatibleError: '兼容旧Proto失败: ${innerError}',
    canOptimizeByNew: '检测到 ${filename} 中存在冗余（可能轻微增加传输体积），删除该文件然后重新生成即可优化，但可能导致对旧协议的不兼容。'.yellow,
    dirNotExists: '文件夹不存在: ${dir}',
    codeError: 'TypeScript 构建失败，请检查代码报错',
    ifUpdateProto: '检测到协议变更，是否重新生成 ServiceProto？',
    ifSyncNow: '生成后执行同步（npm run sync）吗？',
    syncFailed: '执行 "npm run sync" 失败, 你可以手动完成同步。',
    targetExists: '目标 ${target} 已存在，请删除后再重试。',
    deleteConfirm: '${target} 已经存在，是否删除再继续？',
    canceled: '已取消'
}