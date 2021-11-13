var tsrpcAPI = {
  "version": "1.0.0",
  "servers": [
    "http://localhost:3000"
  ],
  "apis": [
    {
      "path": "/activity/FinishActivityRound",
      "req": {
        "ts": "interface ReqReqFinishActivityRound {\r\n    _id: string,\r\n    self: {\r\n        operations: ({\r\n            /** 选择了第几个选项 从0开始 */\r\n            answer: number,\r\n            /** 答题所用的时间 */\r\n            usedTime: number,\r\n            /** 是否答对 */\r\n            isRight: boolean,\r\n            /** 得分 */\r\n            score: {\r\n                right: number,\r\n                speed: number\r\n            }\r\n        } | null)[],\r\n        score: number,\r\n        /** 战斗结果 胜利/失败/平局 */\r\n        result: \"win\" | \"lose\" | \"draw\",\r\n        /** 字节范特质得分 */\r\n        byteStyleScore: { [key: string]: number },\r\n        medals: number\r\n    },\r\n    /** 对局所有题目的数量 */\r\n    questionNum: number,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResFinishActivityRound {\r\n    pointsChange: number,\r\n    byteStyleChange: {\r\n        name: string,\r\n        amount: number\r\n    }[],\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/activity/FinishQunzhanActivityRound",
      "req": {
        "ts": "interface ReqReqFinishQunzhanActivityRound {\r\n    qunzhanRoundHistoryId: string,\r\n    activityId: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResFinishQunzhanActivityRound {\r\n    isWin: boolean,\r\n    /** 剩余参与次数 */\r\n    remainedPlayTimes: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/activity/GetActivityInfo",
      "req": {
        "ts": "interface ReqReqGetActivityInfo {\r\n    activityId: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetActivityInfo {\r\n    activityConfig: {\r\n        _id: string,\r\n        /** 是否启用 */\r\n        isEnabled: boolean,\r\n        /** 活动名称 */\r\n        name: string,\r\n        /** 首页的Banner图地址 */\r\n        homeBanner?: string,\r\n        /** 活动首页的标题图 */\r\n        titleImage: string,\r\n        /** 活动首页的详情图 */\r\n        descImage: string,\r\n        /** 开始时间 */\r\n        startTime: number,\r\n        /** 结束时间 */\r\n        endTime: number,\r\n        /** 每个用户最多参与几次 */\r\n        maxPlayTimesPerUser: number,\r\n        /** 是否启用字节范特质显示 */\r\n        showByteStyle: boolean,\r\n        /** 攻略地址 */\r\n        tacticUrl?: string,\r\n        /** 是群战模式 */\r\n        qunzhan?: {/** 对几道题给多少积分 */\r\n            awards: { [key: number]: number }\r\n        },\r\n        joinedUserNum: number\r\n    },\r\n    self: {\r\n        /** 剩余参与次数 */\r\n        remainedPlayTimes: number,\r\n        /** 挑战通过的roundId */\r\n        winRoundId?: string,\r\n        /** 抽到的奖品MyAwardID */\r\n        myAwardId?: string\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/activity/StartActivityRound",
      "req": {
        "ts": "interface ReqReqStartActivityRound {\r\n    /** 指定ActivityRoundID 一般情况下不用 只有在例如误退出 希望不消耗次数重来的情况下可用 */\r\n    _id?: string,\r\n    activityId: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResStartActivityRound {\r\n    _id: string,\r\n    questions: {\r\n        _id: string,\r\n        /** options对应题库的索引，>=0为错误答案索引，-1为正确答案 */\r\n        questionBankIndices: number[],\r\n        category: string,\r\n        question: string,\r\n        options: string[],\r\n        rightAnswerIndex: number,\r\n        byteStyle: { [key: string]: number },\r\n        provider?: string,\r\n        /** 题目解析 */\r\n        analysis?: string,\r\n        /** 题目解析链接 */\r\n        analysisUrl?: string\r\n    }[],\r\n    opponent: {\r\n        userInfo: {\r\n            uid: string,\r\n            nickname: string,\r\n            avatar: string,\r\n            gender: 0 | 1 | 2,\r\n            medals: number\r\n        },\r\n        operations: ({\r\n            /** 选择了第几个选项 从0开始 */\r\n            answer: number,\r\n            /** 答题所用的时间 */\r\n            usedTime: number,\r\n            /** 是否答对 */\r\n            isRight: boolean,\r\n            /** 得分 */\r\n            score: {\r\n                right: number,\r\n                speed: number\r\n            }\r\n        } | null)[],\r\n        score: number,\r\n        byteStyleScore: { [key: string]: number },\r\n        /** 对手对局的记录ID 如果为空 说明这是一个AI */\r\n        roundId?: string\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/activity/StartQunzhanActivityRound",
      "req": {
        "ts": "interface ReqReqStartQunzhanActivityRound {\r\n    activityId: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResStartQunzhanActivityRound {\r\n    /** 剩余参与次数 */\r\n    remainedPlayTimes: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/award/GetMyAwards",
      "req": {
        "ts": "interface ReqReqGetMyAwards {\r\n    /** 从1开始 */\r\n    page: number,\r\n    pageSize: number,\r\n    /** 给【活动首页】->【查看奖品】预留，只显示本活动奖品 */\r\n    activityId?: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetMyAwards {\r\n    data: ({\r\n        type: \"实物\",\r\n        /** 登记的收货地址 */\r\n        address?: {\r\n            type: \"快递\",\r\n            province: string,\r\n            city: string,\r\n            area: string,\r\n            addr: string,\r\n            /** 登记时间 */\r\n            time: number,\r\n            name: string,\r\n            tel: string\r\n        } | {\r\n            type: \"工区自提\",\r\n            city: string,\r\n            /** 工区 */\r\n            area: string,\r\n            /** 登记时间 */\r\n            time: number,\r\n            name: string,\r\n            tel: string\r\n        },\r\n        /** 物流信息 */\r\n        allowedDeliveryType: (\"快递\" | \"工区自提\")[],\r\n        delivery?: {\r\n            time: number,\r\n            /** 快递公司 */\r\n            expressCompany: string,\r\n            /** 快递单号 */\r\n            expressNo: string\r\n        },\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    } | {\r\n        type: \"虚拟\",\r\n        /** 发货的卡密 */\r\n        delivery?: {\r\n            time: number,\r\n            content: string\r\n        },\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    } | {\r\n        type: \"LuckyBox\",\r\n        selectedPoolItemId?: string,\r\n        /** 宝箱标题 */\r\n        title: string,\r\n        /** 宝箱描述 */\r\n        desc: string,\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    })[],\r\n    total: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/award/GetToReceivedInfo",
      "title": "获取待领取奖励的信息",
      "req": {
        "ts": "interface ReqReqGetToReceivedInfo { sso?: string }"
      },
      "res": {
        "ts": "interface ReqResGetToReceivedInfo {\r\n    luckyBoxIds: string[],\r\n    myAwardIds: string[],\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/award/GetWorkAreas",
      "req": {
        "ts": "interface ReqReqGetWorkAreas { sso?: string }"
      },
      "res": {
        "ts": "interface ReqResGetWorkAreas {\r\n    workAreas: {\r\n        city: string,\r\n        areas: string[]\r\n    }[],\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/award/OpenLuckyBox",
      "title": "打开宝箱 查看宝箱里的奖品",
      "req": {
        "ts": "interface ReqReqOpenLuckyBox {\r\n    /** LuckyBox的MyAward ID */\r\n    luckyBoxId: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResOpenLuckyBox {\r\n    title: string,\r\n    desc: string,\r\n    from: {\r\n        type: \"周排名\" | \"月排名\",\r\n        desc: string,\r\n        period: {\r\n            /** yyyy-MM-dd */\r\n            startDate: string,\r\n            endDate: string\r\n        },\r\n        /** 自己的排名 */\r\n        rank: number\r\n    } | {\r\n        type: \"Custom\",\r\n        poolId: string,\r\n        desc: string,\r\n        /** 领奖凭据 */\r\n        keys: string[]\r\n    },\r\n    poolItems: {\r\n        _id: string,\r\n        name: string,\r\n        icon: string,\r\n        /** 有此值则被锁住无法选择 */\r\n        lockedMsg?: string\r\n    }[],\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/award/SelectLuckyBoxAward",
      "title": "选择宝箱的奖品",
      "req": {
        "ts": "interface ReqReqSelectLuckyBoxAward {\r\n    /** LuckyBox对应的 MyAward ID */\r\n    luckyBoxId: string,\r\n    /** 选择的奖品的 AwardPoolItem ID */\r\n    poolItemId: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResSelectLuckyBoxAward {\r\n    award: {\r\n        type: \"实物\",\r\n        /** 登记的收货地址 */\r\n        address?: {\r\n            type: \"快递\",\r\n            province: string,\r\n            city: string,\r\n            area: string,\r\n            addr: string,\r\n            /** 登记时间 */\r\n            time: number,\r\n            name: string,\r\n            tel: string\r\n        } | {\r\n            type: \"工区自提\",\r\n            city: string,\r\n            /** 工区 */\r\n            area: string,\r\n            /** 登记时间 */\r\n            time: number,\r\n            name: string,\r\n            tel: string\r\n        },\r\n        /** 物流信息 */\r\n        allowedDeliveryType: (\"快递\" | \"工区自提\")[],\r\n        delivery?: {\r\n            time: number,\r\n            /** 快递公司 */\r\n            expressCompany: string,\r\n            /** 快递单号 */\r\n            expressNo: string\r\n        },\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    } | {\r\n        type: \"虚拟\",\r\n        /** 发货的卡密 */\r\n        delivery?: {\r\n            time: number,\r\n            content: string\r\n        },\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    } | {\r\n        type: \"LuckyBox\",\r\n        selectedPoolItemId?: string,\r\n        /** 宝箱标题 */\r\n        title: string,\r\n        /** 宝箱描述 */\r\n        desc: string,\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/award/SubmitAddr",
      "req": {
        "ts": "interface ReqReqSubmitAddr {\r\n    myAwardId: string,\r\n    address: {\r\n        type: \"快递\",\r\n        province: string,\r\n        city: string,\r\n        area: string,\r\n        addr: string,\r\n        /** 登记时间 */\r\n        time: number,\r\n        name: string,\r\n        tel: string\r\n    } | {\r\n        type: \"工区自提\",\r\n        city: string,\r\n        /** 工区 */\r\n        area: string,\r\n        /** 登记时间 */\r\n        time: number,\r\n        name: string,\r\n        tel: string\r\n    },\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResSubmitAddr {\r\n    newMyAward: {\r\n        type: \"实物\",\r\n        /** 登记的收货地址 */\r\n        address?: {\r\n            type: \"快递\",\r\n            province: string,\r\n            city: string,\r\n            area: string,\r\n            addr: string,\r\n            /** 登记时间 */\r\n            time: number,\r\n            name: string,\r\n            tel: string\r\n        } | {\r\n            type: \"工区自提\",\r\n            city: string,\r\n            /** 工区 */\r\n            area: string,\r\n            /** 登记时间 */\r\n            time: number,\r\n            name: string,\r\n            tel: string\r\n        },\r\n        /** 物流信息 */\r\n        allowedDeliveryType: (\"快递\" | \"工区自提\")[],\r\n        delivery?: {\r\n            time: number,\r\n            /** 快递公司 */\r\n            expressCompany: string,\r\n            /** 快递单号 */\r\n            expressNo: string\r\n        },\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    } | {\r\n        type: \"虚拟\",\r\n        /** 发货的卡密 */\r\n        delivery?: {\r\n            time: number,\r\n            content: string\r\n        },\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    } | {\r\n        type: \"LuckyBox\",\r\n        selectedPoolItemId?: string,\r\n        /** 宝箱标题 */\r\n        title: string,\r\n        /** 宝箱描述 */\r\n        desc: string,\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/daily/FinishRound",
      "req": {
        "ts": "interface ReqReqFinishRound {\r\n    _id: string,\r\n    self: {\r\n        operations: ({\r\n            /** 选择了第几个选项 从0开始 */\r\n            answer: number,\r\n            /** 答题所用的时间 */\r\n            usedTime: number,\r\n            /** 是否答对 */\r\n            isRight: boolean,\r\n            /** 得分 */\r\n            score: {\r\n                right: number,\r\n                speed: number\r\n            }\r\n        } | null)[],\r\n        score: number,\r\n        /** 战斗结果 胜利/失败/平局 */\r\n        result: \"win\" | \"lose\" | \"draw\",\r\n        /** 字节范特质得分 */\r\n        byteStyleScore: { [key: string]: number },\r\n        medals: number\r\n    },\r\n    /** 对局所有题目的数量 */\r\n    questionNum: number,\r\n    questionGroupId: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResFinishRound {\r\n    pointsChange: number,\r\n    medalsChange: number,\r\n    byteStyleChange: {\r\n        name: string,\r\n        amount: number\r\n    }[],\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/daily/StartRound",
      "req": {
        "ts": "interface ReqReqStartRound {\r\n    type: \"practise\" | \"match\",\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResStartRound {\r\n    _id: string,\r\n    questions: {\r\n        _id: string,\r\n        /** options对应题库的索引，>=0为错误答案索引，-1为正确答案 */\r\n        questionBankIndices: number[],\r\n        category: string,\r\n        question: string,\r\n        options: string[],\r\n        rightAnswerIndex: number,\r\n        byteStyle: { [key: string]: number },\r\n        provider?: string,\r\n        /** 题目解析 */\r\n        analysis?: string,\r\n        /** 题目解析链接 */\r\n        analysisUrl?: string\r\n    }[],\r\n    opponent: {\r\n        userInfo: {\r\n            uid: string,\r\n            nickname: string,\r\n            avatar: string,\r\n            gender: 0 | 1 | 2,\r\n            medals: number\r\n        },\r\n        operations: ({\r\n            /** 选择了第几个选项 从0开始 */\r\n            answer: number,\r\n            /** 答题所用的时间 */\r\n            usedTime: number,\r\n            /** 是否答对 */\r\n            isRight: boolean,\r\n            /** 得分 */\r\n            score: {\r\n                right: number,\r\n                speed: number\r\n            }\r\n        } | null)[],\r\n        score: number,\r\n        byteStyleScore: { [key: string]: number },\r\n        /** 对手对局的记录ID 如果为空 说明这是一个AI */\r\n        roundId?: string\r\n    },\r\n    /** 问题组合标识，Finish时透传 */\r\n    questionGroupId: string,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/data/GetPlayData",
      "req": {
        "ts": "interface ReqReqGetPlayData { sso?: string }"
      },
      "res": {
        "ts": "interface ReqResGetPlayData {\r\n    data: { energy?: number },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/data/SetPlayData",
      "req": {
        "ts": "interface ReqReqSetPlayData {\r\n    data: { energy: number },\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResSetPlayData {\r\n    updateTime: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/draw/Draw",
      "title": "进行一次抽奖操作",
      "req": {
        "ts": "interface ReqReqDraw {\r\n    ticket: { type: \"daily\" } | {\r\n        type: \"activity\",\r\n        activityId: string,\r\n        roundId: string\r\n    },\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResDraw {\r\n    award: {\r\n        _id: string,\r\n        name: string,\r\n        icon: string,\r\n        myAwardId: string\r\n    } & ({\r\n        type: \"实物\",\r\n        allowedDeliveryType: (\"快递\" | \"工区自提\")[]\r\n    } | { type: \"虚拟\" | \"NoAward\" }),\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/draw/GetDrawInfo",
      "req": {
        "ts": "interface ReqReqGetDrawInfo {\r\n    ticket: { type: \"daily\" } | {\r\n        type: \"activity\",\r\n        activityId: string,\r\n        roundId: string\r\n    },\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetDrawInfo {\r\n    /** 奖品列表 */\r\n    awards: {\r\n        _id: string,\r\n        type: \"实物\" | \"虚拟\" | \"NoAward\",\r\n        name: string,\r\n        icon: string\r\n    }[],\r\n    /** 如果req的type为activity，则此项必有值 */\r\n    activityConfig?: {\r\n        _id: string,\r\n        /** 是否启用 */\r\n        isEnabled: boolean,\r\n        /** 活动名称 */\r\n        name: string,\r\n        /** 首页的Banner图地址 */\r\n        homeBanner?: string,\r\n        /** 活动首页的标题图 */\r\n        titleImage: string,\r\n        /** 活动首页的详情图 */\r\n        descImage: string,\r\n        /** 开始时间 */\r\n        startTime: number,\r\n        /** 结束时间 */\r\n        endTime: number,\r\n        /** 每个用户最多参与几次 */\r\n        maxPlayTimesPerUser: number,\r\n        /** 是否启用字节范特质显示 */\r\n        showByteStyle: boolean,\r\n        /** 攻略地址 */\r\n        tacticUrl?: string,\r\n        /** 是群战模式 */\r\n        qunzhan?: {/** 对几道题给多少积分 */\r\n            awards: { [key: number]: number }\r\n        },\r\n        joinedUserNum: number\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/events/2021-10-24/GetStatus",
      "req": {
        "ts": "interface ReqReqGetStatus { sso?: string }"
      },
      "res": {
        "ts": "interface ReqResGetStatus {\r\n    remainedExpTimes: number,\r\n    formalResult?: {\r\n        rightNum: number,\r\n        addPoints: number\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/events/2021-10-24/StartExp",
      "title": "开始一局体验模式",
      "req": {
        "ts": "interface ReqReqStartExp { sso?: string }"
      },
      "res": {
        "ts": "interface ReqResStartExp {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/home/GetHomeInfo",
      "title": "获取首页需要的小红点等信息\n一次游戏周期获取一次即可",
      "req": {
        "ts": "interface ReqReqGetHomeInfo { sso?: string }"
      },
      "res": {
        "ts": "interface ReqResGetHomeInfo {\r\n    /** 小红点 */\r\n    dots: {\r\n        /** 用户出题（红点） */\r\n        ugc: boolean,\r\n        /** 奖品（带数字红点） */\r\n        award: number\r\n    },\r\n    /** 自动开宝箱（每开启一个，dots.award -1） */\r\n    luckyBoxIds: string[],\r\n    /** 活动Banner */\r\n    activity?: {\r\n        activityId: string,\r\n        banner: string\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/mistake/GetMyMistakes",
      "req": {
        "ts": "interface ReqReqGetMyMistakes {\r\n    /** 从1开始 */\r\n    page: number,\r\n    pageSize: number,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetMyMistakes {\r\n    data: {\r\n        question: string,\r\n        options: string[],\r\n        /** 打对勾的选项 */\r\n        rightIndex: number,\r\n        /** 打红叉的选项 */\r\n        wrongIndex: number,\r\n        /** 题目解析 */\r\n        analysis?: string,\r\n        /** 题目解析链接 */\r\n        analysisUrl?: string\r\n    }[],\r\n    total: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/platform/LoginDev",
      "req": {
        "ts": "interface ReqReqLoginDev {\r\n    loginKey: string,\r\n    from?: string,\r\n    fromUid?: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResLoginDev {\r\n    user: {\r\n        _id: string,\r\n        nickname: string,\r\n        /** 小号头像 72x72 */\r\n        avatar: string,\r\n        /** 中号头像 240x240 */\r\n        avatarMiddle: string,\r\n        /** 大号头像 640x640 */\r\n        avatarBig: string,\r\n        gender: 0 | 1 | 2,\r\n        /** 工号 */\r\n        jobNo: string,\r\n        /** 地区 */\r\n        country: string,\r\n        province: string,\r\n        city: string,\r\n        from?: string,\r\n        fromUid?: string,\r\n        /** 积分 */\r\n        points: number,\r\n        /** 段位奖章数量 */\r\n        medals: number,\r\n        /** 字节范特质称号 */\r\n        byteStyle: { [key: string]: number },\r\n        /** 体力 */\r\n        energy: number,\r\n        /** 拉新人数 */\r\n        invitedNewUser?: number,\r\n        createTime: number\r\n    },\r\n    playData: { energy?: number },\r\n    isFirstLogin: boolean,\r\n    __refresh: { sso: string }\r\n}"
      }
    },
    {
      "path": "/platform/LoginFeishu",
      "req": {
        "ts": "interface ReqReqLoginFeishu {\r\n    code: string,\r\n    from?: string,\r\n    fromUid?: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResLoginFeishu {\r\n    user: {\r\n        _id: string,\r\n        nickname: string,\r\n        /** 小号头像 72x72 */\r\n        avatar: string,\r\n        /** 中号头像 240x240 */\r\n        avatarMiddle: string,\r\n        /** 大号头像 640x640 */\r\n        avatarBig: string,\r\n        gender: 0 | 1 | 2,\r\n        /** 工号 */\r\n        jobNo: string,\r\n        /** 地区 */\r\n        country: string,\r\n        province: string,\r\n        city: string,\r\n        from?: string,\r\n        fromUid?: string,\r\n        /** 积分 */\r\n        points: number,\r\n        /** 段位奖章数量 */\r\n        medals: number,\r\n        /** 字节范特质称号 */\r\n        byteStyle: { [key: string]: number },\r\n        /** 体力 */\r\n        energy: number,\r\n        /** 拉新人数 */\r\n        invitedNewUser?: number,\r\n        createTime: number\r\n    },\r\n    playData: { energy?: number },\r\n    isFirstLogin: boolean,\r\n    __refresh: { sso: string }\r\n}"
      }
    },
    {
      "path": "/GetGameConfig",
      "req": {
        "ts": "interface ReqReqGetGameConfig {\r\n    version?: number,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetGameConfig {\r\n    version: number,\r\n    /** config返回为空，代表version没变，所以不需要再返回（节省流量） */\r\n    config?: {\r\n        /** 积分数值统一配置 */\r\n        points: {\r\n            /** 新人初始积分 */\r\n            default: number,\r\n            round: {\r\n                activity: {\r\n                    win: number,\r\n                    lose: number,\r\n                    draw: number\r\n                },\r\n1v1: {\r\n    win: number,\r\n        lose: number,\r\n            draw: number\r\n},\r\nqunzhan: {\r\n    win: number,\r\n        lose: number\r\n}\r\n},\r\n/** 抽奖消耗积分 */\r\ndailyDraw: number,\r\n    /** 出题通过奖励积分 */\r\n    ugcAward: number,\r\n        /** 兑换体力消耗积分 */\r\n        buyEnergy: {\r\n    /** 兑换一次消耗的积分价格 */\r\n    points: number,\r\n        /** 兑换一次获得的体力数量 */\r\n        energy: number\r\n},\r\n/** 每日免费体力 */\r\nfreeEnergy: {\r\n    /** 体力恢复时间 (0~23)[] */\r\n    hours: number[],\r\n        /** 每次免费体力的恢复数量 */\r\n        energy: number\r\n},\r\n/** 拉新有礼奖励 */\r\ninviteNewUser: number\r\n},\r\n/** 奖章数值统一配置 */\r\nmedals: {/** 新人初始奖章 */\r\ndefault: number\r\n},\r\n/** 段位配置 */\r\nlevels: {\r\n    /** 段位ID（用于拿图标啊之类的） */\r\n    id: string,\r\n        name: string,\r\n            minMedals: number,\r\n                maxMedals: number\r\n} [],\r\n    round: {\r\n    questionScore: {\r\n        /** 正确得分 */\r\n        right: number,\r\n            /** 速度得分 */\r\n            speed: number\r\n    },\r\n    /** 单局时长（毫秒） */\r\n    roundTime: number,\r\n        /** 一局最多颁发几个字节范奖杯 */\r\n        maxMatchedTimes: {\r\n        activity: number,\r\n            match: number,\r\n                practise: number\r\n    },\r\n    /** AI的难度 */\r\n    aiDifficulty: {\r\n        activity: number,\r\n            match: number,\r\n                practise: number\r\n    }\r\n},\r\nactivity: { },\r\n/** 抽奖模块 */\r\ndraw: {/** 日常抽奖每日最多几次 */\r\n    maxDailyLimit: number\r\n},\r\n/** 允许进入的雇员类型 为undefined则代表所有人 */\r\nlimitEmployeeType ?: string[],\r\n    /** 排名奖励领取条件 */\r\n    rankAward: {\r\n    /** 排名小于等于多少可获得周排名奖励 */\r\n    maxWeekRank: number,\r\n        /** 排名小于等于多少可获得月排名奖励 */\r\n        maxMonthRank: number\r\n},\r\ntexts: {\r\n    ugcRules: string,\r\n        dailyDrawRules: string\r\n},\r\n/** 游戏运营结束提醒 */\r\nendAlert ?: {\r\n    /** 进入游戏时的提醒 */\r\n    entry: {\r\n        /** 此时间后开始出现 */\r\n        endTime: number,\r\n        title: string,\r\n        content: string,\r\n        btnText: string\r\n    },\r\n    /** 日常模式关闭提醒 */\r\n    daily: {\r\n        /** 1v1 模式，此时间后开始出现 */\r\n        endTime1v1: number,\r\n        /** 群战模式，此时间后开始出现 */\r\n        endTimeQunzhan: number,\r\n        title: string,\r\n        content: string,\r\n        btnText: string\r\n    },\r\n    /** 排行榜定格在某一刻 */\r\n    rankEnd?: {\r\n        endTime: number,\r\n        weekText: string,\r\n        monthText: string\r\n    }\r\n}\r\n},\r\n__refresh ?: {\r\n    sso?: string,\r\n    medals?: number,\r\n    points?: number,\r\n    energy?: number\r\n}\r\n}"
      }
    },
    {
      "path": "/qunzhan/GetQunzhanFirstRoundNum",
      "req": {
        "ts": "interface ReqReqGetQunzhanFirstRoundNum { sso?: string }"
      },
      "res": {
        "ts": "interface ReqResGetQunzhanFirstRoundNum {\r\n    firstRoundNum: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/qunzhan/GetQunzhanIndexInfo",
      "req": {
        "ts": "interface ReqReqGetQunzhanIndexInfo { sso?: string }"
      },
      "res": {
        "ts": "interface ReqResGetQunzhanIndexInfo {\r\n    list: {\r\n        richText: string,\r\n        time: string\r\n    }[],\r\n    onlineUserNum: number,\r\n    roomNum: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/qunzhan/GetQunzhanPictureAward",
      "title": "领取群战拼图奖励",
      "req": {
        "ts": "interface ReqReqGetQunzhanPictureAward {\r\n    pictureId: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetQunzhanPictureAward { luckyBoxId: string }"
      }
    },
    {
      "path": "/qunzhan/GetQunzhanPictureConfigs",
      "req": {
        "ts": "interface ReqReqGetQunzhanPictureConfigs { sso?: string }"
      },
      "res": {
        "ts": "interface ReqResGetQunzhanPictureConfigs {\r\n    confs: ({\r\n        _id: string,\r\n        name: string,\r\n        url: string,\r\n        col: number,\r\n        row: number\r\n    } & {\r\n        awards: {\r\n            name: string,\r\n            icon: string\r\n        }[]\r\n    })[],\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/qunzhan/GetQunzhanRoomInfo",
      "req": {
        "ts": "type ReqReqGetQunzhanRoomInfo = { sso?: string } & ({ roomId: string } | {/** 面对面开黑码 */\r\n    code: string\r\n})"
      },
      "res": {
        "ts": "interface ReqResGetQunzhanRoomInfo {\r\n    room?: {\r\n        _id: string,\r\n        serverUrl: string,\r\n        /** 房间状态 */\r\n        state: \"Waiting\" | \"Matching\" | \"Gaming\",\r\n        /** 是否公共房间 */\r\n        isPublic: boolean,\r\n        isActive: boolean,\r\n        /** 强制新手题目判定依据 */\r\n        firstRoundNum?: number,\r\n        /** 活动模式，用于指定题目 */\r\n        activityId?: string,\r\n        /** 房间内成员（第一位是房主） */\r\n        users: {\r\n            uid: string,\r\n            nickname: string,\r\n            avatar: string,\r\n            skinId: string,\r\n            joinBy: \"随机匹配\" | \"邀请同事\" | \"面对面开黑\",\r\n            isAI?: boolean,\r\n            activity?: {\r\n                activityId: string,\r\n                isFormal: boolean\r\n            }\r\n        }[],\r\n        roomStat: {\r\n            uid: string,\r\n            nickname: string,\r\n            avatar: string,\r\n            winRounds: number\r\n        }[],\r\n        /** 面对面开黑房间码 */\r\n        code?: string,\r\n        createTime: number,\r\n        lastActiveTime: number,\r\n        startMatchTime?: number,\r\n        startGameTime?: number\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/qunzhan/GetQunzhanUser",
      "req": {
        "ts": "interface ReqReqGetQunzhanUser { sso?: string }"
      },
      "res": {
        "ts": "interface ReqResGetQunzhanUser {\r\n    qunzhanUser: {\r\n        /** 同 uid */\r\n        _id: string,\r\n        currentSkinId: string,\r\n        /** 解锁的拼图 */\r\n        pictures: { [key: string]: { [key: number]: number } },\r\n        /** 正在收集的拼图 ID */\r\n        currentPictureId?: string,\r\n        /** 已经集齐的拼图 ID */\r\n        awardedPictureIds: string[]\r\n    },\r\n    isFirstTime?: boolean,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/qunzhan/SelectQunzhanSkin",
      "req": {
        "ts": "interface ReqReqSelectQunzhanSkin {\r\n    skinId: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResSelectQunzhanSkin {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/qunzhan/SetCurrentQunzhanPicture",
      "title": "设置群战拼图",
      "req": {
        "ts": "interface ReqReqSetCurrentQunzhanPicture {\r\n    picId: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResSetCurrentQunzhanPicture {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/rank/GetRankList",
      "req": {
        "ts": "interface ReqReqGetRankList {\r\n    rankId: string,\r\n    score?: number,\r\n    topCount: number,\r\n    nearCount: number,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetRankList {\r\n    list: {\r\n        nickName: string,\r\n        avatar: string,\r\n        score: number,\r\n        rank: number,\r\n        province: string,\r\n        city: string\r\n    }[],\r\n    province: string,\r\n    self?: {\r\n        rank: number,\r\n        score: number\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/rank/UpdateRank",
      "req": {
        "ts": "interface ReqReqUpdateRank {\r\n    rankId: string,\r\n    score: number,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResUpdateRank {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/stat/StatAction",
      "req": {
        "ts": "interface ReqReqStatAction {\r\n    action: string,\r\n    isTodayFirst?: boolean,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResStatAction {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/ugc/AddUgcQuestion",
      "req": {
        "ts": "interface ReqReqAddUgcQuestion {\r\n    question: string,\r\n    rightAnswer: string,\r\n    wrongAnswers: string[],\r\n    /** 例如 { 踏实肯干: 1, 勇于创新: 1 } */\r\n    byteStyle: { [key: string]: number },\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResAddUgcQuestion {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/ugc/GetUgcAwards",
      "title": "领取UGC出题奖励\n本次游戏生命周期，首次进入UGC界面调用",
      "req": {
        "ts": "interface ReqReqGetUgcAwards { sso?: string }"
      },
      "res": {
        "ts": "interface ReqResGetUgcAwards {\r\n    /** 奖励了多少积分 */\r\n    pointsChange: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/ugc/GetUgcQuestions",
      "req": {
        "ts": "interface ReqReqGetUgcQuestions {\r\n    page: number,\r\n    pageSize: number,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetUgcQuestions {\r\n    data: {\r\n        question: string,\r\n        rightAnswer: string,\r\n        wrongAnswers: string[],\r\n        createTime: number,\r\n        status: \"审核中\" | \"不通过\" | \"已通过\",\r\n        /** 审核不通过原因 */\r\n        rejectReason?: string\r\n    }[],\r\n    total: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/user/BuyEnergy",
      "req": {
        "ts": "interface ReqReqBuyEnergy { sso?: string }"
      },
      "res": {
        "ts": "interface ReqResBuyEnergy {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/user/ConsumePoints",
      "req": {
        "ts": "interface ReqReqConsumePoints {\r\n    points: number,\r\n    /** 消费用途 */\r\n    reason: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResConsumePoints {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/user/GetCurrentUser",
      "req": {
        "ts": "interface ReqReqGetCurrentUser {\r\n    from?: string,\r\n    fromUid?: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetCurrentUser {\r\n    user: {\r\n        _id: string,\r\n        nickname: string,\r\n        /** 小号头像 72x72 */\r\n        avatar: string,\r\n        /** 中号头像 240x240 */\r\n        avatarMiddle: string,\r\n        /** 大号头像 640x640 */\r\n        avatarBig: string,\r\n        gender: 0 | 1 | 2,\r\n        /** 工号 */\r\n        jobNo: string,\r\n        /** 地区 */\r\n        country: string,\r\n        province: string,\r\n        city: string,\r\n        from?: string,\r\n        fromUid?: string,\r\n        /** 积分 */\r\n        points: number,\r\n        /** 段位奖章数量 */\r\n        medals: number,\r\n        /** 字节范特质称号 */\r\n        byteStyle: { [key: string]: number },\r\n        /** 体力 */\r\n        energy: number,\r\n        /** 拉新人数 */\r\n        invitedNewUser?: number,\r\n        createTime: number\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/user/GetDailyEnergy",
      "req": {
        "ts": "interface ReqReqGetDailyEnergy { sso?: string }"
      },
      "res": {
        "ts": "interface ReqResGetDailyEnergy {\r\n    gotFreeEnergy: number,\r\n    nextGetTime: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/user/GetEnergy",
      "title": "返还体力",
      "req": {
        "ts": "interface ReqReqGetEnergy {\r\n    amount: number,\r\n    reason: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetEnergy {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/user/GetMine",
      "req": {
        "ts": "interface ReqReqGetMine { sso?: string }"
      },
      "res": {
        "ts": "interface ReqResGetMine {\r\n    /** 段位（生涯统计） */\r\n    career: {\r\n        medals: number,\r\n        medals1v1: number,\r\n        medalsQunzhan: number,\r\n        rank?: number,\r\n        rank1v1?: number,\r\n        rankQunzhan?: number\r\n    },\r\n    /** 字节范特质奖杯 */\r\n    byteStyles: {\r\n        name: string,\r\n        num: number\r\n    }[],\r\n    qunzhanUser: {\r\n        /** 同 uid */\r\n        _id: string,\r\n        currentSkinId: string,\r\n        /** 解锁的拼图 */\r\n        pictures: { [key: string]: { [key: number]: number } },\r\n        /** 正在收集的拼图 ID */\r\n        currentPictureId?: string,\r\n        /** 已经集齐的拼图 ID */\r\n        awardedPictureIds: string[]\r\n    },\r\n    /** 本周表现 */\r\n    thisWeek: {\r\n        medals: number,\r\n        medals1v1: number,\r\n        medalsQunzhan: number,\r\n        rank?: number,\r\n        rank1v1?: number,\r\n        rankQunzhan?: number\r\n    },\r\n    /** 本月表现 */\r\n    thisMonth: {\r\n        medals: number,\r\n        medals1v1: number,\r\n        medalsQunzhan: number,\r\n        rank?: number,\r\n        rank1v1?: number,\r\n        rankQunzhan?: number\r\n    },\r\n    ugc: {\r\n        /** 累计出题 */\r\n        created: number,\r\n        /** 审核通过 */\r\n        approved: number\r\n    },\r\n    /** 最近战绩 */\r\n    history1v1: {\r\n        result: \"win\" | \"draw\" | \"lose\",\r\n        selfScore: number,\r\n        oppScore: number,\r\n        opponentInfo: {\r\n            uid: string,\r\n            nickname: string,\r\n            avatar: string,\r\n            gender: 0 | 1 | 2,\r\n            medals: number\r\n        }\r\n    }[],\r\n    historyQunzhan: {\r\n        skinId: string,\r\n        joinBy: \"随机匹配\" | \"邀请同事\" | \"面对面开黑\",\r\n        isWin: boolean,\r\n        endTime: string\r\n    }[],\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/user/GetPointsHistory",
      "req": {
        "ts": "interface ReqReqGetPointsHistory {\r\n    page: number,\r\n    pageSize: number,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetPointsHistory {\r\n    list: {\r\n        createTime: number,\r\n        change: number,\r\n        reason: string,\r\n        after: number\r\n    }[],\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/user/GetTodayRoundNum",
      "req": {
        "ts": "interface ReqReqGetTodayRoundNum { sso?: string }"
      },
      "res": {
        "ts": "interface ReqResGetTodayRoundNum {\r\n1v1: number,\r\n    qunzhan: number,\r\n        total: number,\r\n            date: string,\r\n                exceedTodayMax: boolean,\r\n                    __refresh ?: {\r\n                        sso?: string,\r\n                        medals?: number,\r\n                        points?: number,\r\n                        energy?: number\r\n                    }\r\n}"
      }
    },
    {
      "path": "/user/GetUserInfo",
      "req": {
        "ts": "interface ReqReqGetUserInfo {\r\n    uid: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResGetUserInfo {\r\n    uid: string,\r\n    nickname: string,\r\n    avatar: string,\r\n    gender: 0 | 1 | 2,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/user/RedeemStorePoints",
      "req": {
        "ts": "interface ReqReqRedeemStorePoints {\r\n    amount: number,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResRedeemStorePoints {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/user/Sign",
      "req": {
        "ts": "interface ReqReqSign {\r\n    url: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResSign {\r\n    appId: string,\r\n    nonceStr: string,\r\n    timestamp: number,\r\n    signature: string,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/user/UpdateUser",
      "req": {
        "ts": "interface ReqReqUpdateUser {\r\n    nickname?: string,\r\n    avatar?: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResUpdateUser {\r\n    user: {\r\n        _id: string,\r\n        nickname: string,\r\n        /** 小号头像 72x72 */\r\n        avatar: string,\r\n        /** 中号头像 240x240 */\r\n        avatarMiddle: string,\r\n        /** 大号头像 640x640 */\r\n        avatarBig: string,\r\n        gender: 0 | 1 | 2,\r\n        /** 工号 */\r\n        jobNo: string,\r\n        /** 地区 */\r\n        country: string,\r\n        province: string,\r\n        city: string,\r\n        from?: string,\r\n        fromUid?: string,\r\n        /** 积分 */\r\n        points: number,\r\n        /** 段位奖章数量 */\r\n        medals: number,\r\n        /** 字节范特质称号 */\r\n        byteStyle: { [key: string]: number },\r\n        /** 体力 */\r\n        energy: number,\r\n        /** 拉新人数 */\r\n        invitedNewUser?: number,\r\n        createTime: number\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/user/Upload",
      "req": {
        "ts": "interface ReqReqUpload {\r\n    data: string | string,\r\n    ext: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResUpload {\r\n    /** 文件的绝对地址 */\r\n    url: string,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    },
    {
      "path": "/user/UseEnergy",
      "req": {
        "ts": "interface ReqReqUseEnergy {\r\n    useAmount: number,\r\n    reason: string,\r\n    sso?: string\r\n}"
      },
      "res": {
        "ts": "interface ReqResUseEnergy {\r\n    newEnergy: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
      }
    }
  ],
  "schemas": {
    "activity/PtlFinishActivityRound/ReqFinishActivityRound": {
      "ts": "interface ReqReqFinishActivityRound {\r\n    _id: string,\r\n    self: {\r\n        operations: ({\r\n            /** 选择了第几个选项 从0开始 */\r\n            answer: number,\r\n            /** 答题所用的时间 */\r\n            usedTime: number,\r\n            /** 是否答对 */\r\n            isRight: boolean,\r\n            /** 得分 */\r\n            score: {\r\n                right: number,\r\n                speed: number\r\n            }\r\n        } | null)[],\r\n        score: number,\r\n        /** 战斗结果 胜利/失败/平局 */\r\n        result: \"win\" | \"lose\" | \"draw\",\r\n        /** 字节范特质得分 */\r\n        byteStyleScore: { [key: string]: number },\r\n        medals: number\r\n    },\r\n    /** 对局所有题目的数量 */\r\n    questionNum: number,\r\n    sso?: string\r\n}"
    },
    "base/BaseRequest": {
      "ts": "interface ReqBaseRequest { sso?: string }"
    },
    "models/QuizRound/QuizRoundSelf": {
      "ts": "interface ReqQuizRoundSelf {\r\n    operations: ({\r\n        /** 选择了第几个选项 从0开始 */\r\n        answer: number,\r\n        /** 答题所用的时间 */\r\n        usedTime: number,\r\n        /** 是否答对 */\r\n        isRight: boolean,\r\n        /** 得分 */\r\n        score: {\r\n            right: number,\r\n            speed: number\r\n        }\r\n    } | null)[],\r\n    score: number,\r\n    /** 战斗结果 胜利/失败/平局 */\r\n    result: \"win\" | \"lose\" | \"draw\",\r\n    /** 字节范特质得分 */\r\n    byteStyleScore: { [key: string]: number },\r\n    medals: number\r\n}"
    },
    "models/QuizOperation/QuizOperation": {
      "ts": "type ReqQuizOperation = {\r\n    /** 选择了第几个选项 从0开始 */\r\n    answer: number,\r\n    /** 答题所用的时间 */\r\n    usedTime: number,\r\n    /** 是否答对 */\r\n    isRight: boolean,\r\n    /** 得分 */\r\n    score: {\r\n        right: number,\r\n        speed: number\r\n    }\r\n} | null"
    },
    "models/QuizOperation/QuizOperationItem": {
      "ts": "interface ReqQuizOperationItem {\r\n    /** 选择了第几个选项 从0开始 */\r\n    answer: number,\r\n    /** 答题所用的时间 */\r\n    usedTime: number,\r\n    /** 是否答对 */\r\n    isRight: boolean,\r\n    /** 得分 */\r\n    score: {\r\n        right: number,\r\n        speed: number\r\n    }\r\n}"
    },
    "activity/PtlFinishActivityRound/ResFinishActivityRound": {
      "ts": "interface ReqResFinishActivityRound {\r\n    pointsChange: number,\r\n    byteStyleChange: {\r\n        name: string,\r\n        amount: number\r\n    }[],\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "base/BaseResponse": {
      "ts": "interface ReqBaseResponse {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "activity/PtlFinishQunzhanActivityRound/ReqFinishQunzhanActivityRound": {
      "ts": "interface ReqReqFinishQunzhanActivityRound {\r\n    qunzhanRoundHistoryId: string,\r\n    activityId: string,\r\n    sso?: string\r\n}"
    },
    "activity/PtlFinishQunzhanActivityRound/ResFinishQunzhanActivityRound": {
      "ts": "interface ReqResFinishQunzhanActivityRound {\r\n    isWin: boolean,\r\n    /** 剩余参与次数 */\r\n    remainedPlayTimes: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "activity/PtlGetActivityInfo/ReqGetActivityInfo": {
      "ts": "interface ReqReqGetActivityInfo {\r\n    activityId: string,\r\n    sso?: string\r\n}"
    },
    "activity/PtlGetActivityInfo/ResGetActivityInfo": {
      "ts": "interface ReqResGetActivityInfo {\r\n    activityConfig: {\r\n        _id: string,\r\n        /** 是否启用 */\r\n        isEnabled: boolean,\r\n        /** 活动名称 */\r\n        name: string,\r\n        /** 首页的Banner图地址 */\r\n        homeBanner?: string,\r\n        /** 活动首页的标题图 */\r\n        titleImage: string,\r\n        /** 活动首页的详情图 */\r\n        descImage: string,\r\n        /** 开始时间 */\r\n        startTime: number,\r\n        /** 结束时间 */\r\n        endTime: number,\r\n        /** 每个用户最多参与几次 */\r\n        maxPlayTimesPerUser: number,\r\n        /** 是否启用字节范特质显示 */\r\n        showByteStyle: boolean,\r\n        /** 攻略地址 */\r\n        tacticUrl?: string,\r\n        /** 是群战模式 */\r\n        qunzhan?: {/** 对几道题给多少积分 */\r\n            awards: { [key: number]: number }\r\n        },\r\n        joinedUserNum: number\r\n    },\r\n    self: {\r\n        /** 剩余参与次数 */\r\n        remainedPlayTimes: number,\r\n        /** 挑战通过的roundId */\r\n        winRoundId?: string,\r\n        /** 抽到的奖品MyAwardID */\r\n        myAwardId?: string\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "models/ActivityConfig/ActivityConfig": {
      "ts": "interface ReqActivityConfig {\r\n    _id: string,\r\n    /** 是否启用 */\r\n    isEnabled: boolean,\r\n    /** 活动名称 */\r\n    name: string,\r\n    /** 首页的Banner图地址 */\r\n    homeBanner?: string,\r\n    /** 活动首页的标题图 */\r\n    titleImage: string,\r\n    /** 活动首页的详情图 */\r\n    descImage: string,\r\n    /** 开始时间 */\r\n    startTime: number,\r\n    /** 结束时间 */\r\n    endTime: number,\r\n    /** 每个用户最多参与几次 */\r\n    maxPlayTimesPerUser: number,\r\n    /** 是否启用字节范特质显示 */\r\n    showByteStyle: boolean,\r\n    /** 攻略地址 */\r\n    tacticUrl?: string,\r\n    /** 是群战模式 */\r\n    qunzhan?: {/** 对几道题给多少积分 */\r\n        awards: { [key: number]: number }\r\n    },\r\n    joinedUserNum: number\r\n}"
    },
    "activity/PtlStartActivityRound/ReqStartActivityRound": {
      "ts": "interface ReqReqStartActivityRound {\r\n    /** 指定ActivityRoundID 一般情况下不用 只有在例如误退出 希望不消耗次数重来的情况下可用 */\r\n    _id?: string,\r\n    activityId: string,\r\n    sso?: string\r\n}"
    },
    "activity/PtlStartActivityRound/ResStartActivityRound": {
      "ts": "interface ReqResStartActivityRound {\r\n    _id: string,\r\n    questions: {\r\n        _id: string,\r\n        /** options对应题库的索引，>=0为错误答案索引，-1为正确答案 */\r\n        questionBankIndices: number[],\r\n        category: string,\r\n        question: string,\r\n        options: string[],\r\n        rightAnswerIndex: number,\r\n        byteStyle: { [key: string]: number },\r\n        provider?: string,\r\n        /** 题目解析 */\r\n        analysis?: string,\r\n        /** 题目解析链接 */\r\n        analysisUrl?: string\r\n    }[],\r\n    opponent: {\r\n        userInfo: {\r\n            uid: string,\r\n            nickname: string,\r\n            avatar: string,\r\n            gender: 0 | 1 | 2,\r\n            medals: number\r\n        },\r\n        operations: ({\r\n            /** 选择了第几个选项 从0开始 */\r\n            answer: number,\r\n            /** 答题所用的时间 */\r\n            usedTime: number,\r\n            /** 是否答对 */\r\n            isRight: boolean,\r\n            /** 得分 */\r\n            score: {\r\n                right: number,\r\n                speed: number\r\n            }\r\n        } | null)[],\r\n        score: number,\r\n        byteStyleScore: { [key: string]: number },\r\n        /** 对手对局的记录ID 如果为空 说明这是一个AI */\r\n        roundId?: string\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "models/QuizQuestion/QuizQuestion": {
      "ts": "interface ReqQuizQuestion {\r\n    _id: string,\r\n    /** options对应题库的索引，>=0为错误答案索引，-1为正确答案 */\r\n    questionBankIndices: number[],\r\n    category: string,\r\n    question: string,\r\n    options: string[],\r\n    rightAnswerIndex: number,\r\n    byteStyle: { [key: string]: number },\r\n    provider?: string,\r\n    /** 题目解析 */\r\n    analysis?: string,\r\n    /** 题目解析链接 */\r\n    analysisUrl?: string\r\n}"
    },
    "models/QuizRound/QuizRound": {
      "ts": "interface ReqQuizRound {\r\n    /** 答题人（左侧） */\r\n    selfInfo: {\r\n        uid: string,\r\n        nickname: string,\r\n        avatar: string,\r\n        gender: 0 | 1 | 2,\r\n        medals: number\r\n    } & {\r\n        /** 保护不能同城匹配 */\r\n        city?: string,\r\n        /** 保护测试账号不被匹配 */\r\n        isDev?: boolean\r\n    },\r\n    /** 自己的操作和结果，为空则说明尚未完成 */\r\n    self?: {\r\n        operations: ({\r\n            /** 选择了第几个选项 从0开始 */\r\n            answer: number,\r\n            /** 答题所用的时间 */\r\n            usedTime: number,\r\n            /** 是否答对 */\r\n            isRight: boolean,\r\n            /** 得分 */\r\n            score: {\r\n                right: number,\r\n                speed: number\r\n            }\r\n        } | null)[],\r\n        score: number,\r\n        /** 战斗结果 胜利/失败/平局 */\r\n        result: \"win\" | \"lose\" | \"draw\",\r\n        /** 字节范特质得分 */\r\n        byteStyleScore: { [key: string]: number },\r\n        medals: number\r\n    },\r\n    opponent: {\r\n        userInfo: {\r\n            uid: string,\r\n            nickname: string,\r\n            avatar: string,\r\n            gender: 0 | 1 | 2,\r\n            medals: number\r\n        },\r\n        operations: ({\r\n            /** 选择了第几个选项 从0开始 */\r\n            answer: number,\r\n            /** 答题所用的时间 */\r\n            usedTime: number,\r\n            /** 是否答对 */\r\n            isRight: boolean,\r\n            /** 得分 */\r\n            score: {\r\n                right: number,\r\n                speed: number\r\n            }\r\n        } | null)[],\r\n        score: number,\r\n        byteStyleScore: { [key: string]: number },\r\n        /** 对手对局的记录ID 如果为空 说明这是一个AI */\r\n        roundId?: string\r\n    },\r\n    /** 该对局当前是否可以开放被匹配（根据self的表现来判定，目的是过滤劣质对局），最终能否匹配还要结合matchedNum一起看 */\r\n    matchable: boolean,\r\n    /** 已被匹配的次数 */\r\n    matchedNum: number,\r\n    random: number,\r\n    createTime: number,\r\n    finishTime?: number\r\n}"
    },
    "models/UserInfo/UserInfo": {
      "ts": "interface ReqUserInfo {\r\n    uid: string,\r\n    nickname: string,\r\n    avatar: string,\r\n    gender: 0 | 1 | 2,\r\n    medals: number\r\n}"
    },
    "models/UserInfo/UserGender": {
      "ts": "type ReqUserGender = 0 | 1 | 2"
    },
    "activity/PtlStartQunzhanActivityRound/ReqStartQunzhanActivityRound": {
      "ts": "interface ReqReqStartQunzhanActivityRound {\r\n    activityId: string,\r\n    sso?: string\r\n}"
    },
    "activity/PtlStartQunzhanActivityRound/ResStartQunzhanActivityRound": {
      "ts": "interface ReqResStartQunzhanActivityRound {\r\n    /** 剩余参与次数 */\r\n    remainedPlayTimes: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "award/PtlGetMyAwards/ReqGetMyAwards": {
      "ts": "interface ReqReqGetMyAwards {\r\n    /** 从1开始 */\r\n    page: number,\r\n    pageSize: number,\r\n    /** 给【活动首页】->【查看奖品】预留，只显示本活动奖品 */\r\n    activityId?: string,\r\n    sso?: string\r\n}"
    },
    "award/PtlGetMyAwards/ResGetMyAwards": {
      "ts": "interface ReqResGetMyAwards {\r\n    data: ({\r\n        type: \"实物\",\r\n        /** 登记的收货地址 */\r\n        address?: {\r\n            type: \"快递\",\r\n            province: string,\r\n            city: string,\r\n            area: string,\r\n            addr: string,\r\n            /** 登记时间 */\r\n            time: number,\r\n            name: string,\r\n            tel: string\r\n        } | {\r\n            type: \"工区自提\",\r\n            city: string,\r\n            /** 工区 */\r\n            area: string,\r\n            /** 登记时间 */\r\n            time: number,\r\n            name: string,\r\n            tel: string\r\n        },\r\n        /** 物流信息 */\r\n        allowedDeliveryType: (\"快递\" | \"工区自提\")[],\r\n        delivery?: {\r\n            time: number,\r\n            /** 快递公司 */\r\n            expressCompany: string,\r\n            /** 快递单号 */\r\n            expressNo: string\r\n        },\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    } | {\r\n        type: \"虚拟\",\r\n        /** 发货的卡密 */\r\n        delivery?: {\r\n            time: number,\r\n            content: string\r\n        },\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    } | {\r\n        type: \"LuckyBox\",\r\n        selectedPoolItemId?: string,\r\n        /** 宝箱标题 */\r\n        title: string,\r\n        /** 宝箱描述 */\r\n        desc: string,\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    })[],\r\n    total: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "models/MyAward/MyAward": {
      "ts": "type ReqMyAward = {\r\n    type: \"实物\",\r\n    /** 登记的收货地址 */\r\n    address?: {\r\n        type: \"快递\",\r\n        province: string,\r\n        city: string,\r\n        area: string,\r\n        addr: string,\r\n        /** 登记时间 */\r\n        time: number,\r\n        name: string,\r\n        tel: string\r\n    } | {\r\n        type: \"工区自提\",\r\n        city: string,\r\n        /** 工区 */\r\n        area: string,\r\n        /** 登记时间 */\r\n        time: number,\r\n        name: string,\r\n        tel: string\r\n    },\r\n    /** 物流信息 */\r\n    allowedDeliveryType: (\"快递\" | \"工区自提\")[],\r\n    delivery?: {\r\n        time: number,\r\n        /** 快递公司 */\r\n        expressCompany: string,\r\n        /** 快递单号 */\r\n        expressNo: string\r\n    },\r\n    _id: string,\r\n    uid: string,\r\n    nickname: string,\r\n    jobNo: string,\r\n    /** 奖品名称 */\r\n    name: string,\r\n    /** 奖品图标 */\r\n    icon: string,\r\n    /** 奖品来源 */\r\n    from: {\r\n        type: \"日常抽奖\",\r\n        desc: string\r\n    } | {\r\n        type: \"活动\",\r\n        activityId: string,\r\n        desc: string\r\n    } | {\r\n        type: \"周排名\" | \"月排名\",\r\n        desc: string,\r\n        period: {\r\n            /** yyyy-MM-dd */\r\n            startDate: string,\r\n            endDate: string\r\n        },\r\n        /** 自己的排名 */\r\n        rank: number\r\n    } | {\r\n        type: \"Custom\",\r\n        poolId: string,\r\n        desc: string,\r\n        /** 领奖凭据 */\r\n        keys: string[]\r\n    } | {\r\n        type: \"群战拼图\",\r\n        poolId: string,\r\n        desc: string\r\n    },\r\n    status: \"待领取\" | \"待发出\" | \"已发出\",\r\n    /** 中奖时间 */\r\n    createTime: number,\r\n    meta?: any\r\n} | {\r\n    type: \"虚拟\",\r\n    /** 发货的卡密 */\r\n    delivery?: {\r\n        time: number,\r\n        content: string\r\n    },\r\n    _id: string,\r\n    uid: string,\r\n    nickname: string,\r\n    jobNo: string,\r\n    /** 奖品名称 */\r\n    name: string,\r\n    /** 奖品图标 */\r\n    icon: string,\r\n    /** 奖品来源 */\r\n    from: {\r\n        type: \"日常抽奖\",\r\n        desc: string\r\n    } | {\r\n        type: \"活动\",\r\n        activityId: string,\r\n        desc: string\r\n    } | {\r\n        type: \"周排名\" | \"月排名\",\r\n        desc: string,\r\n        period: {\r\n            /** yyyy-MM-dd */\r\n            startDate: string,\r\n            endDate: string\r\n        },\r\n        /** 自己的排名 */\r\n        rank: number\r\n    } | {\r\n        type: \"Custom\",\r\n        poolId: string,\r\n        desc: string,\r\n        /** 领奖凭据 */\r\n        keys: string[]\r\n    } | {\r\n        type: \"群战拼图\",\r\n        poolId: string,\r\n        desc: string\r\n    },\r\n    status: \"待领取\" | \"待发出\" | \"已发出\",\r\n    /** 中奖时间 */\r\n    createTime: number,\r\n    meta?: any\r\n} | {\r\n    type: \"LuckyBox\",\r\n    selectedPoolItemId?: string,\r\n    /** 宝箱标题 */\r\n    title: string,\r\n    /** 宝箱描述 */\r\n    desc: string,\r\n    _id: string,\r\n    uid: string,\r\n    nickname: string,\r\n    jobNo: string,\r\n    /** 奖品名称 */\r\n    name: string,\r\n    /** 奖品图标 */\r\n    icon: string,\r\n    /** 奖品来源 */\r\n    from: {\r\n        type: \"日常抽奖\",\r\n        desc: string\r\n    } | {\r\n        type: \"活动\",\r\n        activityId: string,\r\n        desc: string\r\n    } | {\r\n        type: \"周排名\" | \"月排名\",\r\n        desc: string,\r\n        period: {\r\n            /** yyyy-MM-dd */\r\n            startDate: string,\r\n            endDate: string\r\n        },\r\n        /** 自己的排名 */\r\n        rank: number\r\n    } | {\r\n        type: \"Custom\",\r\n        poolId: string,\r\n        desc: string,\r\n        /** 领奖凭据 */\r\n        keys: string[]\r\n    } | {\r\n        type: \"群战拼图\",\r\n        poolId: string,\r\n        desc: string\r\n    },\r\n    status: \"待领取\" | \"待发出\" | \"已发出\",\r\n    /** 中奖时间 */\r\n    createTime: number,\r\n    meta?: any\r\n}"
    },
    "models/MyAward/MyAwardReal": {
      "ts": "interface ReqMyAwardReal {\r\n    type: \"实物\",\r\n    /** 登记的收货地址 */\r\n    address?: {\r\n        type: \"快递\",\r\n        province: string,\r\n        city: string,\r\n        area: string,\r\n        addr: string,\r\n        /** 登记时间 */\r\n        time: number,\r\n        name: string,\r\n        tel: string\r\n    } | {\r\n        type: \"工区自提\",\r\n        city: string,\r\n        /** 工区 */\r\n        area: string,\r\n        /** 登记时间 */\r\n        time: number,\r\n        name: string,\r\n        tel: string\r\n    },\r\n    /** 物流信息 */\r\n    allowedDeliveryType: (\"快递\" | \"工区自提\")[],\r\n    delivery?: {\r\n        time: number,\r\n        /** 快递公司 */\r\n        expressCompany: string,\r\n        /** 快递单号 */\r\n        expressNo: string\r\n    },\r\n    _id: string,\r\n    uid: string,\r\n    nickname: string,\r\n    jobNo: string,\r\n    /** 奖品名称 */\r\n    name: string,\r\n    /** 奖品图标 */\r\n    icon: string,\r\n    /** 奖品来源 */\r\n    from: {\r\n        type: \"日常抽奖\",\r\n        desc: string\r\n    } | {\r\n        type: \"活动\",\r\n        activityId: string,\r\n        desc: string\r\n    } | {\r\n        type: \"周排名\" | \"月排名\",\r\n        desc: string,\r\n        period: {\r\n            /** yyyy-MM-dd */\r\n            startDate: string,\r\n            endDate: string\r\n        },\r\n        /** 自己的排名 */\r\n        rank: number\r\n    } | {\r\n        type: \"Custom\",\r\n        poolId: string,\r\n        desc: string,\r\n        /** 领奖凭据 */\r\n        keys: string[]\r\n    } | {\r\n        type: \"群战拼图\",\r\n        poolId: string,\r\n        desc: string\r\n    },\r\n    status: \"待领取\" | \"待发出\" | \"已发出\",\r\n    /** 中奖时间 */\r\n    createTime: number,\r\n    meta?: any\r\n}"
    },
    "models/MyAward/BaseMyAward": {
      "ts": "interface ReqBaseMyAward {\r\n    _id: string,\r\n    uid: string,\r\n    nickname: string,\r\n    jobNo: string,\r\n    /** 奖品名称 */\r\n    name: string,\r\n    /** 奖品图标 */\r\n    icon: string,\r\n    /** 奖品来源 */\r\n    from: {\r\n        type: \"日常抽奖\",\r\n        desc: string\r\n    } | {\r\n        type: \"活动\",\r\n        activityId: string,\r\n        desc: string\r\n    } | {\r\n        type: \"周排名\" | \"月排名\",\r\n        desc: string,\r\n        period: {\r\n            /** yyyy-MM-dd */\r\n            startDate: string,\r\n            endDate: string\r\n        },\r\n        /** 自己的排名 */\r\n        rank: number\r\n    } | {\r\n        type: \"Custom\",\r\n        poolId: string,\r\n        desc: string,\r\n        /** 领奖凭据 */\r\n        keys: string[]\r\n    } | {\r\n        type: \"群战拼图\",\r\n        poolId: string,\r\n        desc: string\r\n    },\r\n    status: \"待领取\" | \"待发出\" | \"已发出\",\r\n    /** 中奖时间 */\r\n    createTime: number,\r\n    meta?: any\r\n}"
    },
    "models/MyAward/MyAwardFromDaily": {
      "ts": "interface ReqMyAwardFromDaily {\r\n    type: \"日常抽奖\",\r\n    desc: string\r\n}"
    },
    "models/MyAward/MyAwardFromActivity": {
      "ts": "interface ReqMyAwardFromActivity {\r\n    type: \"活动\",\r\n    activityId: string,\r\n    desc: string\r\n}"
    },
    "models/MyAward/MyAwardFromRank": {
      "ts": "interface ReqMyAwardFromRank {\r\n    type: \"周排名\" | \"月排名\",\r\n    desc: string,\r\n    period: {\r\n        /** yyyy-MM-dd */\r\n        startDate: string,\r\n        endDate: string\r\n    },\r\n    /** 自己的排名 */\r\n    rank: number\r\n}"
    },
    "models/MyAward/MyAwardFromCustom": {
      "ts": "interface ReqMyAwardFromCustom {\r\n    type: \"Custom\",\r\n    poolId: string,\r\n    desc: string,\r\n    /** 领奖凭据 */\r\n    keys: string[]\r\n}"
    },
    "models/MyAward/MyAwardFromQunzhan": {
      "ts": "interface ReqMyAwardFromQunzhan {\r\n    type: \"群战拼图\",\r\n    poolId: string,\r\n    desc: string\r\n}"
    },
    "models/MyAward/RealAwardAddress": {
      "ts": "type ReqRealAwardAddress = {\r\n    type: \"快递\",\r\n    province: string,\r\n    city: string,\r\n    area: string,\r\n    addr: string,\r\n    /** 登记时间 */\r\n    time: number,\r\n    name: string,\r\n    tel: string\r\n} | {\r\n    type: \"工区自提\",\r\n    city: string,\r\n    /** 工区 */\r\n    area: string,\r\n    /** 登记时间 */\r\n    time: number,\r\n    name: string,\r\n    tel: string\r\n}"
    },
    "models/MyAward/RealAwardAddressExpress": {
      "ts": "interface ReqRealAwardAddressExpress {\r\n    type: \"快递\",\r\n    province: string,\r\n    city: string,\r\n    area: string,\r\n    addr: string,\r\n    /** 登记时间 */\r\n    time: number,\r\n    name: string,\r\n    tel: string\r\n}"
    },
    "models/MyAward/BaseRealAwardAddress": {
      "ts": "interface ReqBaseRealAwardAddress {\r\n    /** 登记时间 */\r\n    time: number,\r\n    name: string,\r\n    tel: string\r\n}"
    },
    "models/MyAward/RealAwardAddressZiti": {
      "ts": "interface ReqRealAwardAddressZiti {\r\n    type: \"工区自提\",\r\n    city: string,\r\n    /** 工区 */\r\n    area: string,\r\n    /** 登记时间 */\r\n    time: number,\r\n    name: string,\r\n    tel: string\r\n}"
    },
    "models/MyAward/MyAwardVirtual": {
      "ts": "interface ReqMyAwardVirtual {\r\n    type: \"虚拟\",\r\n    /** 发货的卡密 */\r\n    delivery?: {\r\n        time: number,\r\n        content: string\r\n    },\r\n    _id: string,\r\n    uid: string,\r\n    nickname: string,\r\n    jobNo: string,\r\n    /** 奖品名称 */\r\n    name: string,\r\n    /** 奖品图标 */\r\n    icon: string,\r\n    /** 奖品来源 */\r\n    from: {\r\n        type: \"日常抽奖\",\r\n        desc: string\r\n    } | {\r\n        type: \"活动\",\r\n        activityId: string,\r\n        desc: string\r\n    } | {\r\n        type: \"周排名\" | \"月排名\",\r\n        desc: string,\r\n        period: {\r\n            /** yyyy-MM-dd */\r\n            startDate: string,\r\n            endDate: string\r\n        },\r\n        /** 自己的排名 */\r\n        rank: number\r\n    } | {\r\n        type: \"Custom\",\r\n        poolId: string,\r\n        desc: string,\r\n        /** 领奖凭据 */\r\n        keys: string[]\r\n    } | {\r\n        type: \"群战拼图\",\r\n        poolId: string,\r\n        desc: string\r\n    },\r\n    status: \"待领取\" | \"待发出\" | \"已发出\",\r\n    /** 中奖时间 */\r\n    createTime: number,\r\n    meta?: any\r\n}"
    },
    "models/MyAward/MyAwardLuckyBox": {
      "ts": "interface ReqMyAwardLuckyBox {\r\n    type: \"LuckyBox\",\r\n    selectedPoolItemId?: string,\r\n    /** 宝箱标题 */\r\n    title: string,\r\n    /** 宝箱描述 */\r\n    desc: string,\r\n    _id: string,\r\n    uid: string,\r\n    nickname: string,\r\n    jobNo: string,\r\n    /** 奖品名称 */\r\n    name: string,\r\n    /** 奖品图标 */\r\n    icon: string,\r\n    /** 奖品来源 */\r\n    from: {\r\n        type: \"日常抽奖\",\r\n        desc: string\r\n    } | {\r\n        type: \"活动\",\r\n        activityId: string,\r\n        desc: string\r\n    } | {\r\n        type: \"周排名\" | \"月排名\",\r\n        desc: string,\r\n        period: {\r\n            /** yyyy-MM-dd */\r\n            startDate: string,\r\n            endDate: string\r\n        },\r\n        /** 自己的排名 */\r\n        rank: number\r\n    } | {\r\n        type: \"Custom\",\r\n        poolId: string,\r\n        desc: string,\r\n        /** 领奖凭据 */\r\n        keys: string[]\r\n    } | {\r\n        type: \"群战拼图\",\r\n        poolId: string,\r\n        desc: string\r\n    },\r\n    status: \"待领取\" | \"待发出\" | \"已发出\",\r\n    /** 中奖时间 */\r\n    createTime: number,\r\n    meta?: any\r\n}"
    },
    "award/PtlGetToReceivedInfo/ReqGetToReceivedInfo": {
      "ts": "interface ReqReqGetToReceivedInfo { sso?: string }"
    },
    "award/PtlGetToReceivedInfo/ResGetToReceivedInfo": {
      "ts": "interface ReqResGetToReceivedInfo {\r\n    luckyBoxIds: string[],\r\n    myAwardIds: string[],\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "award/PtlGetWorkAreas/ReqGetWorkAreas": {
      "ts": "interface ReqReqGetWorkAreas { sso?: string }"
    },
    "award/PtlGetWorkAreas/ResGetWorkAreas": {
      "ts": "interface ReqResGetWorkAreas {\r\n    workAreas: {\r\n        city: string,\r\n        areas: string[]\r\n    }[],\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "award/PtlOpenLuckyBox/ReqOpenLuckyBox": {
      "ts": "interface ReqReqOpenLuckyBox {\r\n    /** LuckyBox的MyAward ID */\r\n    luckyBoxId: string,\r\n    sso?: string\r\n}"
    },
    "award/PtlOpenLuckyBox/ResOpenLuckyBox": {
      "ts": "interface ReqResOpenLuckyBox {\r\n    title: string,\r\n    desc: string,\r\n    from: {\r\n        type: \"周排名\" | \"月排名\",\r\n        desc: string,\r\n        period: {\r\n            /** yyyy-MM-dd */\r\n            startDate: string,\r\n            endDate: string\r\n        },\r\n        /** 自己的排名 */\r\n        rank: number\r\n    } | {\r\n        type: \"Custom\",\r\n        poolId: string,\r\n        desc: string,\r\n        /** 领奖凭据 */\r\n        keys: string[]\r\n    },\r\n    poolItems: {\r\n        _id: string,\r\n        name: string,\r\n        icon: string,\r\n        /** 有此值则被锁住无法选择 */\r\n        lockedMsg?: string\r\n    }[],\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "award/PtlOpenLuckyBox/LuckyBoxFrom": {
      "ts": "type ReqLuckyBoxFrom = {\r\n    type: \"周排名\" | \"月排名\",\r\n    desc: string,\r\n    period: {\r\n        /** yyyy-MM-dd */\r\n        startDate: string,\r\n        endDate: string\r\n    },\r\n    /** 自己的排名 */\r\n    rank: number\r\n} | {\r\n    type: \"Custom\",\r\n    poolId: string,\r\n    desc: string,\r\n    /** 领奖凭据 */\r\n    keys: string[]\r\n}"
    },
    "award/PtlSelectLuckyBoxAward/ReqSelectLuckyBoxAward": {
      "ts": "interface ReqReqSelectLuckyBoxAward {\r\n    /** LuckyBox对应的 MyAward ID */\r\n    luckyBoxId: string,\r\n    /** 选择的奖品的 AwardPoolItem ID */\r\n    poolItemId: string,\r\n    sso?: string\r\n}"
    },
    "award/PtlSelectLuckyBoxAward/ResSelectLuckyBoxAward": {
      "ts": "interface ReqResSelectLuckyBoxAward {\r\n    award: {\r\n        type: \"实物\",\r\n        /** 登记的收货地址 */\r\n        address?: {\r\n            type: \"快递\",\r\n            province: string,\r\n            city: string,\r\n            area: string,\r\n            addr: string,\r\n            /** 登记时间 */\r\n            time: number,\r\n            name: string,\r\n            tel: string\r\n        } | {\r\n            type: \"工区自提\",\r\n            city: string,\r\n            /** 工区 */\r\n            area: string,\r\n            /** 登记时间 */\r\n            time: number,\r\n            name: string,\r\n            tel: string\r\n        },\r\n        /** 物流信息 */\r\n        allowedDeliveryType: (\"快递\" | \"工区自提\")[],\r\n        delivery?: {\r\n            time: number,\r\n            /** 快递公司 */\r\n            expressCompany: string,\r\n            /** 快递单号 */\r\n            expressNo: string\r\n        },\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    } | {\r\n        type: \"虚拟\",\r\n        /** 发货的卡密 */\r\n        delivery?: {\r\n            time: number,\r\n            content: string\r\n        },\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    } | {\r\n        type: \"LuckyBox\",\r\n        selectedPoolItemId?: string,\r\n        /** 宝箱标题 */\r\n        title: string,\r\n        /** 宝箱描述 */\r\n        desc: string,\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "award/PtlSubmitAddr/ReqSubmitAddr": {
      "ts": "interface ReqReqSubmitAddr {\r\n    myAwardId: string,\r\n    address: {\r\n        type: \"快递\",\r\n        province: string,\r\n        city: string,\r\n        area: string,\r\n        addr: string,\r\n        /** 登记时间 */\r\n        time: number,\r\n        name: string,\r\n        tel: string\r\n    } | {\r\n        type: \"工区自提\",\r\n        city: string,\r\n        /** 工区 */\r\n        area: string,\r\n        /** 登记时间 */\r\n        time: number,\r\n        name: string,\r\n        tel: string\r\n    },\r\n    sso?: string\r\n}"
    },
    "award/PtlSubmitAddr/ResSubmitAddr": {
      "ts": "interface ReqResSubmitAddr {\r\n    newMyAward: {\r\n        type: \"实物\",\r\n        /** 登记的收货地址 */\r\n        address?: {\r\n            type: \"快递\",\r\n            province: string,\r\n            city: string,\r\n            area: string,\r\n            addr: string,\r\n            /** 登记时间 */\r\n            time: number,\r\n            name: string,\r\n            tel: string\r\n        } | {\r\n            type: \"工区自提\",\r\n            city: string,\r\n            /** 工区 */\r\n            area: string,\r\n            /** 登记时间 */\r\n            time: number,\r\n            name: string,\r\n            tel: string\r\n        },\r\n        /** 物流信息 */\r\n        allowedDeliveryType: (\"快递\" | \"工区自提\")[],\r\n        delivery?: {\r\n            time: number,\r\n            /** 快递公司 */\r\n            expressCompany: string,\r\n            /** 快递单号 */\r\n            expressNo: string\r\n        },\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    } | {\r\n        type: \"虚拟\",\r\n        /** 发货的卡密 */\r\n        delivery?: {\r\n            time: number,\r\n            content: string\r\n        },\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    } | {\r\n        type: \"LuckyBox\",\r\n        selectedPoolItemId?: string,\r\n        /** 宝箱标题 */\r\n        title: string,\r\n        /** 宝箱描述 */\r\n        desc: string,\r\n        _id: string,\r\n        uid: string,\r\n        nickname: string,\r\n        jobNo: string,\r\n        /** 奖品名称 */\r\n        name: string,\r\n        /** 奖品图标 */\r\n        icon: string,\r\n        /** 奖品来源 */\r\n        from: {\r\n            type: \"日常抽奖\",\r\n            desc: string\r\n        } | {\r\n            type: \"活动\",\r\n            activityId: string,\r\n            desc: string\r\n        } | {\r\n            type: \"周排名\" | \"月排名\",\r\n            desc: string,\r\n            period: {\r\n                /** yyyy-MM-dd */\r\n                startDate: string,\r\n                endDate: string\r\n            },\r\n            /** 自己的排名 */\r\n            rank: number\r\n        } | {\r\n            type: \"Custom\",\r\n            poolId: string,\r\n            desc: string,\r\n            /** 领奖凭据 */\r\n            keys: string[]\r\n        } | {\r\n            type: \"群战拼图\",\r\n            poolId: string,\r\n            desc: string\r\n        },\r\n        status: \"待领取\" | \"待发出\" | \"已发出\",\r\n        /** 中奖时间 */\r\n        createTime: number,\r\n        meta?: any\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "daily/PtlFinishRound/ReqFinishRound": {
      "ts": "interface ReqReqFinishRound {\r\n    _id: string,\r\n    self: {\r\n        operations: ({\r\n            /** 选择了第几个选项 从0开始 */\r\n            answer: number,\r\n            /** 答题所用的时间 */\r\n            usedTime: number,\r\n            /** 是否答对 */\r\n            isRight: boolean,\r\n            /** 得分 */\r\n            score: {\r\n                right: number,\r\n                speed: number\r\n            }\r\n        } | null)[],\r\n        score: number,\r\n        /** 战斗结果 胜利/失败/平局 */\r\n        result: \"win\" | \"lose\" | \"draw\",\r\n        /** 字节范特质得分 */\r\n        byteStyleScore: { [key: string]: number },\r\n        medals: number\r\n    },\r\n    /** 对局所有题目的数量 */\r\n    questionNum: number,\r\n    questionGroupId: string,\r\n    sso?: string\r\n}"
    },
    "daily/PtlFinishRound/ResFinishRound": {
      "ts": "interface ReqResFinishRound {\r\n    pointsChange: number,\r\n    medalsChange: number,\r\n    byteStyleChange: {\r\n        name: string,\r\n        amount: number\r\n    }[],\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "daily/PtlStartRound/ReqStartRound": {
      "ts": "interface ReqReqStartRound {\r\n    type: \"practise\" | \"match\",\r\n    sso?: string\r\n}"
    },
    "daily/PtlStartRound/DailyRoundType": {
      "ts": "type ReqDailyRoundType = \"practise\" | \"match\""
    },
    "daily/PtlStartRound/ResStartRound": {
      "ts": "interface ReqResStartRound {\r\n    _id: string,\r\n    questions: {\r\n        _id: string,\r\n        /** options对应题库的索引，>=0为错误答案索引，-1为正确答案 */\r\n        questionBankIndices: number[],\r\n        category: string,\r\n        question: string,\r\n        options: string[],\r\n        rightAnswerIndex: number,\r\n        byteStyle: { [key: string]: number },\r\n        provider?: string,\r\n        /** 题目解析 */\r\n        analysis?: string,\r\n        /** 题目解析链接 */\r\n        analysisUrl?: string\r\n    }[],\r\n    opponent: {\r\n        userInfo: {\r\n            uid: string,\r\n            nickname: string,\r\n            avatar: string,\r\n            gender: 0 | 1 | 2,\r\n            medals: number\r\n        },\r\n        operations: ({\r\n            /** 选择了第几个选项 从0开始 */\r\n            answer: number,\r\n            /** 答题所用的时间 */\r\n            usedTime: number,\r\n            /** 是否答对 */\r\n            isRight: boolean,\r\n            /** 得分 */\r\n            score: {\r\n                right: number,\r\n                speed: number\r\n            }\r\n        } | null)[],\r\n        score: number,\r\n        byteStyleScore: { [key: string]: number },\r\n        /** 对手对局的记录ID 如果为空 说明这是一个AI */\r\n        roundId?: string\r\n    },\r\n    /** 问题组合标识，Finish时透传 */\r\n    questionGroupId: string,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "data/PtlGetPlayData/ReqGetPlayData": {
      "ts": "interface ReqReqGetPlayData { sso?: string }"
    },
    "data/PtlGetPlayData/ResGetPlayData": {
      "ts": "interface ReqResGetPlayData {\r\n    data: { energy?: number },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "models/PlayData/PlayData": {
      "ts": "interface ReqPlayData { energy: number }"
    },
    "data/PtlSetPlayData/ReqSetPlayData": {
      "ts": "interface ReqReqSetPlayData {\r\n    data: { energy: number },\r\n    sso?: string\r\n}"
    },
    "data/PtlSetPlayData/ResSetPlayData": {
      "ts": "interface ReqResSetPlayData {\r\n    updateTime: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "draw/PtlDraw/ReqDraw": {
      "ts": "interface ReqReqDraw {\r\n    ticket: { type: \"daily\" } | {\r\n        type: \"activity\",\r\n        activityId: string,\r\n        roundId: string\r\n    },\r\n    sso?: string\r\n}"
    },
    "../models/AwardUtil/DrawTicket": {
      "ts": "type ReqDrawTicket = { type: \"daily\" } | {\r\n    type: \"activity\",\r\n    activityId: string,\r\n    roundId: string\r\n}"
    },
    "../models/AwardUtil/DrawTicketDaily": {
      "ts": "interface ReqDrawTicketDaily { type: \"daily\" }"
    },
    "../models/AwardUtil/DrawTicketActivity": {
      "ts": "interface ReqDrawTicketActivity {\r\n    type: \"activity\",\r\n    activityId: string,\r\n    roundId: string\r\n}"
    },
    "draw/PtlDraw/ResDraw": {
      "ts": "interface ReqResDraw {\r\n    award: {\r\n        _id: string,\r\n        name: string,\r\n        icon: string,\r\n        myAwardId: string\r\n    } & ({\r\n        type: \"实物\",\r\n        allowedDeliveryType: (\"快递\" | \"工区自提\")[]\r\n    } | { type: \"虚拟\" | \"NoAward\" }),\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "draw/PtlGetDrawInfo/ReqGetDrawInfo": {
      "ts": "interface ReqReqGetDrawInfo {\r\n    ticket: { type: \"daily\" } | {\r\n        type: \"activity\",\r\n        activityId: string,\r\n        roundId: string\r\n    },\r\n    sso?: string\r\n}"
    },
    "draw/PtlGetDrawInfo/ResGetDrawInfo": {
      "ts": "interface ReqResGetDrawInfo {\r\n    /** 奖品列表 */\r\n    awards: {\r\n        _id: string,\r\n        type: \"实物\" | \"虚拟\" | \"NoAward\",\r\n        name: string,\r\n        icon: string\r\n    }[],\r\n    /** 如果req的type为activity，则此项必有值 */\r\n    activityConfig?: {\r\n        _id: string,\r\n        /** 是否启用 */\r\n        isEnabled: boolean,\r\n        /** 活动名称 */\r\n        name: string,\r\n        /** 首页的Banner图地址 */\r\n        homeBanner?: string,\r\n        /** 活动首页的标题图 */\r\n        titleImage: string,\r\n        /** 活动首页的详情图 */\r\n        descImage: string,\r\n        /** 开始时间 */\r\n        startTime: number,\r\n        /** 结束时间 */\r\n        endTime: number,\r\n        /** 每个用户最多参与几次 */\r\n        maxPlayTimesPerUser: number,\r\n        /** 是否启用字节范特质显示 */\r\n        showByteStyle: boolean,\r\n        /** 攻略地址 */\r\n        tacticUrl?: string,\r\n        /** 是群战模式 */\r\n        qunzhan?: {/** 对几道题给多少积分 */\r\n            awards: { [key: number]: number }\r\n        },\r\n        joinedUserNum: number\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "events/2021-10-24/PtlGetStatus/ReqGetStatus": {
      "ts": "interface ReqReqGetStatus { sso?: string }"
    },
    "events/2021-10-24/PtlGetStatus/ResGetStatus": {
      "ts": "interface ReqResGetStatus {\r\n    remainedExpTimes: number,\r\n    formalResult?: {\r\n        rightNum: number,\r\n        addPoints: number\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "events/2021-10-24/PtlStartExp/ReqStartExp": {
      "ts": "interface ReqReqStartExp { sso?: string }"
    },
    "events/2021-10-24/PtlStartExp/ResStartExp": {
      "ts": "interface ReqResStartExp {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "home/PtlGetHomeInfo/ReqGetHomeInfo": {
      "ts": "interface ReqReqGetHomeInfo { sso?: string }"
    },
    "home/PtlGetHomeInfo/ResGetHomeInfo": {
      "ts": "interface ReqResGetHomeInfo {\r\n    /** 小红点 */\r\n    dots: {\r\n        /** 用户出题（红点） */\r\n        ugc: boolean,\r\n        /** 奖品（带数字红点） */\r\n        award: number\r\n    },\r\n    /** 自动开宝箱（每开启一个，dots.award -1） */\r\n    luckyBoxIds: string[],\r\n    /** 活动Banner */\r\n    activity?: {\r\n        activityId: string,\r\n        banner: string\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "mistake/PtlGetMyMistakes/ReqGetMyMistakes": {
      "ts": "interface ReqReqGetMyMistakes {\r\n    /** 从1开始 */\r\n    page: number,\r\n    pageSize: number,\r\n    sso?: string\r\n}"
    },
    "mistake/PtlGetMyMistakes/ResGetMyMistakes": {
      "ts": "interface ReqResGetMyMistakes {\r\n    data: {\r\n        question: string,\r\n        options: string[],\r\n        /** 打对勾的选项 */\r\n        rightIndex: number,\r\n        /** 打红叉的选项 */\r\n        wrongIndex: number,\r\n        /** 题目解析 */\r\n        analysis?: string,\r\n        /** 题目解析链接 */\r\n        analysisUrl?: string\r\n    }[],\r\n    total: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "platform/PtlLoginDev/ReqLoginDev": {
      "ts": "interface ReqReqLoginDev {\r\n    loginKey: string,\r\n    from?: string,\r\n    fromUid?: string,\r\n    sso?: string\r\n}"
    },
    "platform/PtlLoginDev/ResLoginDev": {
      "ts": "interface ReqResLoginDev {\r\n    user: {\r\n        _id: string,\r\n        nickname: string,\r\n        /** 小号头像 72x72 */\r\n        avatar: string,\r\n        /** 中号头像 240x240 */\r\n        avatarMiddle: string,\r\n        /** 大号头像 640x640 */\r\n        avatarBig: string,\r\n        gender: 0 | 1 | 2,\r\n        /** 工号 */\r\n        jobNo: string,\r\n        /** 地区 */\r\n        country: string,\r\n        province: string,\r\n        city: string,\r\n        from?: string,\r\n        fromUid?: string,\r\n        /** 积分 */\r\n        points: number,\r\n        /** 段位奖章数量 */\r\n        medals: number,\r\n        /** 字节范特质称号 */\r\n        byteStyle: { [key: string]: number },\r\n        /** 体力 */\r\n        energy: number,\r\n        /** 拉新人数 */\r\n        invitedNewUser?: number,\r\n        createTime: number\r\n    },\r\n    playData: { energy?: number },\r\n    isFirstLogin: boolean,\r\n    __refresh: { sso: string }\r\n}"
    },
    "platform/ResLogin/ResLogin": {
      "ts": "interface ReqResLogin {\r\n    user: {\r\n        _id: string,\r\n        nickname: string,\r\n        /** 小号头像 72x72 */\r\n        avatar: string,\r\n        /** 中号头像 240x240 */\r\n        avatarMiddle: string,\r\n        /** 大号头像 640x640 */\r\n        avatarBig: string,\r\n        gender: 0 | 1 | 2,\r\n        /** 工号 */\r\n        jobNo: string,\r\n        /** 地区 */\r\n        country: string,\r\n        province: string,\r\n        city: string,\r\n        from?: string,\r\n        fromUid?: string,\r\n        /** 积分 */\r\n        points: number,\r\n        /** 段位奖章数量 */\r\n        medals: number,\r\n        /** 字节范特质称号 */\r\n        byteStyle: { [key: string]: number },\r\n        /** 体力 */\r\n        energy: number,\r\n        /** 拉新人数 */\r\n        invitedNewUser?: number,\r\n        createTime: number\r\n    },\r\n    playData: { energy?: number },\r\n    isFirstLogin: boolean,\r\n    __refresh: { sso: string }\r\n}"
    },
    "models/CurrentUser/CurrentUser": {
      "ts": "interface ReqCurrentUser {\r\n    _id: string,\r\n    nickname: string,\r\n    /** 小号头像 72x72 */\r\n    avatar: string,\r\n    /** 中号头像 240x240 */\r\n    avatarMiddle: string,\r\n    /** 大号头像 640x640 */\r\n    avatarBig: string,\r\n    gender: 0 | 1 | 2,\r\n    /** 工号 */\r\n    jobNo: string,\r\n    /** 地区 */\r\n    country: string,\r\n    province: string,\r\n    city: string,\r\n    from?: string,\r\n    fromUid?: string,\r\n    /** 积分 */\r\n    points: number,\r\n    /** 段位奖章数量 */\r\n    medals: number,\r\n    /** 字节范特质称号 */\r\n    byteStyle: { [key: string]: number },\r\n    /** 体力 */\r\n    energy: number,\r\n    /** 拉新人数 */\r\n    invitedNewUser?: number,\r\n    createTime: number\r\n}"
    },
    "platform/PtlLoginFeishu/ReqLoginFeishu": {
      "ts": "interface ReqReqLoginFeishu {\r\n    code: string,\r\n    from?: string,\r\n    fromUid?: string,\r\n    sso?: string\r\n}"
    },
    "platform/PtlLoginFeishu/ResLoginFeishu": {
      "ts": "interface ReqResLoginFeishu {\r\n    user: {\r\n        _id: string,\r\n        nickname: string,\r\n        /** 小号头像 72x72 */\r\n        avatar: string,\r\n        /** 中号头像 240x240 */\r\n        avatarMiddle: string,\r\n        /** 大号头像 640x640 */\r\n        avatarBig: string,\r\n        gender: 0 | 1 | 2,\r\n        /** 工号 */\r\n        jobNo: string,\r\n        /** 地区 */\r\n        country: string,\r\n        province: string,\r\n        city: string,\r\n        from?: string,\r\n        fromUid?: string,\r\n        /** 积分 */\r\n        points: number,\r\n        /** 段位奖章数量 */\r\n        medals: number,\r\n        /** 字节范特质称号 */\r\n        byteStyle: { [key: string]: number },\r\n        /** 体力 */\r\n        energy: number,\r\n        /** 拉新人数 */\r\n        invitedNewUser?: number,\r\n        createTime: number\r\n    },\r\n    playData: { energy?: number },\r\n    isFirstLogin: boolean,\r\n    __refresh: { sso: string }\r\n}"
    },
    "PtlGetGameConfig/ReqGetGameConfig": {
      "ts": "interface ReqReqGetGameConfig {\r\n    version?: number,\r\n    sso?: string\r\n}"
    },
    "PtlGetGameConfig/ResGetGameConfig": {
      "ts": "interface ReqResGetGameConfig {\r\n    version: number,\r\n    /** config返回为空，代表version没变，所以不需要再返回（节省流量） */\r\n    config?: {\r\n        /** 积分数值统一配置 */\r\n        points: {\r\n            /** 新人初始积分 */\r\n            default: number,\r\n            round: {\r\n                activity: {\r\n                    win: number,\r\n                    lose: number,\r\n                    draw: number\r\n                },\r\n1v1: {\r\n    win: number,\r\n        lose: number,\r\n            draw: number\r\n},\r\nqunzhan: {\r\n    win: number,\r\n        lose: number\r\n}\r\n},\r\n/** 抽奖消耗积分 */\r\ndailyDraw: number,\r\n    /** 出题通过奖励积分 */\r\n    ugcAward: number,\r\n        /** 兑换体力消耗积分 */\r\n        buyEnergy: {\r\n    /** 兑换一次消耗的积分价格 */\r\n    points: number,\r\n        /** 兑换一次获得的体力数量 */\r\n        energy: number\r\n},\r\n/** 每日免费体力 */\r\nfreeEnergy: {\r\n    /** 体力恢复时间 (0~23)[] */\r\n    hours: number[],\r\n        /** 每次免费体力的恢复数量 */\r\n        energy: number\r\n},\r\n/** 拉新有礼奖励 */\r\ninviteNewUser: number\r\n},\r\n/** 奖章数值统一配置 */\r\nmedals: {/** 新人初始奖章 */\r\ndefault: number\r\n},\r\n/** 段位配置 */\r\nlevels: {\r\n    /** 段位ID（用于拿图标啊之类的） */\r\n    id: string,\r\n        name: string,\r\n            minMedals: number,\r\n                maxMedals: number\r\n} [],\r\n    round: {\r\n    questionScore: {\r\n        /** 正确得分 */\r\n        right: number,\r\n            /** 速度得分 */\r\n            speed: number\r\n    },\r\n    /** 单局时长（毫秒） */\r\n    roundTime: number,\r\n        /** 一局最多颁发几个字节范奖杯 */\r\n        maxMatchedTimes: {\r\n        activity: number,\r\n            match: number,\r\n                practise: number\r\n    },\r\n    /** AI的难度 */\r\n    aiDifficulty: {\r\n        activity: number,\r\n            match: number,\r\n                practise: number\r\n    }\r\n},\r\nactivity: { },\r\n/** 抽奖模块 */\r\ndraw: {/** 日常抽奖每日最多几次 */\r\n    maxDailyLimit: number\r\n},\r\n/** 允许进入的雇员类型 为undefined则代表所有人 */\r\nlimitEmployeeType ?: string[],\r\n    /** 排名奖励领取条件 */\r\n    rankAward: {\r\n    /** 排名小于等于多少可获得周排名奖励 */\r\n    maxWeekRank: number,\r\n        /** 排名小于等于多少可获得月排名奖励 */\r\n        maxMonthRank: number\r\n},\r\ntexts: {\r\n    ugcRules: string,\r\n        dailyDrawRules: string\r\n},\r\n/** 游戏运营结束提醒 */\r\nendAlert ?: {\r\n    /** 进入游戏时的提醒 */\r\n    entry: {\r\n        /** 此时间后开始出现 */\r\n        endTime: number,\r\n        title: string,\r\n        content: string,\r\n        btnText: string\r\n    },\r\n    /** 日常模式关闭提醒 */\r\n    daily: {\r\n        /** 1v1 模式，此时间后开始出现 */\r\n        endTime1v1: number,\r\n        /** 群战模式，此时间后开始出现 */\r\n        endTimeQunzhan: number,\r\n        title: string,\r\n        content: string,\r\n        btnText: string\r\n    },\r\n    /** 排行榜定格在某一刻 */\r\n    rankEnd?: {\r\n        endTime: number,\r\n        weekText: string,\r\n        monthText: string\r\n    }\r\n}\r\n},\r\n__refresh ?: {\r\n    sso?: string,\r\n    medals?: number,\r\n    points?: number,\r\n    energy?: number\r\n}\r\n}"
    },
    "models/GameConfig/GameConfig": {
      "ts": "interface ReqGameConfig {\r\n    /** 积分数值统一配置 */\r\n    points: {\r\n        /** 新人初始积分 */\r\n        default: number,\r\n        round: {\r\n            activity: {\r\n                win: number,\r\n                lose: number,\r\n                draw: number\r\n            },\r\n1v1: {\r\n    win: number,\r\n        lose: number,\r\n            draw: number\r\n},\r\nqunzhan: {\r\n    win: number,\r\n        lose: number\r\n}\r\n},\r\n/** 抽奖消耗积分 */\r\ndailyDraw: number,\r\n    /** 出题通过奖励积分 */\r\n    ugcAward: number,\r\n        /** 兑换体力消耗积分 */\r\n        buyEnergy: {\r\n    /** 兑换一次消耗的积分价格 */\r\n    points: number,\r\n        /** 兑换一次获得的体力数量 */\r\n        energy: number\r\n},\r\n/** 每日免费体力 */\r\nfreeEnergy: {\r\n    /** 体力恢复时间 (0~23)[] */\r\n    hours: number[],\r\n        /** 每次免费体力的恢复数量 */\r\n        energy: number\r\n},\r\n/** 拉新有礼奖励 */\r\ninviteNewUser: number\r\n},\r\n/** 奖章数值统一配置 */\r\nmedals: {/** 新人初始奖章 */\r\ndefault: number\r\n},\r\n/** 段位配置 */\r\nlevels: {\r\n    /** 段位ID（用于拿图标啊之类的） */\r\n    id: string,\r\n        name: string,\r\n            minMedals: number,\r\n                maxMedals: number\r\n} [],\r\n    round: {\r\n    questionScore: {\r\n        /** 正确得分 */\r\n        right: number,\r\n            /** 速度得分 */\r\n            speed: number\r\n    },\r\n    /** 单局时长（毫秒） */\r\n    roundTime: number,\r\n        /** 一局最多颁发几个字节范奖杯 */\r\n        maxMatchedTimes: {\r\n        activity: number,\r\n            match: number,\r\n                practise: number\r\n    },\r\n    /** AI的难度 */\r\n    aiDifficulty: {\r\n        activity: number,\r\n            match: number,\r\n                practise: number\r\n    }\r\n},\r\nactivity: { },\r\n/** 抽奖模块 */\r\ndraw: {/** 日常抽奖每日最多几次 */\r\n    maxDailyLimit: number\r\n},\r\n/** 允许进入的雇员类型 为undefined则代表所有人 */\r\nlimitEmployeeType ?: string[],\r\n    /** 排名奖励领取条件 */\r\n    rankAward: {\r\n    /** 排名小于等于多少可获得周排名奖励 */\r\n    maxWeekRank: number,\r\n        /** 排名小于等于多少可获得月排名奖励 */\r\n        maxMonthRank: number\r\n},\r\ntexts: {\r\n    ugcRules: string,\r\n        dailyDrawRules: string\r\n},\r\n/** 游戏运营结束提醒 */\r\nendAlert ?: {\r\n    /** 进入游戏时的提醒 */\r\n    entry: {\r\n        /** 此时间后开始出现 */\r\n        endTime: number,\r\n        title: string,\r\n        content: string,\r\n        btnText: string\r\n    },\r\n    /** 日常模式关闭提醒 */\r\n    daily: {\r\n        /** 1v1 模式，此时间后开始出现 */\r\n        endTime1v1: number,\r\n        /** 群战模式，此时间后开始出现 */\r\n        endTimeQunzhan: number,\r\n        title: string,\r\n        content: string,\r\n        btnText: string\r\n    },\r\n    /** 排行榜定格在某一刻 */\r\n    rankEnd?: {\r\n        endTime: number,\r\n        weekText: string,\r\n        monthText: string\r\n    }\r\n}\r\n}"
    },
    "qunzhan/PtlGetQunzhanFirstRoundNum/ReqGetQunzhanFirstRoundNum": {
      "ts": "interface ReqReqGetQunzhanFirstRoundNum { sso?: string }"
    },
    "qunzhan/PtlGetQunzhanFirstRoundNum/ResGetQunzhanFirstRoundNum": {
      "ts": "interface ReqResGetQunzhanFirstRoundNum {\r\n    firstRoundNum: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "qunzhan/PtlGetQunzhanIndexInfo/ReqGetQunzhanIndexInfo": {
      "ts": "interface ReqReqGetQunzhanIndexInfo { sso?: string }"
    },
    "qunzhan/PtlGetQunzhanIndexInfo/ResGetQunzhanIndexInfo": {
      "ts": "interface ReqResGetQunzhanIndexInfo {\r\n    list: {\r\n        richText: string,\r\n        time: string\r\n    }[],\r\n    onlineUserNum: number,\r\n    roomNum: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "qunzhan/PtlGetQunzhanPictureAward/ReqGetQunzhanPictureAward": {
      "ts": "interface ReqReqGetQunzhanPictureAward {\r\n    pictureId: string,\r\n    sso?: string\r\n}"
    },
    "qunzhan/PtlGetQunzhanPictureAward/ResGetQunzhanPictureAward": {
      "ts": "interface ReqResGetQunzhanPictureAward { luckyBoxId: string }"
    },
    "qunzhan/PtlGetQunzhanPictureConfigs/ReqGetQunzhanPictureConfigs": {
      "ts": "interface ReqReqGetQunzhanPictureConfigs { sso?: string }"
    },
    "qunzhan/PtlGetQunzhanPictureConfigs/ResGetQunzhanPictureConfigs": {
      "ts": "interface ReqResGetQunzhanPictureConfigs {\r\n    confs: ({\r\n        _id: string,\r\n        name: string,\r\n        url: string,\r\n        col: number,\r\n        row: number\r\n    } & {\r\n        awards: {\r\n            name: string,\r\n            icon: string\r\n        }[]\r\n    })[],\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "models/QunzhanPictureConfig/QunzhanPictureConfig": {
      "ts": "interface ReqQunzhanPictureConfig {\r\n    _id: string,\r\n    name: string,\r\n    url: string,\r\n    col: number,\r\n    row: number\r\n}"
    },
    "qunzhan/PtlGetQunzhanRoomInfo/ReqGetQunzhanRoomInfo": {
      "ts": "type ReqReqGetQunzhanRoomInfo = { sso?: string } & ({ roomId: string } | {/** 面对面开黑码 */\r\n    code: string\r\n})"
    },
    "qunzhan/PtlGetQunzhanRoomInfo/ResGetQunzhanRoomInfo": {
      "ts": "interface ReqResGetQunzhanRoomInfo {\r\n    room?: {\r\n        _id: string,\r\n        serverUrl: string,\r\n        /** 房间状态 */\r\n        state: \"Waiting\" | \"Matching\" | \"Gaming\",\r\n        /** 是否公共房间 */\r\n        isPublic: boolean,\r\n        isActive: boolean,\r\n        /** 强制新手题目判定依据 */\r\n        firstRoundNum?: number,\r\n        /** 活动模式，用于指定题目 */\r\n        activityId?: string,\r\n        /** 房间内成员（第一位是房主） */\r\n        users: {\r\n            uid: string,\r\n            nickname: string,\r\n            avatar: string,\r\n            skinId: string,\r\n            joinBy: \"随机匹配\" | \"邀请同事\" | \"面对面开黑\",\r\n            isAI?: boolean,\r\n            activity?: {\r\n                activityId: string,\r\n                isFormal: boolean\r\n            }\r\n        }[],\r\n        roomStat: {\r\n            uid: string,\r\n            nickname: string,\r\n            avatar: string,\r\n            winRounds: number\r\n        }[],\r\n        /** 面对面开黑房间码 */\r\n        code?: string,\r\n        createTime: number,\r\n        lastActiveTime: number,\r\n        startMatchTime?: number,\r\n        startGameTime?: number\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "models/QunzhanRoom/QunzhanRoom": {
      "ts": "interface ReqQunzhanRoom {\r\n    _id: string,\r\n    serverUrl: string,\r\n    /** 房间状态 */\r\n    state: \"Waiting\" | \"Matching\" | \"Gaming\",\r\n    /** 是否公共房间 */\r\n    isPublic: boolean,\r\n    isActive: boolean,\r\n    /** 强制新手题目判定依据 */\r\n    firstRoundNum?: number,\r\n    /** 活动模式，用于指定题目 */\r\n    activityId?: string,\r\n    /** 房间内成员（第一位是房主） */\r\n    users: {\r\n        uid: string,\r\n        nickname: string,\r\n        avatar: string,\r\n        skinId: string,\r\n        joinBy: \"随机匹配\" | \"邀请同事\" | \"面对面开黑\",\r\n        isAI?: boolean,\r\n        activity?: {\r\n            activityId: string,\r\n            isFormal: boolean\r\n        }\r\n    }[],\r\n    roomStat: {\r\n        uid: string,\r\n        nickname: string,\r\n        avatar: string,\r\n        winRounds: number\r\n    }[],\r\n    /** 面对面开黑房间码 */\r\n    code?: string,\r\n    createTime: number,\r\n    lastActiveTime: number,\r\n    startMatchTime?: number,\r\n    startGameTime?: number\r\n}"
    },
    "models/QunzhanRoom/QunzhanRoomState": {
      "ts": "type ReqQunzhanRoomState = \"Waiting\" | \"Matching\" | \"Gaming\""
    },
    "models/QunzhanRoom/QunzhanRoomUser": {
      "ts": "interface ReqQunzhanRoomUser {\r\n    uid: string,\r\n    nickname: string,\r\n    avatar: string,\r\n    skinId: string,\r\n    joinBy: \"随机匹配\" | \"邀请同事\" | \"面对面开黑\",\r\n    isAI?: boolean,\r\n    activity?: {\r\n        activityId: string,\r\n        isFormal: boolean\r\n    }\r\n}"
    },
    "qunzhan/PtlGetQunzhanUser/ReqGetQunzhanUser": {
      "ts": "interface ReqReqGetQunzhanUser { sso?: string }"
    },
    "qunzhan/PtlGetQunzhanUser/ResGetQunzhanUser": {
      "ts": "interface ReqResGetQunzhanUser {\r\n    qunzhanUser: {\r\n        /** 同 uid */\r\n        _id: string,\r\n        currentSkinId: string,\r\n        /** 解锁的拼图 */\r\n        pictures: { [key: string]: { [key: number]: number } },\r\n        /** 正在收集的拼图 ID */\r\n        currentPictureId?: string,\r\n        /** 已经集齐的拼图 ID */\r\n        awardedPictureIds: string[]\r\n    },\r\n    isFirstTime?: boolean,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "models/QunzhanUser/QunzhanUser": {
      "ts": "interface ReqQunzhanUser {\r\n    /** 同 uid */\r\n    _id: string,\r\n    currentSkinId: string,\r\n    /** 解锁的拼图 */\r\n    pictures: { [key: string]: { [key: number]: number } },\r\n    /** 正在收集的拼图 ID */\r\n    currentPictureId?: string,\r\n    /** 已经集齐的拼图 ID */\r\n    awardedPictureIds: string[]\r\n}"
    },
    "qunzhan/PtlSelectQunzhanSkin/ReqSelectQunzhanSkin": {
      "ts": "interface ReqReqSelectQunzhanSkin {\r\n    skinId: string,\r\n    sso?: string\r\n}"
    },
    "qunzhan/PtlSelectQunzhanSkin/ResSelectQunzhanSkin": {
      "ts": "interface ReqResSelectQunzhanSkin {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "qunzhan/PtlSetCurrentQunzhanPicture/ReqSetCurrentQunzhanPicture": {
      "ts": "interface ReqReqSetCurrentQunzhanPicture {\r\n    picId: string,\r\n    sso?: string\r\n}"
    },
    "qunzhan/PtlSetCurrentQunzhanPicture/ResSetCurrentQunzhanPicture": {
      "ts": "interface ReqResSetCurrentQunzhanPicture {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "rank/PtlGetRankList/ReqGetRankList": {
      "ts": "interface ReqReqGetRankList {\r\n    rankId: string,\r\n    score?: number,\r\n    topCount: number,\r\n    nearCount: number,\r\n    sso?: string\r\n}"
    },
    "rank/PtlGetRankList/ResGetRankList": {
      "ts": "interface ReqResGetRankList {\r\n    list: {\r\n        nickName: string,\r\n        avatar: string,\r\n        score: number,\r\n        rank: number,\r\n        province: string,\r\n        city: string\r\n    }[],\r\n    province: string,\r\n    self?: {\r\n        rank: number,\r\n        score: number\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "rank/PtlGetRankList/RankListItem": {
      "ts": "interface ReqRankListItem {\r\n    nickName: string,\r\n    avatar: string,\r\n    score: number,\r\n    rank: number,\r\n    province: string,\r\n    city: string\r\n}"
    },
    "rank/PtlUpdateRank/ReqUpdateRank": {
      "ts": "interface ReqReqUpdateRank {\r\n    rankId: string,\r\n    score: number,\r\n    sso?: string\r\n}"
    },
    "rank/PtlUpdateRank/ResUpdateRank": {
      "ts": "interface ReqResUpdateRank {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "stat/PtlStatAction/ReqStatAction": {
      "ts": "interface ReqReqStatAction {\r\n    action: string,\r\n    isTodayFirst?: boolean,\r\n    sso?: string\r\n}"
    },
    "stat/PtlStatAction/ResStatAction": {
      "ts": "interface ReqResStatAction {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "ugc/PtlAddUgcQuestion/ReqAddUgcQuestion": {
      "ts": "interface ReqReqAddUgcQuestion {\r\n    question: string,\r\n    rightAnswer: string,\r\n    wrongAnswers: string[],\r\n    /** 例如 { 踏实肯干: 1, 勇于创新: 1 } */\r\n    byteStyle: { [key: string]: number },\r\n    sso?: string\r\n}"
    },
    "ugc/PtlAddUgcQuestion/ResAddUgcQuestion": {
      "ts": "interface ReqResAddUgcQuestion {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "ugc/PtlGetUgcAwards/ReqGetUgcAwards": {
      "ts": "interface ReqReqGetUgcAwards { sso?: string }"
    },
    "ugc/PtlGetUgcAwards/ResGetUgcAwards": {
      "ts": "interface ReqResGetUgcAwards {\r\n    /** 奖励了多少积分 */\r\n    pointsChange: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "ugc/PtlGetUgcQuestions/ReqGetUgcQuestions": {
      "ts": "interface ReqReqGetUgcQuestions {\r\n    page: number,\r\n    pageSize: number,\r\n    sso?: string\r\n}"
    },
    "ugc/PtlGetUgcQuestions/ResGetUgcQuestions": {
      "ts": "interface ReqResGetUgcQuestions {\r\n    data: {\r\n        question: string,\r\n        rightAnswer: string,\r\n        wrongAnswers: string[],\r\n        createTime: number,\r\n        status: \"审核中\" | \"不通过\" | \"已通过\",\r\n        /** 审核不通过原因 */\r\n        rejectReason?: string\r\n    }[],\r\n    total: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "user/PtlBuyEnergy/ReqBuyEnergy": {
      "ts": "interface ReqReqBuyEnergy { sso?: string }"
    },
    "user/PtlBuyEnergy/ResBuyEnergy": {
      "ts": "interface ReqResBuyEnergy {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "user/PtlConsumePoints/ReqConsumePoints": {
      "ts": "interface ReqReqConsumePoints {\r\n    points: number,\r\n    /** 消费用途 */\r\n    reason: string,\r\n    sso?: string\r\n}"
    },
    "user/PtlConsumePoints/ResConsumePoints": {
      "ts": "interface ReqResConsumePoints {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "user/PtlGetCurrentUser/ReqGetCurrentUser": {
      "ts": "interface ReqReqGetCurrentUser {\r\n    from?: string,\r\n    fromUid?: string,\r\n    sso?: string\r\n}"
    },
    "user/PtlGetCurrentUser/ResGetCurrentUser": {
      "ts": "interface ReqResGetCurrentUser {\r\n    user: {\r\n        _id: string,\r\n        nickname: string,\r\n        /** 小号头像 72x72 */\r\n        avatar: string,\r\n        /** 中号头像 240x240 */\r\n        avatarMiddle: string,\r\n        /** 大号头像 640x640 */\r\n        avatarBig: string,\r\n        gender: 0 | 1 | 2,\r\n        /** 工号 */\r\n        jobNo: string,\r\n        /** 地区 */\r\n        country: string,\r\n        province: string,\r\n        city: string,\r\n        from?: string,\r\n        fromUid?: string,\r\n        /** 积分 */\r\n        points: number,\r\n        /** 段位奖章数量 */\r\n        medals: number,\r\n        /** 字节范特质称号 */\r\n        byteStyle: { [key: string]: number },\r\n        /** 体力 */\r\n        energy: number,\r\n        /** 拉新人数 */\r\n        invitedNewUser?: number,\r\n        createTime: number\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "user/PtlGetDailyEnergy/ReqGetDailyEnergy": {
      "ts": "interface ReqReqGetDailyEnergy { sso?: string }"
    },
    "user/PtlGetDailyEnergy/ResGetDailyEnergy": {
      "ts": "interface ReqResGetDailyEnergy {\r\n    gotFreeEnergy: number,\r\n    nextGetTime: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "user/PtlGetEnergy/ReqGetEnergy": {
      "ts": "interface ReqReqGetEnergy {\r\n    amount: number,\r\n    reason: string,\r\n    sso?: string\r\n}"
    },
    "user/PtlGetEnergy/ResGetEnergy": {
      "ts": "interface ReqResGetEnergy {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "user/PtlGetMine/ReqGetMine": {
      "ts": "interface ReqReqGetMine { sso?: string }"
    },
    "user/PtlGetMine/ResGetMine": {
      "ts": "interface ReqResGetMine {\r\n    /** 段位（生涯统计） */\r\n    career: {\r\n        medals: number,\r\n        medals1v1: number,\r\n        medalsQunzhan: number,\r\n        rank?: number,\r\n        rank1v1?: number,\r\n        rankQunzhan?: number\r\n    },\r\n    /** 字节范特质奖杯 */\r\n    byteStyles: {\r\n        name: string,\r\n        num: number\r\n    }[],\r\n    qunzhanUser: {\r\n        /** 同 uid */\r\n        _id: string,\r\n        currentSkinId: string,\r\n        /** 解锁的拼图 */\r\n        pictures: { [key: string]: { [key: number]: number } },\r\n        /** 正在收集的拼图 ID */\r\n        currentPictureId?: string,\r\n        /** 已经集齐的拼图 ID */\r\n        awardedPictureIds: string[]\r\n    },\r\n    /** 本周表现 */\r\n    thisWeek: {\r\n        medals: number,\r\n        medals1v1: number,\r\n        medalsQunzhan: number,\r\n        rank?: number,\r\n        rank1v1?: number,\r\n        rankQunzhan?: number\r\n    },\r\n    /** 本月表现 */\r\n    thisMonth: {\r\n        medals: number,\r\n        medals1v1: number,\r\n        medalsQunzhan: number,\r\n        rank?: number,\r\n        rank1v1?: number,\r\n        rankQunzhan?: number\r\n    },\r\n    ugc: {\r\n        /** 累计出题 */\r\n        created: number,\r\n        /** 审核通过 */\r\n        approved: number\r\n    },\r\n    /** 最近战绩 */\r\n    history1v1: {\r\n        result: \"win\" | \"draw\" | \"lose\",\r\n        selfScore: number,\r\n        oppScore: number,\r\n        opponentInfo: {\r\n            uid: string,\r\n            nickname: string,\r\n            avatar: string,\r\n            gender: 0 | 1 | 2,\r\n            medals: number\r\n        }\r\n    }[],\r\n    historyQunzhan: {\r\n        skinId: string,\r\n        joinBy: \"随机匹配\" | \"邀请同事\" | \"面对面开黑\",\r\n        isWin: boolean,\r\n        endTime: string\r\n    }[],\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "../roomProtocols/room/PtlJoinRoom/JoinBy": {
      "ts": "type ReqJoinBy = \"随机匹配\" | \"邀请同事\" | \"面对面开黑\""
    },
    "user/PtlGetPointsHistory/ReqGetPointsHistory": {
      "ts": "interface ReqReqGetPointsHistory {\r\n    page: number,\r\n    pageSize: number,\r\n    sso?: string\r\n}"
    },
    "user/PtlGetPointsHistory/ResGetPointsHistory": {
      "ts": "interface ReqResGetPointsHistory {\r\n    list: {\r\n        createTime: number,\r\n        change: number,\r\n        reason: string,\r\n        after: number\r\n    }[],\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "user/PtlGetTodayRoundNum/ReqGetTodayRoundNum": {
      "ts": "interface ReqReqGetTodayRoundNum { sso?: string }"
    },
    "user/PtlGetTodayRoundNum/ResGetTodayRoundNum": {
      "ts": "interface ReqResGetTodayRoundNum {\r\n1v1: number,\r\n    qunzhan: number,\r\n        total: number,\r\n            date: string,\r\n                exceedTodayMax: boolean,\r\n                    __refresh ?: {\r\n                        sso?: string,\r\n                        medals?: number,\r\n                        points?: number,\r\n                        energy?: number\r\n                    }\r\n}"
    },
    "user/PtlGetUserInfo/ReqGetUserInfo": {
      "ts": "interface ReqReqGetUserInfo {\r\n    uid: string,\r\n    sso?: string\r\n}"
    },
    "user/PtlGetUserInfo/ResGetUserInfo": {
      "ts": "interface ReqResGetUserInfo {\r\n    uid: string,\r\n    nickname: string,\r\n    avatar: string,\r\n    gender: 0 | 1 | 2,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "user/PtlRedeemStorePoints/ReqRedeemStorePoints": {
      "ts": "interface ReqReqRedeemStorePoints {\r\n    amount: number,\r\n    sso?: string\r\n}"
    },
    "user/PtlRedeemStorePoints/ResRedeemStorePoints": {
      "ts": "interface ReqResRedeemStorePoints {\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "user/PtlSign/ReqSign": {
      "ts": "interface ReqReqSign {\r\n    url: string,\r\n    sso?: string\r\n}"
    },
    "user/PtlSign/ResSign": {
      "ts": "interface ReqResSign {\r\n    appId: string,\r\n    nonceStr: string,\r\n    timestamp: number,\r\n    signature: string,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "user/PtlUpdateUser/ReqUpdateUser": {
      "ts": "interface ReqReqUpdateUser {\r\n    nickname?: string,\r\n    avatar?: string,\r\n    sso?: string\r\n}"
    },
    "user/PtlUpdateUser/ResUpdateUser": {
      "ts": "interface ReqResUpdateUser {\r\n    user: {\r\n        _id: string,\r\n        nickname: string,\r\n        /** 小号头像 72x72 */\r\n        avatar: string,\r\n        /** 中号头像 240x240 */\r\n        avatarMiddle: string,\r\n        /** 大号头像 640x640 */\r\n        avatarBig: string,\r\n        gender: 0 | 1 | 2,\r\n        /** 工号 */\r\n        jobNo: string,\r\n        /** 地区 */\r\n        country: string,\r\n        province: string,\r\n        city: string,\r\n        from?: string,\r\n        fromUid?: string,\r\n        /** 积分 */\r\n        points: number,\r\n        /** 段位奖章数量 */\r\n        medals: number,\r\n        /** 字节范特质称号 */\r\n        byteStyle: { [key: string]: number },\r\n        /** 体力 */\r\n        energy: number,\r\n        /** 拉新人数 */\r\n        invitedNewUser?: number,\r\n        createTime: number\r\n    },\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "user/PtlUpload/ReqUpload": {
      "ts": "interface ReqReqUpload {\r\n    data: string | string,\r\n    ext: string,\r\n    sso?: string\r\n}"
    },
    "user/PtlUpload/ResUpload": {
      "ts": "interface ReqResUpload {\r\n    /** 文件的绝对地址 */\r\n    url: string,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    },
    "user/PtlUseEnergy/ReqUseEnergy": {
      "ts": "interface ReqReqUseEnergy {\r\n    useAmount: number,\r\n    reason: string,\r\n    sso?: string\r\n}"
    },
    "user/PtlUseEnergy/ResUseEnergy": {
      "ts": "interface ReqResUseEnergy {\r\n    newEnergy: number,\r\n    __refresh?: {\r\n        sso?: string,\r\n        medals?: number,\r\n        points?: number,\r\n        energy?: number\r\n    }\r\n}"
    }
  }
}