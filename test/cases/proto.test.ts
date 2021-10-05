import assert from "assert";
import chalk from "chalk";
import { execSync, spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import process from "process";
import { i18n } from '../../src/i18n/i18n';
import { ProtoUtil } from '../../src/models/ProtoUtil';
import { formatStr } from '../../src/models/util';

describe('proto', function () {
    before(function () {
        const ctx = new chalk.Instance({ level: 0 });
    })

    it('with config (absolute path)', function () {
        fs.rmSync(path.resolve(__dirname, '../output'), { recursive: true, force: true });
        process.chdir(path.resolve(__dirname, '../../'));

        let res = execSync(`node -r ts-node/register src/index.ts proto --config test/configs/absolutePath.ts`);
        assert.strictEqual(res.toString(), [
            path.resolve(__dirname, '../output/proto/serviceProto.ts'),
            path.resolve(__dirname, '../output/proto/serviceProto1.ts'),
        ].map(v => formatStr(i18n.protoSucc, { output: v })).join('\n') + '\n')
    })

    it('with config (relative path)', function () {
        fs.rmSync(path.resolve(__dirname, '../output'), { recursive: true, force: true });
        process.chdir(path.resolve(__dirname, '../'));

        let res = execSync(`node -r ts-node/register ../src/index.ts proto --config configs/relativePath.config.ts`);
        assert.strictEqual(res.toString(), [
            path.resolve(__dirname, '../output/proto/serviceProto.ts'),
            path.resolve(__dirname, '../output/proto/serviceProto1.ts'),
        ].map(v => formatStr(i18n.protoSucc, { output: v })).join('\n') + '\n')
    })

    it('without config', async function () {
        fs.rmSync(path.resolve(__dirname, '../output'), { recursive: true, force: true });
        process.chdir(path.resolve(__dirname, '../'));

        let res = spawnSync('node', ['-r', 'ts-node/register', '../src/index.ts', 'proto', '--input', 'protocols', '--output', 'output/proto/serviceProto.ts']);
        assert.strictEqual(res.stdout.toString(), formatStr(i18n.protoSucc, { output: path.resolve(__dirname, '../output/proto/serviceProto.ts') }) + '\n');
        // assert.strictEqual(res.stderr.toString(), formatStr(i18n.canOptimizeByNew, { filename: 'serviceProto.ts' }) + '\n');
    })

    it('compatible (without config)', async function () {
        process.chdir(path.resolve(__dirname, '../'));

        let proto = await ProtoUtil.loadServiceProto('output/proto/serviceProto.ts');
        assert.deepStrictEqual(proto, {
            "services": [
                {
                    "id": 0,
                    "name": "a/b/c/Test",
                    "type": "api"
                },
                {
                    "id": 1,
                    "name": "Chat",
                    "type": "msg"
                },
                {
                    "id": 2,
                    "name": "Test",
                    "type": "api"
                }
            ],
            "types": {
                "a/b/c/PtlTest/ReqTest": {
                    "type": "Interface",
                    "properties": [
                        {
                            "id": 0,
                            "name": "name",
                            "type": {
                                "type": "String"
                            }
                        }
                    ]
                },
                "a/b/c/PtlTest/ResTest": {
                    "type": "Interface",
                    "properties": [
                        {
                            "id": 0,
                            "name": "reply",
                            "type": {
                                "type": "String"
                            }
                        },
                        {
                            "id": 1,
                            "name": "chat",
                            "type": {
                                "type": "Reference",
                                "target": "MsgChat/MsgChat"
                            },
                            "optional": true
                        }
                    ]
                },
                "MsgChat/MsgChat": {
                    "type": "Interface",
                    "properties": [
                        {
                            "id": 0,
                            "name": "channel",
                            "type": {
                                "type": "Number"
                            }
                        },
                        {
                            "id": 1,
                            "name": "userName",
                            "type": {
                                "type": "String"
                            }
                        },
                        {
                            "id": 2,
                            "name": "content",
                            "type": {
                                "type": "String"
                            }
                        },
                        {
                            "id": 3,
                            "name": "time",
                            "type": {
                                "type": "Number"
                            }
                        }
                    ]
                },
                "PtlTest/ReqTest": {
                    "type": "Interface",
                    "properties": [
                        {
                            "id": 0,
                            "name": "name",
                            "type": {
                                "type": "String"
                            }
                        }
                    ]
                },
                "PtlTest/ResTest": {
                    "type": "Interface",
                    "properties": [
                        {
                            "id": 0,
                            "name": "reply",
                            "type": {
                                "type": "String"
                            }
                        }
                    ]
                }
            }
        })

        proto.services = [
            {
                "id": 140,
                "name": "Test",
                "type": "api"
            }
        ];
        await ProtoUtil.outputProto({
            protocolDir: path.resolve(__dirname, '../protocols'),
            newProtoPath: path.resolve(__dirname, '../output/proto/serviceProto.ts'),
            proto: proto
        });

        let res = spawnSync('node', ['-r', 'ts-node/register', '../src/index.ts', 'proto', '--input', 'protocols', '--output', 'output/proto/serviceProto.ts']);
        assert.strictEqual(res.stdout.toString(),
            formatStr(i18n.protoSucc, { output: path.resolve(__dirname, '../output/proto/serviceProto.ts') })
            + '\n'
        );
        assert.strictEqual(res.stderr.toString(), i18n.canOptimizeByNew(path.resolve(__dirname, '../output/proto/serviceProto.ts')) + '\n\n');

        let proto1 = await ProtoUtil.loadServiceProto(path.resolve(__dirname, '../output/proto/serviceProto.ts'));
        assert.deepStrictEqual(proto1?.services, [
            {
                "id": 141,
                "name": "a/b/c/Test",
                "type": "api"
            },
            {
                "id": 142,
                "name": "Chat",
                "type": "msg"
            },
            {
                "id": 140,
                "name": "Test",
                "type": "api"
            }
        ])
    });
})