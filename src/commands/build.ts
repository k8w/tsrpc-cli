import childProcess from "child_process";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import { i18n } from "../i18n/i18n";
import { CliUtil } from "../models/CliUtil";
import { error } from "../models/util";
import { genProto, outputProto } from "./proto";

export interface CmdBuildOptions {
    /** --proto 默认 src/shared/protocols/serviceProto.ts */
    protoFile: string | undefined
    /** --proto-dir 默认 path.dirname(protoFile) */
    protoDir: string | undefined,
}

export async function cmdBuild(options: CmdBuildOptions) {
    // check proto
    let protoFile = options.protoFile ?? 'src/shared/protocols/serviceProto.ts';
    let protoDir = options.protoDir ?? path.dirname(protoFile);
    if (process.stdin.isTTY && fs.existsSync(protoDir) && fs.existsSync(protoFile) && fs.statSync(protoDir).isDirectory()) {
        // 检测是否协议变更，只生成不输出
        CliUtil.doing('Check serviceProto');
        let resGenProto = await genProto({
            input: protoDir,
            output: undefined,
            compatible: protoFile,
            ugly: undefined,
            new: undefined,
            ignore: undefined,
            verbose: undefined
        });
        CliUtil.done();

        if (resGenProto.isChanged) {
            // 询问：检测到协议变更，是否重新生成 ServiceProto？Y/n
            let ifUpdateProto: boolean = (await inquirer.prompt({
                type: 'confirm',
                message: i18n.ifUpdateProto,
                default: true,
                name: 'res'
            })).res;
            if (ifUpdateProto) {
                // 询问：生成成功，是否立即同步（npm run sync）？ Y/n
                let ifSyncNow: boolean = (await inquirer.prompt({
                    type: 'confirm',
                    message: i18n.ifSyncNow,
                    default: true,
                    name: 'res'
                })).res;

                CliUtil.doing('Update serviceProto');
                outputProto({
                    input: protoDir,
                    output: protoFile,
                    ugly: undefined,
                    proto: resGenProto.newProto
                })
                CliUtil.done();

                if (ifSyncNow) {
                    CliUtil.doing('npm run sync');
                    let res = await new Promise<void>((rs, rj) => {
                        let cp = childProcess.spawn('npm', ['run', 'sync'], {
                            stdio: 'inherit',
                            shell: true
                        });
                        // cp.std
                        cp.on('close', code => {
                            code === 0 ? rs() : rj(new Error(i18n.syncFailed));
                        })
                    });
                    CliUtil.done(true)
                }
            }
        }
    }

    // clean
    CliUtil.doing('Clean "dist"');
    fs.rmSync('dist', { force: true, recursive: true });
    CliUtil.done();

    // tsc
    CliUtil.doing('Build TypeScript', '...');
    await new Promise<void>((rs, rj) => {
        let cp = childProcess.spawn('npx', ['tsc'], {
            stdio: 'inherit',
            shell: true
        });
        // cp.std
        cp.on('close', code => {
            if (code) {
                CliUtil.clear();
                rj(error(i18n.codeError));
            }
            else {
                rs();
            }
        })
    });
    CliUtil.done();

    // Copy files
    CliUtil.doing('Copy files');
    fs.copyFileSync('package-lock.json', 'dist/package-lock.json');
    // package.json
    let packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
    packageJSON.scripts = {
        start: packageJSON.scripts.start ?? 'node index.js'
    };
    fs.writeFileSync('dist/package.json', JSON.stringify(packageJSON, null, 2), 'utf-8');
    CliUtil.done();

    console.log('\n' + i18n.success.bgGreen.white);
}