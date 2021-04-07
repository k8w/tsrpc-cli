TSRPC
===

[EN](README.md) / 中文

[TSRPC](https://npmjs.com/tsrpc) 命令行使用工具

## 安装
```
npm i -g tsrpc-cli
```

# 示例
### 生成Proto
```
tsrpc proto -i shared/protocols -o shared/protocols/proto.ts
```

### 编码测试
```
tsrpc encode -p proto.json -s a/b/c/TypeName "{value: 1}"
tsrpc encode -p proto.ts -s a/b/c/TypeName "{value: 1}" -o buf.bin 
```

### 解码测试
```
tsrpc decode -p proto.json -s a/b/c/TypeName "01 0A 01"
tsrpc decode -p proto.json -s a/b/c/TypeName -i buf.bin
```

### 类型验证
```
tsrpc validate -p proto.json -s a/b/c/TypeName "{value: 1}"
tsrpc validate -p proto.json -s a/b/c/TypeName -i value.js
```

### 显示二进制文件
```
tsrpc show buf.bin
```

## 命令行参数说明
```
tsrpc proto <options>                生成TSRPC Proto文件
    -i, --input <folder>                用来生成Proto的协议文件夹路径
    -o, --output <file>                 输出的文件路径，不指定将直接输出到命令行
                                        -o XXX.ts 和 -o XXX.json 将对应输出两种不同的格式
    -c, --compatible <file>             兼容模式：要兼容的旧Proto文件的路径（默认同output）
    -n, --new                           不兼容旧版，生成全新的Proto文件
    -u, --ugly                          输出为可读性较差但体积更小压缩格式
    -v, --verbose                       显示调试信息
    --ignore <glob>                     从--input范围中要忽略的文件

tsrpc api <options>                  自动生成TSRPC API实现
    -i, --input <file>                  Proto文件的路径
    -o, --output <folder>               输出的API文件夹路径

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
```