# CHANGELOG

## [2.0.9-dev.1] - 2021-10-15
### Added
- `TsrpcConfig` 新增 `autoFillNewPtl`，自动填充新建的 `Ptl` 和 `Msg` 文件。
- `npm run dev` 期间，如果删除了 `Ptl`，则自动删除自动创建且未更改的 `Api` 文件。
- Windows 下创建 `Symlink` 无权限时，自动调起授权弹框，如果拒绝则提供选项创建为 `Junction`。
- `link` 时如果目标位置不为空，由询问确认改为自动清空目标。

## [2.0.8] - 2021-10-05
### Fixed
- ServiceProto JSON 无改变但 TS 报错的情况也重新写入文件
- `serviceProto.ts` 代码报错时无法正确 watch Proto 变更的 BUG
- 解析旧 ServiceProto TS 编译报错时，采用正则匹配的方式跳过
- 协议丢失类型日志由 warn 改为 error
- 优化 `tsbuffer-proto-generator` 日志
- `Missing ...` 时改为报错并不生成 ServiceProto
- ServiceProto 生成出错时始终不启动 devServer

## [2.0.5] - 2021-09-30
### Added
- `tsrpc.config.ts` support and `--config` param for commands
- new `tsrpc build` and `tsrpc dev` command
- `index.d.ts`

## [2.0.4] - 2021-07-29
### Changed
- `tsrpc build` preserved `scripts` in `package.json`