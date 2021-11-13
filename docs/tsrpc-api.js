var tsrpcAPI = {
  "version": "1.0.0",
  "servers": [
    "http://localhost:3000"
  ],
  "apis": [
    {
      "path": "/admin/ActionStat",
      "title": " Admin-管理后台埋点",
      "req": {
        "ts": "interface ReqReqActionStat {\r\n    /** 后台行为 */\r\n    action: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResActionStat {\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/admin/AdminLogList",
      "title": "Admin-管理员操作日志列表",
      "req": {
        "ts": "interface ReqReqAdminLogList {\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResAdminLogList {\r\n    /**\r\n    * 日志list\r\n    * _id: 唯一id\r\n    * action: 管理员行为\r\n    */\r\n    logList: ({\r\n        _id: string,\r\n        action: string\r\n    } & {\r\n        /** 用户 uid */\r\n        userId: string,\r\n        /** 用户名称 */\r\n        userName: string,\r\n        /** 真是姓名 */\r\n        realName: string,\r\n        /** 最近登录时间 */\r\n        time: string\r\n    })[],\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/admin/AdminOutLogin",
      "title": "Admin-后台退出登录",
      "req": {
        "ts": "interface ReqReqAdminOutLogin {\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResAdminOutLogin {\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/admin/AdminUserInfo",
      "title": "Admin-获取管理员信息",
      "req": {
        "ts": "interface ReqReqAdminUserInfo {\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResAdminUserInfo {\r\n    /**\r\n    * userId: 用户uid\r\n    * userName: 用户名称\r\n    * realName: 真实姓名\r\n    * avatar: 头像\r\n    * roles: 管理员角色\r\n    * useModule: 权限list\r\n    * time: 最近登录时间\r\n    */\r\n    adminUserInfo: {\r\n        /** 用户 uid */\r\n        userId: string,\r\n        /** 用户名称 */\r\n        userName: string,\r\n        /** 真是姓名 */\r\n        realName: string,\r\n        /** 头像 */\r\n        avatar?: string,\r\n        /** 权限规则 */\r\n        roles: string,\r\n        /** 开放功能 */\r\n        useModule: string[],\r\n        /** 最近登录时间 */\r\n        time: string\r\n    },\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/admin/CreateAdminUser",
      "title": "Admin -保存管理员用户信息",
      "req": {
        "ts": "interface ReqReqCreateAdminUser {\r\n    /** 账号 */\r\n    account: string,\r\n    /** 密码 */\r\n    password: string,\r\n    /** 用户名称 */\r\n    userName: string,\r\n    /** 真是用户名 */\r\n    realName: string,\r\n    /** 头像 */\r\n    avatar?: string,\r\n    /** 权限规则 */\r\n    roles: string,\r\n    /** 开放功能 */\r\n    useModule: string[],\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResCreateAdminUser {\r\n    /** 成功失败 */\r\n    msg: string,\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/admin/EditAdminInfo",
      "title": "Admin-修改管理员信息",
      "req": {
        "ts": "interface ReqReqEditAdminInfo {\r\n    /**\r\n    * account: 账号\r\n    * password: 密码\r\n    * userId: 用户uid\r\n    * userName: 用户名称\r\n    * realName: 真实姓名\r\n    * avatar: 头像\r\n    * roles: 管理员角色\r\n    * useModule: 权限list\r\n    */\r\n    adminInfo: {\r\n        account: string,\r\n        password: string,\r\n        /** 用户 uid */\r\n        userId: string,\r\n        /** 用户名称 */\r\n        userName: string,\r\n        /** 真是姓名 */\r\n        realName: string,\r\n        /** 头像 */\r\n        avatar?: string,\r\n        /** 权限规则 */\r\n        roles: string,\r\n        /** 开放功能 */\r\n        useModule: string[]\r\n    },\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResEditAdminInfo {\r\n    /** 状态 */\r\n    msg: string,\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/admin/GetAdminList",
      "title": "Admin-管理员列表",
      "req": {
        "ts": "interface ReqReqGetAdminList {\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetAdminList {\r\n    /**\r\n    * account: 账号\r\n    * password: 密码\r\n    * userId: 用户uid\r\n    * userName: 用户名称\r\n    * realName: 真实姓名\r\n    * avatar: 头像\r\n    * roles: 管理员角色\r\n    * useModule: 权限list\r\n    * time: 最新登录时间\r\n    */\r\n    adminList: {\r\n        account: string,\r\n        password: string,\r\n        /** 用户 uid */\r\n        userId: string,\r\n        /** 用户名称 */\r\n        userName: string,\r\n        /** 真是姓名 */\r\n        realName: string,\r\n        /** 头像 */\r\n        avatar?: string,\r\n        /** 权限规则 */\r\n        roles: string,\r\n        /** 开放功能 */\r\n        useModule: string[],\r\n        /** 最近登录时间 */\r\n        time: string\r\n    }[],\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/admin/Login",
      "title": "Admin-控制后台登陆接口",
      "req": {
        "ts": "interface ReqReqLogin {\r\n    account: string,\r\n    password: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResLogin {\r\n    sso: string\r\n}"
      }
    },
    {
      "path": "/content/ContentMainEvent",
      "title": "Content-内容事件",
      "req": {
        "ts": "interface ReqReqContentMainEvent {\r\n    /** 内容唯一id */\r\n    mainClassId: string,\r\n    /** 操作行为 */\r\n    type: \"state\" | \"del\" | \"populer\",\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResContentMainEvent {\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/content/GetContentMainList",
      "title": "Content-获取内容list",
      "req": {
        "ts": "interface ReqReqGetContentMainList {\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetContentMainList {\r\n    /**\r\n    * id: 内容唯一id\r\n    * city: 城市\r\n    * longitude: 城市坐标\r\n    * isCharge: 是否免费\r\n    * state: 是否开启\r\n    * populer: 是否热门\r\n    */\r\n    list: ({\r\n        title: string,\r\n        address: string,\r\n        longitude: string,\r\n        time: string,\r\n        tickets: string,\r\n        tags: string[],\r\n        isCharge: boolean,\r\n        amount?: number,\r\n        avgAmount?: number,\r\n        carouselImages: string[],\r\n        content: string,\r\n        state: true | false,\r\n        populer?: true | false,\r\n        sso?: string\r\n    } & {\r\n        id: string,\r\n        city: string,\r\n        longitude: string,\r\n        isCharge: boolean,\r\n        state: boolean,\r\n        populer?: boolean\r\n    })[],\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/content/GetMainClassCityList",
      "title": "Content-获取城市list",
      "req": {
        "ts": "interface ReqReqGetMainClassCityList {\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetMainClassCityList {\r\n    /** 城市list */\r\n    list: string[],\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/content/GetMainClassInfo",
      "title": "Content-获取内容信息",
      "req": {
        "ts": "interface ReqReqGetMainClassInfo {\r\n    /** 内容标题 */\r\n    title?: string,\r\n    /** 内容唯一id */\r\n    mainClassId?: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetMainClassInfo {\r\n    /** city: 城市 */\r\n    info: ({\r\n        title: string,\r\n        address: string,\r\n        longitude: string,\r\n        time: string,\r\n        tickets: string,\r\n        tags: string[],\r\n        isCharge: boolean,\r\n        amount?: number,\r\n        avgAmount?: number,\r\n        carouselImages: string[],\r\n        content: string,\r\n        state: true | false,\r\n        populer?: true | false,\r\n        sso?: string\r\n    } & {\r\n        city: string\r\n    }) | undefined,\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/content/GetMainClassList",
      "title": "Content-获取内容标题list",
      "req": {
        "ts": "interface ReqReqGetMainClassList {\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetMainClassList {\r\n    /** 标题list */\r\n    list: {\r\n        _id: string,\r\n        title: string\r\n    }[],\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/content/GetSubClassList",
      "title": "Content-获取子类列表",
      "req": {
        "ts": "interface ReqReqGetSubClassList {\r\n    mainClassId: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetSubClassList {\r\n    /**\r\n    * subId: 子类唯一id\r\n    * title: 子类名称\r\n    */\r\n    list: {\r\n        /** 子类唯一id */\r\n        subId?: string,\r\n        /** 子类名称 */\r\n        title: string\r\n    }[],\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/content/GetValueClassInfo",
      "title": "Content-获取子类内容",
      "req": {
        "ts": "interface ReqReqGetValueClassInfo {\r\n    /** 子类内容唯一id */\r\n    valueClassId: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetValueClassInfo {\r\n    /** 子类信息 */\r\n    info: {\r\n        valueTitleId?: string,\r\n        imagesList: string[],\r\n        videosList: string[],\r\n        valueTitle: string,\r\n        sso?: string\r\n    } | undefined,\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/content/GetValueClassList",
      "title": "Content-获取子类内容lsit",
      "req": {
        "ts": "interface ReqReqGetValueClassList {\r\n    mainClassId: string,\r\n    subClassId: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetValueClassList {\r\n    /** 子类list */\r\n    list: {\r\n        _id: string,\r\n        title: string\r\n    }[],\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/content/SaveMainClass",
      "title": "Content-保存内容",
      "req": {
        "ts": "interface ReqReqSaveMainClass {\r\n    title: string,\r\n    address: string,\r\n    longitude: string,\r\n    time: string,\r\n    tickets: string,\r\n    tags: string[],\r\n    isCharge: boolean,\r\n    amount?: number,\r\n    avgAmount?: number,\r\n    carouselImages: string[],\r\n    content: string,\r\n    state: true | false,\r\n    populer?: true | false,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResSaveMainClass {\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/content/SaveSubClass",
      "title": "Contnet-保存子类配置",
      "req": {
        "ts": "interface ReqReqSaveSubClass {\r\n    mainClassId: string,\r\n    subClassList: {\r\n        /** 子类唯一id */\r\n        subId?: string,\r\n        /** 子类名称 */\r\n        title: string\r\n    }[],\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResSaveSubClass {\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/content/SaveValueClass",
      "title": "Content-保存子类具体内容信息",
      "req": {
        "ts": "interface ReqReqSaveValueClass {\r\n    valueTitleId?: string,\r\n    mainClassId: string,\r\n    subClassId: string,\r\n    imagesList: string[],\r\n    videosList: string[],\r\n    valueTitle: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResSaveValueClass {\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/content/TagsEvent",
      "title": "Content-标签事件",
      "req": {
        "ts": "interface ReqReqTagsEvent {\r\n    /** 标签唯一id */\r\n    _id: string,\r\n    /** 标签内容 */\r\n    tag: string,\r\n    /** 标签事件 */\r\n    action: \"create\" | \"update\" | \"delete\" | \"list\",\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResTagsEvent {\r\n    /** 返回标签list */\r\n    list?: {\r\n        /** 标签唯一id */\r\n        _id: string,\r\n        /** 标签内容 */\r\n        tag: string,\r\n        sso?: string\r\n    }[],\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/main/GetMainCfgList",
      "title": "Main-获取首页内容配置",
      "req": {
        "ts": "interface ReqReqGetMainCfgList {\r\n    /**\r\n    * scroll: 轮播图\r\n    * city: 城市信息\r\n    */\r\n    mainCfgType: \"scroll\" | \"city\",\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetMainCfgList {\r\n    /** list */\r\n    list: (({\r\n        mainClassId: string,\r\n        scrollImg: string,\r\n        state: boolean,\r\n        sso?: string\r\n    } | {\r\n        /** 城市 */\r\n        city: string,\r\n        /** 海报图 */\r\n        poster: string,\r\n        /** 是否开启 */\r\n        state: boolean,\r\n        /** 权重 */\r\n        weights: number,\r\n        sso?: string\r\n    }) & {\r\n        /** 更细时间 */\r\n        updateTime: string\r\n    })[],\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/main/GetMainClassCityPoster",
      "title": "Main-获取首页城市海报配置",
      "req": {
        "ts": "interface ReqReqGetMainClassCityPoster {\r\n    /** 城市 */\r\n    city: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetMainClassCityPoster {\r\n    /** 海报信息 */\r\n    info?: {\r\n        /** 城市 */\r\n        city: string,\r\n        /** 海报图 */\r\n        poster: string,\r\n        /** 是否开启 */\r\n        state: boolean,\r\n        /** 权重 */\r\n        weights: number,\r\n        sso?: string\r\n    },\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/main/GetMainClassScrollImg",
      "title": "Main-获取首页轮播图细信息",
      "req": {
        "ts": "interface ReqReqGetMainClassScrollImg {\r\n    mainClassId: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetMainClassScrollImg {\r\n    /** 轮播图信息 */\r\n    info?: {\r\n        mainClassId: string,\r\n        scrollImg: string,\r\n        state: boolean,\r\n        sso?: string\r\n    },\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/main/SaveMainClassCityPoster",
      "title": "Main-保存首页城市海报图配置",
      "req": {
        "ts": "interface ReqReqSaveMainClassCityPoster {\r\n    /** 城市 */\r\n    city: string,\r\n    /** 海报图 */\r\n    poster: string,\r\n    /** 是否开启 */\r\n    state: boolean,\r\n    /** 权重 */\r\n    weights: number,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResSaveMainClassCityPoster {\r\n    sso?: string\r\n}"
      }
    },
    {
      "path": "/main/SaveMainClassScrollImg",
      "title": "Main-保存轮播图配置",
      "req": {
        "ts": "interface ReqReqSaveMainClassScrollImg {\r\n    mainClassId: string,\r\n    scrollImg: string,\r\n    state: boolean,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResSaveMainClassScrollImg {\r\n    sso?: string\r\n}"
      }
    }
  ],
  "schemas": {
    "admin/PtlActionStat/ReqActionStat": {
      "ts": "interface ReqReqActionStat {\r\n    /** 后台行为 */\r\n    action: string,\r\n    sso?: string\r\n}"
    },
    "Base/BaseRequest": {
      "ts": "interface ReqBaseRequest {\r\n    sso?: string\r\n}"
    },
    "admin/PtlActionStat/ResActionStat": {
      "ts": "interface ReqResActionStat {\r\n    sso?: string\r\n}"
    },
    "Base/BaseResponse": {
      "ts": "interface ReqBaseResponse {\r\n    sso?: string\r\n}"
    },
    "admin/PtlAdminLogList/ReqAdminLogList": {
      "ts": "interface ReqReqAdminLogList {\r\n    sso?: string\r\n}"
    },
    "admin/PtlAdminLogList/ResAdminLogList": {
      "ts": "interface ReqResAdminLogList {\r\n    /**\r\n    * 日志list\r\n    * _id: 唯一id\r\n    * action: 管理员行为\r\n    */\r\n    logList: ({\r\n        _id: string,\r\n        action: string\r\n    } & {\r\n        /** 用户 uid */\r\n        userId: string,\r\n        /** 用户名称 */\r\n        userName: string,\r\n        /** 真是姓名 */\r\n        realName: string,\r\n        /** 最近登录时间 */\r\n        time: string\r\n    })[],\r\n    sso?: string\r\n}"
    },
    "models/CurrentAdminUser/CurrentAdminUser": {
      "ts": "interface ReqCurrentAdminUser {\r\n    /** 用户 uid */\r\n    userId: string,\r\n    /** 用户名称 */\r\n    userName: string,\r\n    /** 真是姓名 */\r\n    realName: string,\r\n    /** 头像 */\r\n    avatar?: string,\r\n    /** 权限规则 */\r\n    roles: string,\r\n    /** 开放功能 */\r\n    useModule: string[],\r\n    /** 最近登录时间 */\r\n    time: string\r\n}"
    },
    "admin/PtlAdminOutLogin/ReqAdminOutLogin": {
      "ts": "interface ReqReqAdminOutLogin {\r\n    sso?: string\r\n}"
    },
    "admin/PtlAdminOutLogin/ResAdminOutLogin": {
      "ts": "interface ReqResAdminOutLogin {\r\n    sso?: string\r\n}"
    },
    "admin/PtlAdminUserInfo/ReqAdminUserInfo": {
      "ts": "interface ReqReqAdminUserInfo {\r\n    sso?: string\r\n}"
    },
    "admin/PtlAdminUserInfo/ResAdminUserInfo": {
      "ts": "interface ReqResAdminUserInfo {\r\n    /**\r\n    * userId: 用户uid\r\n    * userName: 用户名称\r\n    * realName: 真实姓名\r\n    * avatar: 头像\r\n    * roles: 管理员角色\r\n    * useModule: 权限list\r\n    * time: 最近登录时间\r\n    */\r\n    adminUserInfo: {\r\n        /** 用户 uid */\r\n        userId: string,\r\n        /** 用户名称 */\r\n        userName: string,\r\n        /** 真是姓名 */\r\n        realName: string,\r\n        /** 头像 */\r\n        avatar?: string,\r\n        /** 权限规则 */\r\n        roles: string,\r\n        /** 开放功能 */\r\n        useModule: string[],\r\n        /** 最近登录时间 */\r\n        time: string\r\n    },\r\n    sso?: string\r\n}"
    },
    "admin/PtlCreateAdminUser/ReqCreateAdminUser": {
      "ts": "interface ReqReqCreateAdminUser {\r\n    /** 账号 */\r\n    account: string,\r\n    /** 密码 */\r\n    password: string,\r\n    /** 用户名称 */\r\n    userName: string,\r\n    /** 真是用户名 */\r\n    realName: string,\r\n    /** 头像 */\r\n    avatar?: string,\r\n    /** 权限规则 */\r\n    roles: string,\r\n    /** 开放功能 */\r\n    useModule: string[],\r\n    sso?: string\r\n}"
    },
    "admin/PtlCreateAdminUser/ResCreateAdminUser": {
      "ts": "interface ReqResCreateAdminUser {\r\n    /** 成功失败 */\r\n    msg: string,\r\n    sso?: string\r\n}"
    },
    "admin/PtlEditAdminInfo/ReqEditAdminInfo": {
      "ts": "interface ReqReqEditAdminInfo {\r\n    /**\r\n    * account: 账号\r\n    * password: 密码\r\n    * userId: 用户uid\r\n    * userName: 用户名称\r\n    * realName: 真实姓名\r\n    * avatar: 头像\r\n    * roles: 管理员角色\r\n    * useModule: 权限list\r\n    */\r\n    adminInfo: {\r\n        account: string,\r\n        password: string,\r\n        /** 用户 uid */\r\n        userId: string,\r\n        /** 用户名称 */\r\n        userName: string,\r\n        /** 真是姓名 */\r\n        realName: string,\r\n        /** 头像 */\r\n        avatar?: string,\r\n        /** 权限规则 */\r\n        roles: string,\r\n        /** 开放功能 */\r\n        useModule: string[]\r\n    },\r\n    sso?: string\r\n}"
    },
    "admin/PtlGetAdminList/adminListItem": {
      "ts": "interface ReqadminListItem {\r\n    account: string,\r\n    password: string,\r\n    /** 用户 uid */\r\n    userId: string,\r\n    /** 用户名称 */\r\n    userName: string,\r\n    /** 真是姓名 */\r\n    realName: string,\r\n    /** 头像 */\r\n    avatar?: string,\r\n    /** 权限规则 */\r\n    roles: string,\r\n    /** 开放功能 */\r\n    useModule: string[],\r\n    /** 最近登录时间 */\r\n    time: string\r\n}"
    },
    "admin/PtlEditAdminInfo/ResEditAdminInfo": {
      "ts": "interface ReqResEditAdminInfo {\r\n    /** 状态 */\r\n    msg: string,\r\n    sso?: string\r\n}"
    },
    "admin/PtlGetAdminList/ReqGetAdminList": {
      "ts": "interface ReqReqGetAdminList {\r\n    sso?: string\r\n}"
    },
    "admin/PtlGetAdminList/ResGetAdminList": {
      "ts": "interface ReqResGetAdminList {\r\n    /**\r\n    * account: 账号\r\n    * password: 密码\r\n    * userId: 用户uid\r\n    * userName: 用户名称\r\n    * realName: 真实姓名\r\n    * avatar: 头像\r\n    * roles: 管理员角色\r\n    * useModule: 权限list\r\n    * time: 最新登录时间\r\n    */\r\n    adminList: {\r\n        account: string,\r\n        password: string,\r\n        /** 用户 uid */\r\n        userId: string,\r\n        /** 用户名称 */\r\n        userName: string,\r\n        /** 真是姓名 */\r\n        realName: string,\r\n        /** 头像 */\r\n        avatar?: string,\r\n        /** 权限规则 */\r\n        roles: string,\r\n        /** 开放功能 */\r\n        useModule: string[],\r\n        /** 最近登录时间 */\r\n        time: string\r\n    }[],\r\n    sso?: string\r\n}"
    },
    "admin/PtlLogin/ReqLogin": {
      "ts": "interface ReqReqLogin {\r\n    account: string,\r\n    password: string\r\n}"
    },
    "admin/PtlLogin/ResLogin": {
      "ts": "interface ReqResLogin {\r\n    sso: string\r\n}"
    },
    "content/PtlContentMainEvent/ReqContentMainEvent": {
      "ts": "interface ReqReqContentMainEvent {\r\n    /** 内容唯一id */\r\n    mainClassId: string,\r\n    /** 操作行为 */\r\n    type: \"state\" | \"del\" | \"populer\",\r\n    sso?: string\r\n}"
    },
    "content/PtlContentMainEvent/ResContentMainEvent": {
      "ts": "interface ReqResContentMainEvent {\r\n    sso?: string\r\n}"
    },
    "content/PtlGetContentMainList/ReqGetContentMainList": {
      "ts": "interface ReqReqGetContentMainList {\r\n    sso?: string\r\n}"
    },
    "content/PtlGetContentMainList/ResGetContentMainList": {
      "ts": "interface ReqResGetContentMainList {\r\n    /**\r\n    * id: 内容唯一id\r\n    * city: 城市\r\n    * longitude: 城市坐标\r\n    * isCharge: 是否免费\r\n    * state: 是否开启\r\n    * populer: 是否热门\r\n    */\r\n    list: ({\r\n        title: string,\r\n        address: string,\r\n        longitude: string,\r\n        time: string,\r\n        tickets: string,\r\n        tags: string[],\r\n        isCharge: boolean,\r\n        amount?: number,\r\n        avgAmount?: number,\r\n        carouselImages: string[],\r\n        content: string,\r\n        state: true | false,\r\n        populer?: true | false,\r\n        sso?: string\r\n    } & {\r\n        id: string,\r\n        city: string,\r\n        longitude: string,\r\n        isCharge: boolean,\r\n        state: boolean,\r\n        populer?: boolean\r\n    })[],\r\n    sso?: string\r\n}"
    },
    "content/PtlSaveMainClass/ReqSaveMainClass": {
      "ts": "interface ReqReqSaveMainClass {\r\n    title: string,\r\n    address: string,\r\n    longitude: string,\r\n    time: string,\r\n    tickets: string,\r\n    tags: string[],\r\n    isCharge: boolean,\r\n    amount?: number,\r\n    avgAmount?: number,\r\n    carouselImages: string[],\r\n    content: string,\r\n    state: true | false,\r\n    populer?: true | false,\r\n    sso?: string\r\n}"
    },
    "content/PtlGetMainClassCityList/ReqGetMainClassCityList": {
      "ts": "interface ReqReqGetMainClassCityList {\r\n    sso?: string\r\n}"
    },
    "content/PtlGetMainClassCityList/ResGetMainClassCityList": {
      "ts": "interface ReqResGetMainClassCityList {\r\n    /** 城市list */\r\n    list: string[],\r\n    sso?: string\r\n}"
    },
    "content/PtlGetMainClassInfo/ReqGetMainClassInfo": {
      "ts": "interface ReqReqGetMainClassInfo {\r\n    /** 内容标题 */\r\n    title?: string,\r\n    /** 内容唯一id */\r\n    mainClassId?: string,\r\n    sso?: string\r\n}"
    },
    "content/PtlGetMainClassInfo/ResGetMainClassInfo": {
      "ts": "interface ReqResGetMainClassInfo {\r\n    /** city: 城市 */\r\n    info: ({\r\n        title: string,\r\n        address: string,\r\n        longitude: string,\r\n        time: string,\r\n        tickets: string,\r\n        tags: string[],\r\n        isCharge: boolean,\r\n        amount?: number,\r\n        avgAmount?: number,\r\n        carouselImages: string[],\r\n        content: string,\r\n        state: true | false,\r\n        populer?: true | false,\r\n        sso?: string\r\n    } & {\r\n        city: string\r\n    }) | undefined,\r\n    sso?: string\r\n}"
    },
    "content/PtlGetMainClassList/ReqGetMainClassList": {
      "ts": "interface ReqReqGetMainClassList {\r\n    sso?: string\r\n}"
    },
    "content/PtlGetMainClassList/ResGetMainClassList": {
      "ts": "interface ReqResGetMainClassList {\r\n    /** 标题list */\r\n    list: {\r\n        _id: string,\r\n        title: string\r\n    }[],\r\n    sso?: string\r\n}"
    },
    "content/PtlGetMainClassList/listItem": {
      "ts": "interface ReqlistItem {\r\n    _id: string,\r\n    title: string\r\n}"
    },
    "content/PtlGetSubClassList/ReqGetSubClassList": {
      "ts": "interface ReqReqGetSubClassList {\r\n    mainClassId: string,\r\n    sso?: string\r\n}"
    },
    "content/PtlGetSubClassList/ResGetSubClassList": {
      "ts": "interface ReqResGetSubClassList {\r\n    /**\r\n    * subId: 子类唯一id\r\n    * title: 子类名称\r\n    */\r\n    list: {\r\n        /** 子类唯一id */\r\n        subId?: string,\r\n        /** 子类名称 */\r\n        title: string\r\n    }[],\r\n    sso?: string\r\n}"
    },
    "content/PtlSaveSubClass/subClassListItem": {
      "ts": "interface ReqsubClassListItem {\r\n    /** 子类唯一id */\r\n    subId?: string,\r\n    /** 子类名称 */\r\n    title: string\r\n}"
    },
    "content/PtlGetValueClassInfo/ReqGetValueClassInfo": {
      "ts": "interface ReqReqGetValueClassInfo {\r\n    /** 子类内容唯一id */\r\n    valueClassId: string,\r\n    sso?: string\r\n}"
    },
    "content/PtlGetValueClassInfo/ResGetValueClassInfo": {
      "ts": "interface ReqResGetValueClassInfo {\r\n    /** 子类信息 */\r\n    info: {\r\n        valueTitleId?: string,\r\n        imagesList: string[],\r\n        videosList: string[],\r\n        valueTitle: string,\r\n        sso?: string\r\n    } | undefined,\r\n    sso?: string\r\n}"
    },
    "content/PtlSaveValueClass/ReqSaveValueClass": {
      "ts": "interface ReqReqSaveValueClass {\r\n    valueTitleId?: string,\r\n    mainClassId: string,\r\n    subClassId: string,\r\n    imagesList: string[],\r\n    videosList: string[],\r\n    valueTitle: string,\r\n    sso?: string\r\n}"
    },
    "content/PtlGetValueClassList/ReqGetValueClassList": {
      "ts": "interface ReqReqGetValueClassList {\r\n    mainClassId: string,\r\n    subClassId: string,\r\n    sso?: string\r\n}"
    },
    "content/PtlGetValueClassList/ResGetValueClassList": {
      "ts": "interface ReqResGetValueClassList {\r\n    /** 子类list */\r\n    list: {\r\n        _id: string,\r\n        title: string\r\n    }[],\r\n    sso?: string\r\n}"
    },
    "content/PtlSaveMainClass/ResSaveMainClass": {
      "ts": "interface ReqResSaveMainClass {\r\n    sso?: string\r\n}"
    },
    "content/PtlSaveSubClass/ReqSaveSubClass": {
      "ts": "interface ReqReqSaveSubClass {\r\n    mainClassId: string,\r\n    subClassList: {\r\n        /** 子类唯一id */\r\n        subId?: string,\r\n        /** 子类名称 */\r\n        title: string\r\n    }[],\r\n    sso?: string\r\n}"
    },
    "content/PtlSaveSubClass/ResSaveSubClass": {
      "ts": "interface ReqResSaveSubClass {\r\n    sso?: string\r\n}"
    },
    "content/PtlSaveValueClass/ResSaveValueClass": {
      "ts": "interface ReqResSaveValueClass {\r\n    sso?: string\r\n}"
    },
    "content/PtlTagsEvent/ReqTagsEvent": {
      "ts": "interface ReqReqTagsEvent {\r\n    /** 标签唯一id */\r\n    _id: string,\r\n    /** 标签内容 */\r\n    tag: string,\r\n    /** 标签事件 */\r\n    action: \"create\" | \"update\" | \"delete\" | \"list\",\r\n    sso?: string\r\n}"
    },
    "content/PtlTagsEvent/ResTagsEvent": {
      "ts": "interface ReqResTagsEvent {\r\n    /** 返回标签list */\r\n    list?: {\r\n        /** 标签唯一id */\r\n        _id: string,\r\n        /** 标签内容 */\r\n        tag: string,\r\n        sso?: string\r\n    }[],\r\n    sso?: string\r\n}"
    },
    "main/PtlGetMainCfgList/ReqGetMainCfgList": {
      "ts": "interface ReqReqGetMainCfgList {\r\n    /**\r\n    * scroll: 轮播图\r\n    * city: 城市信息\r\n    */\r\n    mainCfgType: \"scroll\" | \"city\",\r\n    sso?: string\r\n}"
    },
    "main/PtlGetMainCfgList/ResGetMainCfgList": {
      "ts": "interface ReqResGetMainCfgList {\r\n    /** list */\r\n    list: (({\r\n        mainClassId: string,\r\n        scrollImg: string,\r\n        state: boolean,\r\n        sso?: string\r\n    } | {\r\n        /** 城市 */\r\n        city: string,\r\n        /** 海报图 */\r\n        poster: string,\r\n        /** 是否开启 */\r\n        state: boolean,\r\n        /** 权重 */\r\n        weights: number,\r\n        sso?: string\r\n    }) & {\r\n        /** 更细时间 */\r\n        updateTime: string\r\n    })[],\r\n    sso?: string\r\n}"
    },
    "main/PtlSaveMainClassScrollImg/ReqSaveMainClassScrollImg": {
      "ts": "interface ReqReqSaveMainClassScrollImg {\r\n    mainClassId: string,\r\n    scrollImg: string,\r\n    state: boolean,\r\n    sso?: string\r\n}"
    },
    "main/PtlSaveMainClassCityPoster/ReqSaveMainClassCityPoster": {
      "ts": "interface ReqReqSaveMainClassCityPoster {\r\n    /** 城市 */\r\n    city: string,\r\n    /** 海报图 */\r\n    poster: string,\r\n    /** 是否开启 */\r\n    state: boolean,\r\n    /** 权重 */\r\n    weights: number,\r\n    sso?: string\r\n}"
    },
    "main/PtlGetMainCfgList/mainCfgItem": {
      "ts": "interface ReqmainCfgItem {\r\n    /** 更细时间 */\r\n    updateTime: string\r\n}"
    },
    "main/PtlGetMainClassCityPoster/ReqGetMainClassCityPoster": {
      "ts": "interface ReqReqGetMainClassCityPoster {\r\n    /** 城市 */\r\n    city: string,\r\n    sso?: string\r\n}"
    },
    "main/PtlGetMainClassCityPoster/ResGetMainClassCityPoster": {
      "ts": "interface ReqResGetMainClassCityPoster {\r\n    /** 海报信息 */\r\n    info?: {\r\n        /** 城市 */\r\n        city: string,\r\n        /** 海报图 */\r\n        poster: string,\r\n        /** 是否开启 */\r\n        state: boolean,\r\n        /** 权重 */\r\n        weights: number,\r\n        sso?: string\r\n    },\r\n    sso?: string\r\n}"
    },
    "main/PtlGetMainClassScrollImg/ReqGetMainClassScrollImg": {
      "ts": "interface ReqReqGetMainClassScrollImg {\r\n    mainClassId: string,\r\n    sso?: string\r\n}"
    },
    "main/PtlGetMainClassScrollImg/ResGetMainClassScrollImg": {
      "ts": "interface ReqResGetMainClassScrollImg {\r\n    /** 轮播图信息 */\r\n    info?: {\r\n        mainClassId: string,\r\n        scrollImg: string,\r\n        state: boolean,\r\n        sso?: string\r\n    },\r\n    sso?: string\r\n}"
    },
    "main/PtlSaveMainClassCityPoster/ResSaveMainClassCityPoster": {
      "ts": "interface ReqResSaveMainClassCityPoster {\r\n    sso?: string\r\n}"
    },
    "main/PtlSaveMainClassScrollImg/ResSaveMainClassScrollImg": {
      "ts": "interface ReqResSaveMainClassScrollImg {\r\n    sso?: string\r\n}"
    }
  }
}