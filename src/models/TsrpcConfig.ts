export interface TsrpcConfig {
    /** 
     * `tsrpc proto` 命令的创建的 ServiceProto
     * 一条记录对应一份 ServiceProto
     */
    proto?: {
        /**
         * protocols 协议目录
         */
        ptlDir: string,
        /**
         * 生成协议时忽略的文件（Glob表达式）
         */
        ignore?: string | string[],
        /**
         * 输出的 ServiceProto文件名，例如 `src/shared/protocols/serviceProto.ts`
         * 扩展名可为 `.ts` 或 `.json`
         */
        output: `${string}`,
        /**
         * 该 ServiceProto 对应的 API 目录，则可通过 `npx tsrpc api` 自动生成对应的 API 文件。
         * 例如 `src/api`
         */
        apiDir?: string,
        /**
         * 生成 ServiceProto 时，要兼容的上一版 ServiceProto 的路径。
         * @defaultValue 同 `output`，即原地兼容旧版同名文件。
         * false 代表关闭兼容模式，总是生成全新的 ServiceProto
         */
        compatible?: string,
    }[],

    /**
     * `tsrpc sync` 命令的相关配置
     */
    sync?: {
        /** 共享代码目录的源，例如 `src/shared` */
        from: string,
        /** 共享代码目录要同步至的位置，例如 `../frontend/src/shared` */
        to: string,
        /**
         * 共享代码目录的同步方式
         * - symlink: 通过 Symlink 自动同步，推荐使用此方式。
         * - copy：通过 `npx tsrpc sync` 命令手动将源目录复制粘贴到目标位置，并将目标位置设为只读。
         */
        type: 'symlink' | 'copy'
    }[],

    /**
     * `tsrpc dev` 命令的相关配置
     */
    dev?: {
        /**
         * 当协议文件发生变动时，是否自动重新生成 ServiceProto
         * @defaultValue true
         */
        proto?: boolean,
        /**
         * 当共享目录内文件变动时，是否自动同步到目标位置（仅对 `type: 'copy'` 的项生效）
         * @defaultValue true
         */
        sync?: boolean,
        /**
         * 自动重新生成 ServiceProto 后，是否自动生成新的 API 文件
         * @defaultValue true
         */
        api?: boolean,
        /**
         * 当这些文件（Glob 表达式）变化时，重启本地服务
         */
        watchFiles?: string | string[],
        /**
         * 重启本地服务时使用的命令
         * @defaultValue `ts-node "src/index.ts"`
         */
        cmd?: string,
    },

    /**
     * `tsrpc build` 命令的相关配置
     */
    build?: {
        /** 构建前是否重新生成 ServiceProto */
        proto?: boolean,
        /** 构建时重新生成 ServiceProto 后，是否立即同步到目标位置（仅对 `type: 'copy'` 的项生效） */
        sync?: boolean,
        /**
         * 自动重新生成 ServiceProto 后，是否自动生成新的 API 文件
         * @defaultValue true
         */
        api?: boolean,
    },

    /**
     * 在控制台显示详细的调试信息
     * @defaultValue false
     */
    verbose?: boolean,
}