# CHANGELOG

## [2.0.8] - 2021-10-05
### Fixed
- ServiceProto JSON 无改变但 TS 报错的情况也重新写入文件
- `serviceProto.ts` 代码报错时无法正确 watch Proto 变更的 BUG
- 解析旧 ServiceProto TS 编译报错时，采用正则匹配的方式跳过
- 协议丢失类型日志由 warn 改为 error

## [2.0.5] - 2021-09-30
### Added
- `tsrpc.config.ts` support and `--config` param for commands
- new `tsrpc build` and `tsrpc dev` command
- `index.d.ts`

## [2.0.4] - 2021-07-29
### Changed
- `tsrpc build` preserved `scripts` in `package.json`