TSRPC API
===

# Server
- http://localhost:3000

# APIs

## /activity/FinishActivityRound

### Request

```ts
interface ReqReqFinishActivityRound {
    _id: string,
    self: {
        operations: ({
            /** 选择了第几个选项 从0开始 */
            answer: number,
            /** 答题所用的时间 */
            usedTime: number,
            /** 是否答对 */
            isRight: boolean,
            /** 得分 */
            score: {
                right: number,
                speed: number
            }
        } | null)[],
        score: number,
        /** 战斗结果 胜利/失败/平局 */
        result: "win" | "lose" | "draw",
        /** 字节范特质得分 */
        byteStyleScore: { [key: string]: number },
        medals: number
    },
    /** 对局所有题目的数量 */
    questionNum: number,
    sso?: string
}
```

### Response

```ts
interface ReqResFinishActivityRound {
    pointsChange: number,
    byteStyleChange: {
        name: string,
        amount: number
    }[],
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /activity/FinishQunzhanActivityRound

### Request

```ts
interface ReqReqFinishQunzhanActivityRound {
    qunzhanRoundHistoryId: string,
    activityId: string,
    sso?: string
}
```

### Response

```ts
interface ReqResFinishQunzhanActivityRound {
    isWin: boolean,
    /** 剩余参与次数 */
    remainedPlayTimes: number,
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /activity/GetActivityInfo

### Request

```ts
interface ReqReqGetActivityInfo {
    activityId: string,
    sso?: string
}
```

### Response

```ts
interface ReqResGetActivityInfo {
    activityConfig: {
        _id: string,
        /** 是否启用 */
        isEnabled: boolean,
        /** 活动名称 */
        name: string,
        /** 首页的Banner图地址 */
        homeBanner?: string,
        /** 活动首页的标题图 */
        titleImage: string,
        /** 活动首页的详情图 */
        descImage: string,
        /** 开始时间 */
        startTime: number,
        /** 结束时间 */
        endTime: number,
        /** 每个用户最多参与几次 */
        maxPlayTimesPerUser: number,
        /** 是否启用字节范特质显示 */
        showByteStyle: boolean,
        /** 攻略地址 */
        tacticUrl?: string,
        /** 是群战模式 */
        qunzhan?: {/** 对几道题给多少积分 */
            awards: { [key: number]: number }
        },
        joinedUserNum: number
    },
    self: {
        /** 剩余参与次数 */
        remainedPlayTimes: number,
        /** 挑战通过的roundId */
        winRoundId?: string,
        /** 抽到的奖品MyAwardID */
        myAwardId?: string
    },
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /activity/StartActivityRound

### Request

```ts
interface ReqReqStartActivityRound {
    /** 指定ActivityRoundID 一般情况下不用 只有在例如误退出 希望不消耗次数重来的情况下可用 */
    _id?: string,
    activityId: string,
    sso?: string
}
```

### Response

```ts
interface ReqResStartActivityRound {
    _id: string,
    questions: {
        _id: string,
        /** options对应题库的索引，>=0为错误答案索引，-1为正确答案 */
        questionBankIndices: number[],
        category: string,
        question: string,
        options: string[],
        rightAnswerIndex: number,
        byteStyle: { [key: string]: number },
        provider?: string,
        /** 题目解析 */
        analysis?: string,
        /** 题目解析链接 */
        analysisUrl?: string
    }[],
    opponent: {
        userInfo: {
            uid: string,
            nickname: string,
            avatar: string,
            gender: 0 | 1 | 2,
            medals: number
        },
        operations: ({
            /** 选择了第几个选项 从0开始 */
            answer: number,
            /** 答题所用的时间 */
            usedTime: number,
            /** 是否答对 */
            isRight: boolean,
            /** 得分 */
            score: {
                right: number,
                speed: number
            }
        } | null)[],
        score: number,
        byteStyleScore: { [key: string]: number },
        /** 对手对局的记录ID 如果为空 说明这是一个AI */
        roundId?: string
    },
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /activity/StartQunzhanActivityRound

### Request

```ts
interface ReqReqStartQunzhanActivityRound {
    activityId: string,
    sso?: string
}
```

### Response

```ts
interface ReqResStartQunzhanActivityRound {
    /** 剩余参与次数 */
    remainedPlayTimes: number,
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /award/GetMyAwards

### Request

```ts
interface ReqReqGetMyAwards {
    /** 从1开始 */
    page: number,
    pageSize: number,
    /** 给【活动首页】->【查看奖品】预留，只显示本活动奖品 */
    activityId?: string,
    sso?: string
}
```

### Response

```ts
interface ReqResGetMyAwards {
    data: ({
        type: "实物",
        /** 登记的收货地址 */
        address?: {
            type: "快递",
            province: string,
            city: string,
            area: string,
            addr: string,
            /** 登记时间 */
            time: number,
            name: string,
            tel: string
        } | {
            type: "工区自提",
            city: string,
            /** 工区 */
            area: string,
            /** 登记时间 */
            time: number,
            name: string,
            tel: string
        },
        /** 物流信息 */
        allowedDeliveryType: ("快递" | "工区自提")[],
        delivery?: {
            time: number,
            /** 快递公司 */
            expressCompany: string,
            /** 快递单号 */
            expressNo: string
        },
        _id: string,
        uid: string,
        nickname: string,
        jobNo: string,
        /** 奖品名称 */
        name: string,
        /** 奖品图标 */
        icon: string,
        /** 奖品来源 */
        from: {
            type: "日常抽奖",
            desc: string
        } | {
            type: "活动",
            activityId: string,
            desc: string
        } | {
            type: "周排名" | "月排名",
            desc: string,
            period: {
                /** yyyy-MM-dd */
                startDate: string,
                endDate: string
            },
            /** 自己的排名 */
            rank: number
        } | {
            type: "Custom",
            poolId: string,
            desc: string,
            /** 领奖凭据 */
            keys: string[]
        } | {
            type: "群战拼图",
            poolId: string,
            desc: string
        },
        status: "待领取" | "待发出" | "已发出",
        /** 中奖时间 */
        createTime: number,
        meta?: any
    } | {
        type: "虚拟",
        /** 发货的卡密 */
        delivery?: {
            time: number,
            content: string
        },
        _id: string,
        uid: string,
        nickname: string,
        jobNo: string,
        /** 奖品名称 */
        name: string,
        /** 奖品图标 */
        icon: string,
        /** 奖品来源 */
        from: {
            type: "日常抽奖",
            desc: string
        } | {
            type: "活动",
            activityId: string,
            desc: string
        } | {
            type: "周排名" | "月排名",
            desc: string,
            period: {
                /** yyyy-MM-dd */
                startDate: string,
                endDate: string
            },
            /** 自己的排名 */
            rank: number
        } | {
            type: "Custom",
            poolId: string,
            desc: string,
            /** 领奖凭据 */
            keys: string[]
        } | {
            type: "群战拼图",
            poolId: string,
            desc: string
        },
        status: "待领取" | "待发出" | "已发出",
        /** 中奖时间 */
        createTime: number,
        meta?: any
    } | {
        type: "LuckyBox",
        selectedPoolItemId?: string,
        /** 宝箱标题 */
        title: string,
        /** 宝箱描述 */
        desc: string,
        _id: string,
        uid: string,
        nickname: string,
        jobNo: string,
        /** 奖品名称 */
        name: string,
        /** 奖品图标 */
        icon: string,
        /** 奖品来源 */
        from: {
            type: "日常抽奖",
            desc: string
        } | {
            type: "活动",
            activityId: string,
            desc: string
        } | {
            type: "周排名" | "月排名",
            desc: string,
            period: {
                /** yyyy-MM-dd */
                startDate: string,
                endDate: string
            },
            /** 自己的排名 */
            rank: number
        } | {
            type: "Custom",
            poolId: string,
            desc: string,
            /** 领奖凭据 */
            keys: string[]
        } | {
            type: "群战拼图",
            poolId: string,
            desc: string
        },
        status: "待领取" | "待发出" | "已发出",
        /** 中奖时间 */
        createTime: number,
        meta?: any
    })[],
    total: number,
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /award/GetToReceivedInfo
获取待领取奖励的信息

### Request

```ts
interface ReqReqGetToReceivedInfo { sso?: string }
```

### Response

```ts
interface ReqResGetToReceivedInfo {
    luckyBoxIds: string[],
    myAwardIds: string[],
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /award/GetWorkAreas

### Request

```ts
interface ReqReqGetWorkAreas { sso?: string }
```

### Response

```ts
interface ReqResGetWorkAreas {
    workAreas: {
        city: string,
        areas: string[]
    }[],
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /award/OpenLuckyBox
打开宝箱 查看宝箱里的奖品

### Request

```ts
interface ReqReqOpenLuckyBox {
    /** LuckyBox的MyAward ID */
    luckyBoxId: string,
    sso?: string
}
```

### Response

```ts
interface ReqResOpenLuckyBox {
    title: string,
    desc: string,
    from: {
        type: "周排名" | "月排名",
        desc: string,
        period: {
            /** yyyy-MM-dd */
            startDate: string,
            endDate: string
        },
        /** 自己的排名 */
        rank: number
    } | {
        type: "Custom",
        poolId: string,
        desc: string,
        /** 领奖凭据 */
        keys: string[]
    },
    poolItems: {
        _id: string,
        name: string,
        icon: string,
        /** 有此值则被锁住无法选择 */
        lockedMsg?: string
    }[],
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /award/SelectLuckyBoxAward
选择宝箱的奖品

### Request

```ts
interface ReqReqSelectLuckyBoxAward {
    /** LuckyBox对应的 MyAward ID */
    luckyBoxId: string,
    /** 选择的奖品的 AwardPoolItem ID */
    poolItemId: string,
    sso?: string
}
```

### Response

```ts
interface ReqResSelectLuckyBoxAward {
    award: {
        type: "实物",
        /** 登记的收货地址 */
        address?: {
            type: "快递",
            province: string,
            city: string,
            area: string,
            addr: string,
            /** 登记时间 */
            time: number,
            name: string,
            tel: string
        } | {
            type: "工区自提",
            city: string,
            /** 工区 */
            area: string,
            /** 登记时间 */
            time: number,
            name: string,
            tel: string
        },
        /** 物流信息 */
        allowedDeliveryType: ("快递" | "工区自提")[],
        delivery?: {
            time: number,
            /** 快递公司 */
            expressCompany: string,
            /** 快递单号 */
            expressNo: string
        },
        _id: string,
        uid: string,
        nickname: string,
        jobNo: string,
        /** 奖品名称 */
        name: string,
        /** 奖品图标 */
        icon: string,
        /** 奖品来源 */
        from: {
            type: "日常抽奖",
            desc: string
        } | {
            type: "活动",
            activityId: string,
            desc: string
        } | {
            type: "周排名" | "月排名",
            desc: string,
            period: {
                /** yyyy-MM-dd */
                startDate: string,
                endDate: string
            },
            /** 自己的排名 */
            rank: number
        } | {
            type: "Custom",
            poolId: string,
            desc: string,
            /** 领奖凭据 */
            keys: string[]
        } | {
            type: "群战拼图",
            poolId: string,
            desc: string
        },
        status: "待领取" | "待发出" | "已发出",
        /** 中奖时间 */
        createTime: number,
        meta?: any
    } | {
        type: "虚拟",
        /** 发货的卡密 */
        delivery?: {
            time: number,
            content: string
        },
        _id: string,
        uid: string,
        nickname: string,
        jobNo: string,
        /** 奖品名称 */
        name: string,
        /** 奖品图标 */
        icon: string,
        /** 奖品来源 */
        from: {
            type: "日常抽奖",
            desc: string
        } | {
            type: "活动",
            activityId: string,
            desc: string
        } | {
            type: "周排名" | "月排名",
            desc: string,
            period: {
                /** yyyy-MM-dd */
                startDate: string,
                endDate: string
            },
            /** 自己的排名 */
            rank: number
        } | {
            type: "Custom",
            poolId: string,
            desc: string,
            /** 领奖凭据 */
            keys: string[]
        } | {
            type: "群战拼图",
            poolId: string,
            desc: string
        },
        status: "待领取" | "待发出" | "已发出",
        /** 中奖时间 */
        createTime: number,
        meta?: any
    } | {
        type: "LuckyBox",
        selectedPoolItemId?: string,
        /** 宝箱标题 */
        title: string,
        /** 宝箱描述 */
        desc: string,
        _id: string,
        uid: string,
        nickname: string,
        jobNo: string,
        /** 奖品名称 */
        name: string,
        /** 奖品图标 */
        icon: string,
        /** 奖品来源 */
        from: {
            type: "日常抽奖",
            desc: string
        } | {
            type: "活动",
            activityId: string,
            desc: string
        } | {
            type: "周排名" | "月排名",
            desc: string,
            period: {
                /** yyyy-MM-dd */
                startDate: string,
                endDate: string
            },
            /** 自己的排名 */
            rank: number
        } | {
            type: "Custom",
            poolId: string,
            desc: string,
            /** 领奖凭据 */
            keys: string[]
        } | {
            type: "群战拼图",
            poolId: string,
            desc: string
        },
        status: "待领取" | "待发出" | "已发出",
        /** 中奖时间 */
        createTime: number,
        meta?: any
    },
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /award/SubmitAddr

### Request

```ts
interface ReqReqSubmitAddr {
    myAwardId: string,
    address: {
        type: "快递",
        province: string,
        city: string,
        area: string,
        addr: string,
        /** 登记时间 */
        time: number,
        name: string,
        tel: string
    } | {
        type: "工区自提",
        city: string,
        /** 工区 */
        area: string,
        /** 登记时间 */
        time: number,
        name: string,
        tel: string
    },
    sso?: string
}
```

### Response

```ts
interface ReqResSubmitAddr {
    newMyAward: {
        type: "实物",
        /** 登记的收货地址 */
        address?: {
            type: "快递",
            province: string,
            city: string,
            area: string,
            addr: string,
            /** 登记时间 */
            time: number,
            name: string,
            tel: string
        } | {
            type: "工区自提",
            city: string,
            /** 工区 */
            area: string,
            /** 登记时间 */
            time: number,
            name: string,
            tel: string
        },
        /** 物流信息 */
        allowedDeliveryType: ("快递" | "工区自提")[],
        delivery?: {
            time: number,
            /** 快递公司 */
            expressCompany: string,
            /** 快递单号 */
            expressNo: string
        },
        _id: string,
        uid: string,
        nickname: string,
        jobNo: string,
        /** 奖品名称 */
        name: string,
        /** 奖品图标 */
        icon: string,
        /** 奖品来源 */
        from: {
            type: "日常抽奖",
            desc: string
        } | {
            type: "活动",
            activityId: string,
            desc: string
        } | {
            type: "周排名" | "月排名",
            desc: string,
            period: {
                /** yyyy-MM-dd */
                startDate: string,
                endDate: string
            },
            /** 自己的排名 */
            rank: number
        } | {
            type: "Custom",
            poolId: string,
            desc: string,
            /** 领奖凭据 */
            keys: string[]
        } | {
            type: "群战拼图",
            poolId: string,
            desc: string
        },
        status: "待领取" | "待发出" | "已发出",
        /** 中奖时间 */
        createTime: number,
        meta?: any
    } | {
        type: "虚拟",
        /** 发货的卡密 */
        delivery?: {
            time: number,
            content: string
        },
        _id: string,
        uid: string,
        nickname: string,
        jobNo: string,
        /** 奖品名称 */
        name: string,
        /** 奖品图标 */
        icon: string,
        /** 奖品来源 */
        from: {
            type: "日常抽奖",
            desc: string
        } | {
            type: "活动",
            activityId: string,
            desc: string
        } | {
            type: "周排名" | "月排名",
            desc: string,
            period: {
                /** yyyy-MM-dd */
                startDate: string,
                endDate: string
            },
            /** 自己的排名 */
            rank: number
        } | {
            type: "Custom",
            poolId: string,
            desc: string,
            /** 领奖凭据 */
            keys: string[]
        } | {
            type: "群战拼图",
            poolId: string,
            desc: string
        },
        status: "待领取" | "待发出" | "已发出",
        /** 中奖时间 */
        createTime: number,
        meta?: any
    } | {
        type: "LuckyBox",
        selectedPoolItemId?: string,
        /** 宝箱标题 */
        title: string,
        /** 宝箱描述 */
        desc: string,
        _id: string,
        uid: string,
        nickname: string,
        jobNo: string,
        /** 奖品名称 */
        name: string,
        /** 奖品图标 */
        icon: string,
        /** 奖品来源 */
        from: {
            type: "日常抽奖",
            desc: string
        } | {
            type: "活动",
            activityId: string,
            desc: string
        } | {
            type: "周排名" | "月排名",
            desc: string,
            period: {
                /** yyyy-MM-dd */
                startDate: string,
                endDate: string
            },
            /** 自己的排名 */
            rank: number
        } | {
            type: "Custom",
            poolId: string,
            desc: string,
            /** 领奖凭据 */
            keys: string[]
        } | {
            type: "群战拼图",
            poolId: string,
            desc: string
        },
        status: "待领取" | "待发出" | "已发出",
        /** 中奖时间 */
        createTime: number,
        meta?: any
    },
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /daily/FinishRound

### Request

```ts
interface ReqReqFinishRound {
    _id: string,
    self: {
        operations: ({
            /** 选择了第几个选项 从0开始 */
            answer: number,
            /** 答题所用的时间 */
            usedTime: number,
            /** 是否答对 */
            isRight: boolean,
            /** 得分 */
            score: {
                right: number,
                speed: number
            }
        } | null)[],
        score: number,
        /** 战斗结果 胜利/失败/平局 */
        result: "win" | "lose" | "draw",
        /** 字节范特质得分 */
        byteStyleScore: { [key: string]: number },
        medals: number
    },
    /** 对局所有题目的数量 */
    questionNum: number,
    questionGroupId: string,
    sso?: string
}
```

### Response

```ts
interface ReqResFinishRound {
    pointsChange: number,
    medalsChange: number,
    byteStyleChange: {
        name: string,
        amount: number
    }[],
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /daily/StartRound

### Request

```ts
interface ReqReqStartRound {
    type: "practise" | "match",
    sso?: string
}
```

### Response

```ts
interface ReqResStartRound {
    _id: string,
    questions: {
        _id: string,
        /** options对应题库的索引，>=0为错误答案索引，-1为正确答案 */
        questionBankIndices: number[],
        category: string,
        question: string,
        options: string[],
        rightAnswerIndex: number,
        byteStyle: { [key: string]: number },
        provider?: string,
        /** 题目解析 */
        analysis?: string,
        /** 题目解析链接 */
        analysisUrl?: string
    }[],
    opponent: {
        userInfo: {
            uid: string,
            nickname: string,
            avatar: string,
            gender: 0 | 1 | 2,
            medals: number
        },
        operations: ({
            /** 选择了第几个选项 从0开始 */
            answer: number,
            /** 答题所用的时间 */
            usedTime: number,
            /** 是否答对 */
            isRight: boolean,
            /** 得分 */
            score: {
                right: number,
                speed: number
            }
        } | null)[],
        score: number,
        byteStyleScore: { [key: string]: number },
        /** 对手对局的记录ID 如果为空 说明这是一个AI */
        roundId?: string
    },
    /** 问题组合标识，Finish时透传 */
    questionGroupId: string,
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /data/GetPlayData

### Request

```ts
interface ReqReqGetPlayData { sso?: string }
```

### Response

```ts
interface ReqResGetPlayData {
    data: { energy?: number },
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /data/SetPlayData

### Request

```ts
interface ReqReqSetPlayData {
    data: { energy: number },
    sso?: string
}
```

### Response

```ts
interface ReqResSetPlayData {
    updateTime: number,
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /draw/Draw
进行一次抽奖操作

### Request

```ts
interface ReqReqDraw {
    ticket: { type: "daily" } | {
        type: "activity",
        activityId: string,
        roundId: string
    },
    sso?: string
}
```

### Response

```ts
interface ReqResDraw {
    award: {
        _id: string,
        name: string,
        icon: string,
        myAwardId: string
    } & ({
        type: "实物",
        allowedDeliveryType: ("快递" | "工区自提")[]
    } | { type: "虚拟" | "NoAward" }),
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /draw/GetDrawInfo

### Request

```ts
interface ReqReqGetDrawInfo {
    ticket: { type: "daily" } | {
        type: "activity",
        activityId: string,
        roundId: string
    },
    sso?: string
}
```

### Response

```ts
interface ReqResGetDrawInfo {
    /** 奖品列表 */
    awards: {
        _id: string,
        type: "实物" | "虚拟" | "NoAward",
        name: string,
        icon: string
    }[],
    /** 如果req的type为activity，则此项必有值 */
    activityConfig?: {
        _id: string,
        /** 是否启用 */
        isEnabled: boolean,
        /** 活动名称 */
        name: string,
        /** 首页的Banner图地址 */
        homeBanner?: string,
        /** 活动首页的标题图 */
        titleImage: string,
        /** 活动首页的详情图 */
        descImage: string,
        /** 开始时间 */
        startTime: number,
        /** 结束时间 */
        endTime: number,
        /** 每个用户最多参与几次 */
        maxPlayTimesPerUser: number,
        /** 是否启用字节范特质显示 */
        showByteStyle: boolean,
        /** 攻略地址 */
        tacticUrl?: string,
        /** 是群战模式 */
        qunzhan?: {/** 对几道题给多少积分 */
            awards: { [key: number]: number }
        },
        joinedUserNum: number
    },
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /events/2021-10-24/GetStatus

### Request

```ts
interface ReqReqGetStatus { sso?: string }
```

### Response

```ts
interface ReqResGetStatus {
    remainedExpTimes: number,
    formalResult?: {
        rightNum: number,
        addPoints: number
    },
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /events/2021-10-24/StartExp
开始一局体验模式

### Request

```ts
interface ReqReqStartExp { sso?: string }
```

### Response

```ts
interface ReqResStartExp {
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /home/GetHomeInfo
获取首页需要的小红点等信息
一次游戏周期获取一次即可

### Request

```ts
interface ReqReqGetHomeInfo { sso?: string }
```

### Response

```ts
interface ReqResGetHomeInfo {
    /** 小红点 */
    dots: {
        /** 用户出题（红点） */
        ugc: boolean,
        /** 奖品（带数字红点） */
        award: number
    },
    /** 自动开宝箱（每开启一个，dots.award -1） */
    luckyBoxIds: string[],
    /** 活动Banner */
    activity?: {
        activityId: string,
        banner: string
    },
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /mistake/GetMyMistakes

### Request

```ts
interface ReqReqGetMyMistakes {
    /** 从1开始 */
    page: number,
    pageSize: number,
    sso?: string
}
```

### Response

```ts
interface ReqResGetMyMistakes {
    data: {
        question: string,
        options: string[],
        /** 打对勾的选项 */
        rightIndex: number,
        /** 打红叉的选项 */
        wrongIndex: number,
        /** 题目解析 */
        analysis?: string,
        /** 题目解析链接 */
        analysisUrl?: string
    }[],
    total: number,
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /platform/LoginDev

### Request

```ts
interface ReqReqLoginDev {
    loginKey: string,
    from?: string,
    fromUid?: string,
    sso?: string
}
```

### Response

```ts
interface ReqResLoginDev {
    user: {
        _id: string,
        nickname: string,
        /** 小号头像 72x72 */
        avatar: string,
        /** 中号头像 240x240 */
        avatarMiddle: string,
        /** 大号头像 640x640 */
        avatarBig: string,
        gender: 0 | 1 | 2,
        /** 工号 */
        jobNo: string,
        /** 地区 */
        country: string,
        province: string,
        city: string,
        from?: string,
        fromUid?: string,
        /** 积分 */
        points: number,
        /** 段位奖章数量 */
        medals: number,
        /** 字节范特质称号 */
        byteStyle: { [key: string]: number },
        /** 体力 */
        energy: number,
        /** 拉新人数 */
        invitedNewUser?: number,
        createTime: number
    },
    playData: { energy?: number },
    isFirstLogin: boolean,
    __refresh: { sso: string }
}
```

## /platform/LoginFeishu

### Request

```ts
interface ReqReqLoginFeishu {
    code: string,
    from?: string,
    fromUid?: string,
    sso?: string
}
```

### Response

```ts
interface ReqResLoginFeishu {
    user: {
        _id: string,
        nickname: string,
        /** 小号头像 72x72 */
        avatar: string,
        /** 中号头像 240x240 */
        avatarMiddle: string,
        /** 大号头像 640x640 */
        avatarBig: string,
        gender: 0 | 1 | 2,
        /** 工号 */
        jobNo: string,
        /** 地区 */
        country: string,
        province: string,
        city: string,
        from?: string,
        fromUid?: string,
        /** 积分 */
        points: number,
        /** 段位奖章数量 */
        medals: number,
        /** 字节范特质称号 */
        byteStyle: { [key: string]: number },
        /** 体力 */
        energy: number,
        /** 拉新人数 */
        invitedNewUser?: number,
        createTime: number
    },
    playData: { energy?: number },
    isFirstLogin: boolean,
    __refresh: { sso: string }
}
```

## /GetGameConfig

### Request

```ts
interface ReqReqGetGameConfig {
    version?: number,
    sso?: string
}
```

### Response

```ts
interface ReqResGetGameConfig {
    version: number,
    /** config返回为空，代表version没变，所以不需要再返回（节省流量） */
    config?: {
        /** 积分数值统一配置 */
        points: {
            /** 新人初始积分 */
            default: number,
            round: {
                activity: {
                    win: number,
                    lose: number,
                    draw: number
                },
1v1: {
    win: number,
        lose: number,
            draw: number
},
qunzhan: {
    win: number,
        lose: number
}
},
/** 抽奖消耗积分 */
dailyDraw: number,
    /** 出题通过奖励积分 */
    ugcAward: number,
        /** 兑换体力消耗积分 */
        buyEnergy: {
    /** 兑换一次消耗的积分价格 */
    points: number,
        /** 兑换一次获得的体力数量 */
        energy: number
},
/** 每日免费体力 */
freeEnergy: {
    /** 体力恢复时间 (0~23)[] */
    hours: number[],
        /** 每次免费体力的恢复数量 */
        energy: number
},
/** 拉新有礼奖励 */
inviteNewUser: number
},
/** 奖章数值统一配置 */
medals: {/** 新人初始奖章 */
default: number
},
/** 段位配置 */
levels: {
    /** 段位ID（用于拿图标啊之类的） */
    id: string,
        name: string,
            minMedals: number,
                maxMedals: number
} [],
    round: {
    questionScore: {
        /** 正确得分 */
        right: number,
            /** 速度得分 */
            speed: number
    },
    /** 单局时长（毫秒） */
    roundTime: number,
        /** 一局最多颁发几个字节范奖杯 */
        maxMatchedTimes: {
        activity: number,
            match: number,
                practise: number
    },
    /** AI的难度 */
    aiDifficulty: {
        activity: number,
            match: number,
                practise: number
    }
},
activity: { },
/** 抽奖模块 */
draw: {/** 日常抽奖每日最多几次 */
    maxDailyLimit: number
},
/** 允许进入的雇员类型 为undefined则代表所有人 */
limitEmployeeType ?: string[],
    /** 排名奖励领取条件 */
    rankAward: {
    /** 排名小于等于多少可获得周排名奖励 */
    maxWeekRank: number,
        /** 排名小于等于多少可获得月排名奖励 */
        maxMonthRank: number
},
texts: {
    ugcRules: string,
        dailyDrawRules: string
},
/** 游戏运营结束提醒 */
endAlert ?: {
    /** 进入游戏时的提醒 */
    entry: {
        /** 此时间后开始出现 */
        endTime: number,
        title: string,
        content: string,
        btnText: string
    },
    /** 日常模式关闭提醒 */
    daily: {
        /** 1v1 模式，此时间后开始出现 */
        endTime1v1: number,
        /** 群战模式，此时间后开始出现 */
        endTimeQunzhan: number,
        title: string,
        content: string,
        btnText: string
    },
    /** 排行榜定格在某一刻 */
    rankEnd?: {
        endTime: number,
        weekText: string,
        monthText: string
    }
}
},
__refresh ?: {
    sso?: string,
    medals?: number,
    points?: number,
    energy?: number
}
}
```

## /qunzhan/GetQunzhanFirstRoundNum

### Request

```ts
interface ReqReqGetQunzhanFirstRoundNum { sso?: string }
```

### Response

```ts
interface ReqResGetQunzhanFirstRoundNum {
    firstRoundNum: number,
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /qunzhan/GetQunzhanIndexInfo

### Request

```ts
interface ReqReqGetQunzhanIndexInfo { sso?: string }
```

### Response

```ts
interface ReqResGetQunzhanIndexInfo {
    list: {
        richText: string,
        time: string
    }[],
    onlineUserNum: number,
    roomNum: number,
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /qunzhan/GetQunzhanPictureAward
领取群战拼图奖励

### Request

```ts
interface ReqReqGetQunzhanPictureAward {
    pictureId: string,
    sso?: string
}
```

### Response

```ts
interface ReqResGetQunzhanPictureAward { luckyBoxId: string }
```

## /qunzhan/GetQunzhanPictureConfigs

### Request

```ts
interface ReqReqGetQunzhanPictureConfigs { sso?: string }
```

### Response

```ts
interface ReqResGetQunzhanPictureConfigs {
    confs: ({
        _id: string,
        name: string,
        url: string,
        col: number,
        row: number
    } & {
        awards: {
            name: string,
            icon: string
        }[]
    })[],
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /qunzhan/GetQunzhanRoomInfo

### Request

```ts
type ReqReqGetQunzhanRoomInfo = { sso?: string } & ({ roomId: string } | {/** 面对面开黑码 */
    code: string
})
```

### Response

```ts
interface ReqResGetQunzhanRoomInfo {
    room?: {
        _id: string,
        serverUrl: string,
        /** 房间状态 */
        state: "Waiting" | "Matching" | "Gaming",
        /** 是否公共房间 */
        isPublic: boolean,
        isActive: boolean,
        /** 强制新手题目判定依据 */
        firstRoundNum?: number,
        /** 活动模式，用于指定题目 */
        activityId?: string,
        /** 房间内成员（第一位是房主） */
        users: {
            uid: string,
            nickname: string,
            avatar: string,
            skinId: string,
            joinBy: "随机匹配" | "邀请同事" | "面对面开黑",
            isAI?: boolean,
            activity?: {
                activityId: string,
                isFormal: boolean
            }
        }[],
        roomStat: {
            uid: string,
            nickname: string,
            avatar: string,
            winRounds: number
        }[],
        /** 面对面开黑房间码 */
        code?: string,
        createTime: number,
        lastActiveTime: number,
        startMatchTime?: number,
        startGameTime?: number
    },
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /qunzhan/GetQunzhanUser

### Request

```ts
interface ReqReqGetQunzhanUser { sso?: string }
```

### Response

```ts
interface ReqResGetQunzhanUser {
    qunzhanUser: {
        /** 同 uid */
        _id: string,
        currentSkinId: string,
        /** 解锁的拼图 */
        pictures: { [key: string]: { [key: number]: number } },
        /** 正在收集的拼图 ID */
        currentPictureId?: string,
        /** 已经集齐的拼图 ID */
        awardedPictureIds: string[]
    },
    isFirstTime?: boolean,
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /qunzhan/SelectQunzhanSkin

### Request

```ts
interface ReqReqSelectQunzhanSkin {
    skinId: string,
    sso?: string
}
```

### Response

```ts
interface ReqResSelectQunzhanSkin {
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /qunzhan/SetCurrentQunzhanPicture
设置群战拼图

### Request

```ts
interface ReqReqSetCurrentQunzhanPicture {
    picId: string,
    sso?: string
}
```

### Response

```ts
interface ReqResSetCurrentQunzhanPicture {
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /rank/GetRankList

### Request

```ts
interface ReqReqGetRankList {
    rankId: string,
    score?: number,
    topCount: number,
    nearCount: number,
    sso?: string
}
```

### Response

```ts
interface ReqResGetRankList {
    list: {
        nickName: string,
        avatar: string,
        score: number,
        rank: number,
        province: string,
        city: string
    }[],
    province: string,
    self?: {
        rank: number,
        score: number
    },
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /rank/UpdateRank

### Request

```ts
interface ReqReqUpdateRank {
    rankId: string,
    score: number,
    sso?: string
}
```

### Response

```ts
interface ReqResUpdateRank {
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /stat/StatAction

### Request

```ts
interface ReqReqStatAction {
    action: string,
    isTodayFirst?: boolean,
    sso?: string
}
```

### Response

```ts
interface ReqResStatAction {
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /ugc/AddUgcQuestion

### Request

```ts
interface ReqReqAddUgcQuestion {
    question: string,
    rightAnswer: string,
    wrongAnswers: string[],
    /** 例如 { 踏实肯干: 1, 勇于创新: 1 } */
    byteStyle: { [key: string]: number },
    sso?: string
}
```

### Response

```ts
interface ReqResAddUgcQuestion {
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /ugc/GetUgcAwards
领取UGC出题奖励
本次游戏生命周期，首次进入UGC界面调用

### Request

```ts
interface ReqReqGetUgcAwards { sso?: string }
```

### Response

```ts
interface ReqResGetUgcAwards {
    /** 奖励了多少积分 */
    pointsChange: number,
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /ugc/GetUgcQuestions

### Request

```ts
interface ReqReqGetUgcQuestions {
    page: number,
    pageSize: number,
    sso?: string
}
```

### Response

```ts
interface ReqResGetUgcQuestions {
    data: {
        question: string,
        rightAnswer: string,
        wrongAnswers: string[],
        createTime: number,
        status: "审核中" | "不通过" | "已通过",
        /** 审核不通过原因 */
        rejectReason?: string
    }[],
    total: number,
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /user/BuyEnergy

### Request

```ts
interface ReqReqBuyEnergy { sso?: string }
```

### Response

```ts
interface ReqResBuyEnergy {
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /user/ConsumePoints

### Request

```ts
interface ReqReqConsumePoints {
    points: number,
    /** 消费用途 */
    reason: string,
    sso?: string
}
```

### Response

```ts
interface ReqResConsumePoints {
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /user/GetCurrentUser

### Request

```ts
interface ReqReqGetCurrentUser {
    from?: string,
    fromUid?: string,
    sso?: string
}
```

### Response

```ts
interface ReqResGetCurrentUser {
    user: {
        _id: string,
        nickname: string,
        /** 小号头像 72x72 */
        avatar: string,
        /** 中号头像 240x240 */
        avatarMiddle: string,
        /** 大号头像 640x640 */
        avatarBig: string,
        gender: 0 | 1 | 2,
        /** 工号 */
        jobNo: string,
        /** 地区 */
        country: string,
        province: string,
        city: string,
        from?: string,
        fromUid?: string,
        /** 积分 */
        points: number,
        /** 段位奖章数量 */
        medals: number,
        /** 字节范特质称号 */
        byteStyle: { [key: string]: number },
        /** 体力 */
        energy: number,
        /** 拉新人数 */
        invitedNewUser?: number,
        createTime: number
    },
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /user/GetDailyEnergy

### Request

```ts
interface ReqReqGetDailyEnergy { sso?: string }
```

### Response

```ts
interface ReqResGetDailyEnergy {
    gotFreeEnergy: number,
    nextGetTime: number,
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /user/GetEnergy
返还体力

### Request

```ts
interface ReqReqGetEnergy {
    amount: number,
    reason: string,
    sso?: string
}
```

### Response

```ts
interface ReqResGetEnergy {
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /user/GetMine

### Request

```ts
interface ReqReqGetMine { sso?: string }
```

### Response

```ts
interface ReqResGetMine {
    /** 段位（生涯统计） */
    career: {
        medals: number,
        medals1v1: number,
        medalsQunzhan: number,
        rank?: number,
        rank1v1?: number,
        rankQunzhan?: number
    },
    /** 字节范特质奖杯 */
    byteStyles: {
        name: string,
        num: number
    }[],
    qunzhanUser: {
        /** 同 uid */
        _id: string,
        currentSkinId: string,
        /** 解锁的拼图 */
        pictures: { [key: string]: { [key: number]: number } },
        /** 正在收集的拼图 ID */
        currentPictureId?: string,
        /** 已经集齐的拼图 ID */
        awardedPictureIds: string[]
    },
    /** 本周表现 */
    thisWeek: {
        medals: number,
        medals1v1: number,
        medalsQunzhan: number,
        rank?: number,
        rank1v1?: number,
        rankQunzhan?: number
    },
    /** 本月表现 */
    thisMonth: {
        medals: number,
        medals1v1: number,
        medalsQunzhan: number,
        rank?: number,
        rank1v1?: number,
        rankQunzhan?: number
    },
    ugc: {
        /** 累计出题 */
        created: number,
        /** 审核通过 */
        approved: number
    },
    /** 最近战绩 */
    history1v1: {
        result: "win" | "draw" | "lose",
        selfScore: number,
        oppScore: number,
        opponentInfo: {
            uid: string,
            nickname: string,
            avatar: string,
            gender: 0 | 1 | 2,
            medals: number
        }
    }[],
    historyQunzhan: {
        skinId: string,
        joinBy: "随机匹配" | "邀请同事" | "面对面开黑",
        isWin: boolean,
        endTime: string
    }[],
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /user/GetPointsHistory

### Request

```ts
interface ReqReqGetPointsHistory {
    page: number,
    pageSize: number,
    sso?: string
}
```

### Response

```ts
interface ReqResGetPointsHistory {
    list: {
        createTime: number,
        change: number,
        reason: string,
        after: number
    }[],
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /user/GetTodayRoundNum

### Request

```ts
interface ReqReqGetTodayRoundNum { sso?: string }
```

### Response

```ts
interface ReqResGetTodayRoundNum {
1v1: number,
    qunzhan: number,
        total: number,
            date: string,
                exceedTodayMax: boolean,
                    __refresh ?: {
                        sso?: string,
                        medals?: number,
                        points?: number,
                        energy?: number
                    }
}
```

## /user/GetUserInfo

### Request

```ts
interface ReqReqGetUserInfo {
    uid: string,
    sso?: string
}
```

### Response

```ts
interface ReqResGetUserInfo {
    uid: string,
    nickname: string,
    avatar: string,
    gender: 0 | 1 | 2,
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /user/RedeemStorePoints

### Request

```ts
interface ReqReqRedeemStorePoints {
    amount: number,
    sso?: string
}
```

### Response

```ts
interface ReqResRedeemStorePoints {
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /user/Sign

### Request

```ts
interface ReqReqSign {
    url: string,
    sso?: string
}
```

### Response

```ts
interface ReqResSign {
    appId: string,
    nonceStr: string,
    timestamp: number,
    signature: string,
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /user/UpdateUser

### Request

```ts
interface ReqReqUpdateUser {
    nickname?: string,
    avatar?: string,
    sso?: string
}
```

### Response

```ts
interface ReqResUpdateUser {
    user: {
        _id: string,
        nickname: string,
        /** 小号头像 72x72 */
        avatar: string,
        /** 中号头像 240x240 */
        avatarMiddle: string,
        /** 大号头像 640x640 */
        avatarBig: string,
        gender: 0 | 1 | 2,
        /** 工号 */
        jobNo: string,
        /** 地区 */
        country: string,
        province: string,
        city: string,
        from?: string,
        fromUid?: string,
        /** 积分 */
        points: number,
        /** 段位奖章数量 */
        medals: number,
        /** 字节范特质称号 */
        byteStyle: { [key: string]: number },
        /** 体力 */
        energy: number,
        /** 拉新人数 */
        invitedNewUser?: number,
        createTime: number
    },
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /user/Upload

### Request

```ts
interface ReqReqUpload {
    data: string | string,
    ext: string,
    sso?: string
}
```

### Response

```ts
interface ReqResUpload {
    /** 文件的绝对地址 */
    url: string,
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

## /user/UseEnergy

### Request

```ts
interface ReqReqUseEnergy {
    useAmount: number,
    reason: string,
    sso?: string
}
```

### Response

```ts
interface ReqResUseEnergy {
    newEnergy: number,
    __refresh?: {
        sso?: string,
        medals?: number,
        points?: number,
        energy?: number
    }
}
```

# Schemas