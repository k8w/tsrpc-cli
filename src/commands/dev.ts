import chalk from "chalk";
import { ChildProcess, spawn } from "child_process";
import chokidar from "chokidar";
import { Stats } from "fs";
import fse from "fs-extra";
import path from "path";
import { i18n } from "../i18n/i18n";
import { CliUtil } from "../models/CliUtil";
import { ProtoUtil } from "../models/ProtoUtil";
import { TsrpcConfig } from "../models/TsrpcConfig";
import { genApiFiles } from "./api";
import { ensureSymlink } from "./link";
import { copyDirReadonly } from "./sync";

const DEFAULT_DELAY = 1000;

export interface CmdDevOptions {
    config: TsrpcConfig
}

export async function cmdDev(options: CmdDevOptions) {
    let conf = options.config;

    const autoProto = conf.dev?.autoProto ?? true;
    const autoSync = conf.dev?.autoSync ?? true;
    const autoApi = conf.dev?.autoApi ?? true;
    const entry = conf.dev?.entry ?? 'src/index.ts';
    const devServerArgs = ['-r', 'ts-node/register', ...(conf.dev?.nodeArgs ?? []), entry];
    const cmdStart = 'node ' + devServerArgs.map(v => /\s/.test(v) ? `'${v}'` : v).join(' ');
    const watchFiles = conf.dev?.watch ?? 'src';

    // Auto Link
    if (conf.sync) {
        let linkConfs = conf.sync.filter(v => v.type === 'symlink');
        for (let item of linkConfs) {
            CliUtil.doing(`${i18n.link} ${item.from} -> ${item.to}`);
            await ensureSymlink(item.from, item.to, options.config.verbose ? console : undefined);
            CliUtil.done(true);
        }
    }

    // Auto Proto
    if (autoProto && conf.proto) {
        for (let confItem of conf.proto) {
            // old
            let old = await ProtoUtil.loadOldProtoByConfigItem(confItem, options.config.verbose);

            const onAutoProtoTrigger = async () => {
                let newProto = await ProtoUtil.genProtoByConfigItem(confItem, old, options.config.verbose, options.config.checkOptimizableProto, true).catch(e => {
                    console.error(chalk.red(e.message));
                    return undefined;
                });

                // Auto Api
                if (autoApi && newProto && confItem.apiDir) {
                    await genApiFiles({
                        proto: newProto,
                        ptlDir: confItem.ptlDir,
                        apiDir: confItem.apiDir
                    })
                }
            }

            delayWatch({
                matches: confItem.ptlDir,
                ignore: [confItem.output, ...(confItem.compatible ? [confItem.compatible] : []), ...(confItem.ignore ?? [])],
                onTrigger: onAutoProtoTrigger,
                delay: conf.dev?.delay ?? DEFAULT_DELAY,
                watchId: `AutoProto_${conf.proto.indexOf(confItem)}`,
            });
            await onAutoProtoTrigger();
        }
    }

    // Auto Copy
    if (autoSync) {
        conf.sync?.forEach((confItem, idx) => {
            if (confItem.type !== 'copy') {
                return;
            }

            let isInited = false;

            delayWatch({
                matches: confItem.from,
                onTrigger: async (eventName: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir', filepath: string, stats?: Stats) => {
                    // 仅第一次全量
                    if (!isInited) {
                        await copyDirReadonly(confItem.from, confItem.to, !!confItem.clean, options.config.verbose ? console : undefined);
                        console.log(chalk.green(`✔ ${i18n.copy} '${confItem.from}' -> '${confItem.to}'`));
                        isInited = true;
                    }
                    // 后续改为增量
                    else {
                        const dstPath = path.resolve(confItem.to, path.relative(confItem.from, filepath));
                        // 删除
                        if (eventName.startsWith('unlink')) {
                            await fse.remove(dstPath)
                        }
                        // 重新复制
                        else {
                            await fse.copy(filepath, dstPath);
                            if (!eventName.endsWith('Dir')) {
                                await fse.chmod(dstPath, 0o444);
                            }
                            console.log(chalk.green(`✔ ${i18n.copy} '${filepath}' -> '${dstPath}'`));
                        }
                    }
                },
                delay: conf.dev?.delay ?? DEFAULT_DELAY,
                watchId: `AutoSync_${idx}`,

            })
        })
    }

    // dev server
    let devServer: ChildProcess | undefined;
    let devServerRestartTimes = 0;
    const startDevServer = async () => {
        let restartTimes = devServerRestartTimes;

        // 延迟一会，如果没有新的重启请求，则执行重启
        await new Promise(rs => setTimeout(rs, 200));
        if (devServerRestartTimes !== restartTimes) {
            return;
        }

        console.log(`${chalk.green(i18n.startDevServer)} ${chalk.cyan(cmdStart)}\n`);
        devServer = spawn('node', devServerArgs, {
            stdio: 'inherit'
        });
        devServer.once('exit', () => {
            console.log(chalk.red.bold(i18n.devServerStopped));
        });
    }
    delayWatch({
        matches: watchFiles,
        onWillTrigger: async () => {
            ++devServerRestartTimes;

            if (devServer) {
                console.log(chalk.yellow(i18n.devServerRestarting))
                // 还在运行中，kill 之
                if (devServer.exitCode == null) {
                    await new Promise(rs => {
                        devServer!.removeAllListeners('exit');
                        devServer!.once('exit', rs);
                        devServer!.kill();
                    });
                }
            }
            devServer = undefined;
        },
        onTrigger: () => {
            startDevServer()
        },
        delay: conf.dev?.delay ?? DEFAULT_DELAY,
        watchId: 'DEV_SERVER',
    })
    startDevServer()
}

function delayWatch(options: {
    matches: string | string[],
    ignore?: string | string[],
    /** 文件已经变化，一段时间后即将触发 */
    onWillTrigger?: (eventName: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir', filepath: string, stats?: Stats) => void | Promise<void>,
    /** 实际触发 */
    onTrigger?: (eventName: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir', filepath: string, stats?: Stats) => void | Promise<void>,
    delay: number,
    watchId: string
}) {
    let timer: ReturnType<typeof setTimeout> | undefined;

    // Real file change handler，禁止并发
    let isProcessing = false;
    const onWillTrigger = async (eventName: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir', filepath: string, stats?: Stats) => {
        if (isProcessing) {
            return;
        }
        isProcessing = true;

        // clear last timer
        if (timer) {
            clearTimeout(timer);
            timer = undefined;
        }
        // 只在此变化循环中，第一次变化时，触发onWillTrigger
        else {
            await options.onWillTrigger?.(eventName, filepath, stats);
        }
        // set new delay timer
        timer = setTimeout(() => {
            timer = undefined;
            options.onTrigger?.(eventName, filepath, stats)
        }, options.delay);

        isProcessing = false;
    }

    chokidar.watch(options.matches, {
        ignored: options.ignore,
        ignoreInitial: true
    }).on('all', onWillTrigger);
}