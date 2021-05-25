export const i18n = {
    welcome: 'https://npmjs.com/tsrpc\nWelcome to tsrpc utilities V${version}',
    help: `
Usage：

    tsrpc proto <options>                Generate proto file
        -i, --input <file>                  Input TS file (support glob expression)
                                            It would generate all exported types
        -o, --output <file>                 Output file (or print to CLI)
        -c, --compatible <file>             Compatible mode, compatible to old proto (=output by default)
        --new                           Generate fresh new proto (no compatible)
        -u, --ugly                          Output as ugly JSON (no indent and smaller)
        -v, --verbose                       Show debug info
        --ignore <glob>                     Files to be ignored from --input

    tsrpc api <options>                  Generate TSRPC API implementations
        -i, --input <file>                  Proto file path (proto.ts or proto.json)
        -o, --output <folder>               Output api folder path
    
    tsrpc encode <options> [exp]         Encode a JS expression or a file (content is JS expression)
        [exp]                               Expression to encode (e.g. "123" "new Uint8Array([1,2,3])")
        -p, --proto <file>                  Proto file to use
        -s, --schema <id>                   SchemaID (filePath/TypeName)
        -i, --input <file>                  Input file path, alternative to [exp]
        -o, --output <file>                 Output file path (or print to CLI)
        -v, --verbose                       Show debug info
                                            
    tsrpc decode <options> [binstr]      Decode buffer
        [binstr]                            Buffer to decode, hex string, like "0F A2 E3"
        -p, --proto <file>                  Proto file
        -s, --schema <id>                   SchemaID (filePath/TypeName)
        -i, --input <file>                  Input file path, alternative to [binstr]
        -o, --output <file>                 Output file path (or print to CLI)
        -v, --verbose                       Show debug info

    tsrpc validate <options> [exp]       Validate if a JS expression is valid to a schema
        [exp]                               Expression to validate (e.g. "123" "new Uint8Array([1,2,3])")
        -p, --proto <file>                  Proto file to use
        -s, --schema <id>                   SchemaID (filePath/TypeName)
        -i, --input <file>                  Input file path, alternative to [exp]

    tsrpc show <file>                    Show a binary file as hex string
`.trim(),
    example: `
Example：

    tsrpc proto -i proto -o proto.ts

    tsrpc encode -p proto.json -s a/b/c/TypeName -o buf.bin "{value: 1}"
    tsrpc decode -p proto.json -s a/b/c/TypeName "01 0A 01"
    tsrpc validate -p proto.json -s a/b/c/TypeName "{value: 1}"
    tsrpc show buf.bin
`.trim(),
    errCmd: 'Error command, use "tsrpc -h" to see more help info.',
    missingParam: 'Missing parameter ${param}, use "tsrpc -h" to see more help info.',
    inputMustBeFolder: '--input only accept a folder',
    protoSucc: '√ Proto generated to: ${output}',
    fileOpenError: 'Failed to open file: ${file}',
    jsParsedError: 'Failed to parse JS expression from: ${file}',
    protoParsedError: 'Failed to parse old proto: ${file}',
    expParsedError: 'Invalid JS expression',
    or: 'or',
    and: 'and',
    encodeSucc: '√ Encoded succ to: ${output}',
    decodeSucc: '√ Decoded succ to: ${output}',
    apiSucc: '√ Api${apiName} generated: ${apiPath}',
    validateSucc: '√ Validate succ',
    validateFail: '× Validate fail: ${msg}',
    error: ' ERROR ',
    helpGuide: 'Use "tsrpc -h" to see more help info.',
    compatibleError: 'Failed to keep compatible with old proto: \n\t|- ${innerError}',
    canOptimizeByNew: 'WARNING：Compatible with old proto increased encoded buffer size，you can optimize this by parameter '.yellow + '--new'.red + ' , but this may leads to non-compatibility with old proto.'.yellow
}