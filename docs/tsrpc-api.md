TSRPC API 接口文档
===

# API 接口列表

## admin

###  Admin-管理后台埋点
- **POST** `/admin/ActionStat`

- **请求**
```ts
interface ReqReqActionStat {
    /** 后台行为 */
    action: string,
    sso?: string
}
```

- **响应**
```ts
interface ReqResActionStat {
    sso?: string
}
```

### Admin-管理员操作日志列表
- **POST** `/admin/AdminLogList`

- **请求**
```ts
interface ReqReqAdminLogList {
    sso?: string
}
```

- **响应**
```ts
interface ReqResAdminLogList {
    /**
    * 日志list
    * _id: 唯一id
    * action: 管理员行为
    */
    logList: ({
        _id: string,
        action: string
    } & {
        /** 用户 uid */
        userId: string,
        /** 用户名称 */
        userName: string,
        /** 真是姓名 */
        realName: string,
        /** 最近登录时间 */
        time: string
    })[],
    sso?: string
}
```

### Admin-后台退出登录
- **POST** `/admin/AdminOutLogin`

- **请求**
```ts
interface ReqReqAdminOutLogin {
    sso?: string
}
```

- **响应**
```ts
interface ReqResAdminOutLogin {
    sso?: string
}
```

### Admin-获取管理员信息
- **POST** `/admin/AdminUserInfo`

- **请求**
```ts
interface ReqReqAdminUserInfo {
    sso?: string
}
```

- **响应**
```ts
interface ReqResAdminUserInfo {
    /**
    * userId: 用户uid
    * userName: 用户名称
    * realName: 真实姓名
    * avatar: 头像
    * roles: 管理员角色
    * useModule: 权限list
    * time: 最近登录时间
    */
    adminUserInfo: {
        /** 用户 uid */
        userId: string,
        /** 用户名称 */
        userName: string,
        /** 真是姓名 */
        realName: string,
        /** 头像 */
        avatar?: string,
        /** 权限规则 */
        roles: string,
        /** 开放功能 */
        useModule: string[],
        /** 最近登录时间 */
        time: string
    },
    sso?: string
}
```

### Admin -保存管理员用户信息
- **POST** `/admin/CreateAdminUser`

- **请求**
```ts
interface ReqReqCreateAdminUser {
    /** 账号 */
    account: string,
    /** 密码 */
    password: string,
    /** 用户名称 */
    userName: string,
    /** 真是用户名 */
    realName: string,
    /** 头像 */
    avatar?: string,
    /** 权限规则 */
    roles: string,
    /** 开放功能 */
    useModule: string[],
    sso?: string
}
```

- **响应**
```ts
interface ReqResCreateAdminUser {
    /** 成功失败 */
    msg: string,
    sso?: string
}
```

### Admin-修改管理员信息
- **POST** `/admin/EditAdminInfo`

- **请求**
```ts
interface ReqReqEditAdminInfo {
    /**
    * account: 账号
    * password: 密码
    * userId: 用户uid
    * userName: 用户名称
    * realName: 真实姓名
    * avatar: 头像
    * roles: 管理员角色
    * useModule: 权限list
    */
    adminInfo: {
        account: string,
        password: string,
        /** 用户 uid */
        userId: string,
        /** 用户名称 */
        userName: string,
        /** 真是姓名 */
        realName: string,
        /** 头像 */
        avatar?: string,
        /** 权限规则 */
        roles: string,
        /** 开放功能 */
        useModule: string[]
    },
    sso?: string
}
```

- **响应**
```ts
interface ReqResEditAdminInfo {
    /** 状态 */
    msg: string,
    sso?: string
}
```

### Admin-管理员列表
- **POST** `/admin/GetAdminList`

- **请求**
```ts
interface ReqReqGetAdminList {
    sso?: string
}
```

- **响应**
```ts
interface ReqResGetAdminList {
    /**
    * account: 账号
    * password: 密码
    * userId: 用户uid
    * userName: 用户名称
    * realName: 真实姓名
    * avatar: 头像
    * roles: 管理员角色
    * useModule: 权限list
    * time: 最新登录时间
    */
    adminList: {
        account: string,
        password: string,
        /** 用户 uid */
        userId: string,
        /** 用户名称 */
        userName: string,
        /** 真是姓名 */
        realName: string,
        /** 头像 */
        avatar?: string,
        /** 权限规则 */
        roles: string,
        /** 开放功能 */
        useModule: string[],
        /** 最近登录时间 */
        time: string
    }[],
    sso?: string
}
```

### Admin-控制后台登陆接口
- **POST** `/admin/Login`

- **请求**
```ts
interface ReqReqLogin {
    account: string,
    password: string
}
```

- **响应**
```ts
interface ReqResLogin {
    sso: string
}
```

---

## content

### Content-内容事件
- **POST** `/content/ContentMainEvent`

- **请求**
```ts
interface ReqReqContentMainEvent {
    /** 内容唯一id */
    mainClassId: string,
    /** 操作行为 */
    type: "state" | "del" | "populer",
    sso?: string
}
```

- **响应**
```ts
interface ReqResContentMainEvent {
    sso?: string
}
```

### Content-获取内容list
- **POST** `/content/GetContentMainList`

- **请求**
```ts
interface ReqReqGetContentMainList {
    sso?: string
}
```

- **响应**
```ts
interface ReqResGetContentMainList {
    /**
    * id: 内容唯一id
    * city: 城市
    * longitude: 城市坐标
    * isCharge: 是否免费
    * state: 是否开启
    * populer: 是否热门
    */
    list: ({
        title: string,
        address: string,
        longitude: string,
        time: string,
        tickets: string,
        tags: string[],
        isCharge: boolean,
        amount?: number,
        avgAmount?: number,
        carouselImages: string[],
        content: string,
        state: true | false,
        populer?: true | false,
        sso?: string
    } & {
        id: string,
        city: string,
        longitude: string,
        isCharge: boolean,
        state: boolean,
        populer?: boolean
    })[],
    sso?: string
}
```

### Content-获取城市list
- **POST** `/content/GetMainClassCityList`

- **请求**
```ts
interface ReqReqGetMainClassCityList {
    sso?: string
}
```

- **响应**
```ts
interface ReqResGetMainClassCityList {
    /** 城市list */
    list: string[],
    sso?: string
}
```

### Content-获取内容信息
- **POST** `/content/GetMainClassInfo`

- **请求**
```ts
interface ReqReqGetMainClassInfo {
    /** 内容标题 */
    title?: string,
    /** 内容唯一id */
    mainClassId?: string,
    sso?: string
}
```

- **响应**
```ts
interface ReqResGetMainClassInfo {
    /** city: 城市 */
    info: ({
        title: string,
        address: string,
        longitude: string,
        time: string,
        tickets: string,
        tags: string[],
        isCharge: boolean,
        amount?: number,
        avgAmount?: number,
        carouselImages: string[],
        content: string,
        state: true | false,
        populer?: true | false,
        sso?: string
    } & {
        city: string
    }) | undefined,
    sso?: string
}
```

### Content-获取内容标题list
- **POST** `/content/GetMainClassList`

- **请求**
```ts
interface ReqReqGetMainClassList {
    sso?: string
}
```

- **响应**
```ts
interface ReqResGetMainClassList {
    /** 标题list */
    list: {
        _id: string,
        title: string
    }[],
    sso?: string
}
```

### Content-获取子类列表
- **POST** `/content/GetSubClassList`

- **请求**
```ts
interface ReqReqGetSubClassList {
    mainClassId: string,
    sso?: string
}
```

- **响应**
```ts
interface ReqResGetSubClassList {
    /**
    * subId: 子类唯一id
    * title: 子类名称
    */
    list: {
        /** 子类唯一id */
        subId?: string,
        /** 子类名称 */
        title: string
    }[],
    sso?: string
}
```

### Content-获取子类内容
- **POST** `/content/GetValueClassInfo`

- **请求**
```ts
interface ReqReqGetValueClassInfo {
    /** 子类内容唯一id */
    valueClassId: string,
    sso?: string
}
```

- **响应**
```ts
interface ReqResGetValueClassInfo {
    /** 子类信息 */
    info: {
        valueTitleId?: string,
        imagesList: string[],
        videosList: string[],
        valueTitle: string,
        sso?: string
    } | undefined,
    sso?: string
}
```

### Content-获取子类内容lsit
- **POST** `/content/GetValueClassList`

- **请求**
```ts
interface ReqReqGetValueClassList {
    mainClassId: string,
    subClassId: string,
    sso?: string
}
```

- **响应**
```ts
interface ReqResGetValueClassList {
    /** 子类list */
    list: {
        _id: string,
        title: string
    }[],
    sso?: string
}
```

### Content-保存内容
- **POST** `/content/SaveMainClass`

- **请求**
```ts
interface ReqReqSaveMainClass {
    title: string,
    address: string,
    longitude: string,
    time: string,
    tickets: string,
    tags: string[],
    isCharge: boolean,
    amount?: number,
    avgAmount?: number,
    carouselImages: string[],
    content: string,
    state: true | false,
    populer?: true | false,
    sso?: string
}
```

- **响应**
```ts
interface ReqResSaveMainClass {
    sso?: string
}
```

### Contnet-保存子类配置
- **POST** `/content/SaveSubClass`

- **请求**
```ts
interface ReqReqSaveSubClass {
    mainClassId: string,
    subClassList: {
        /** 子类唯一id */
        subId?: string,
        /** 子类名称 */
        title: string
    }[],
    sso?: string
}
```

- **响应**
```ts
interface ReqResSaveSubClass {
    sso?: string
}
```

### Content-保存子类具体内容信息
- **POST** `/content/SaveValueClass`

- **请求**
```ts
interface ReqReqSaveValueClass {
    valueTitleId?: string,
    mainClassId: string,
    subClassId: string,
    imagesList: string[],
    videosList: string[],
    valueTitle: string,
    sso?: string
}
```

- **响应**
```ts
interface ReqResSaveValueClass {
    sso?: string
}
```

### Content-标签事件
- **POST** `/content/TagsEvent`

- **请求**
```ts
interface ReqReqTagsEvent {
    /** 标签唯一id */
    _id: string,
    /** 标签内容 */
    tag: string,
    /** 标签事件 */
    action: "create" | "update" | "delete" | "list",
    sso?: string
}
```

- **响应**
```ts
interface ReqResTagsEvent {
    /** 返回标签list */
    list?: {
        /** 标签唯一id */
        _id: string,
        /** 标签内容 */
        tag: string,
        sso?: string
    }[],
    sso?: string
}
```

---

## main

### Main-获取首页内容配置
- **POST** `/main/GetMainCfgList`

- **请求**
```ts
interface ReqReqGetMainCfgList {
    /**
    * scroll: 轮播图
    * city: 城市信息
    */
    mainCfgType: "scroll" | "city",
    sso?: string
}
```

- **响应**
```ts
interface ReqResGetMainCfgList {
    /** list */
    list: (({
        mainClassId: string,
        scrollImg: string,
        state: boolean,
        sso?: string
    } | {
        /** 城市 */
        city: string,
        /** 海报图 */
        poster: string,
        /** 是否开启 */
        state: boolean,
        /** 权重 */
        weights: number,
        sso?: string
    }) & {
        /** 更细时间 */
        updateTime: string
    })[],
    sso?: string
}
```

### Main-获取首页城市海报配置
- **POST** `/main/GetMainClassCityPoster`

- **请求**
```ts
interface ReqReqGetMainClassCityPoster {
    /** 城市 */
    city: string,
    sso?: string
}
```

- **响应**
```ts
interface ReqResGetMainClassCityPoster {
    /** 海报信息 */
    info?: {
        /** 城市 */
        city: string,
        /** 海报图 */
        poster: string,
        /** 是否开启 */
        state: boolean,
        /** 权重 */
        weights: number,
        sso?: string
    },
    sso?: string
}
```

### Main-获取首页轮播图细信息
- **POST** `/main/GetMainClassScrollImg`

- **请求**
```ts
interface ReqReqGetMainClassScrollImg {
    mainClassId: string,
    sso?: string
}
```

- **响应**
```ts
interface ReqResGetMainClassScrollImg {
    /** 轮播图信息 */
    info?: {
        mainClassId: string,
        scrollImg: string,
        state: boolean,
        sso?: string
    },
    sso?: string
}
```

### Main-保存首页城市海报图配置
- **POST** `/main/SaveMainClassCityPoster`

- **请求**
```ts
interface ReqReqSaveMainClassCityPoster {
    /** 城市 */
    city: string,
    /** 海报图 */
    poster: string,
    /** 是否开启 */
    state: boolean,
    /** 权重 */
    weights: number,
    sso?: string
}
```

- **响应**
```ts
interface ReqResSaveMainClassCityPoster {
    sso?: string
}
```

### Main-保存轮播图配置
- **POST** `/main/SaveMainClassScrollImg`

- **请求**
```ts
interface ReqReqSaveMainClassScrollImg {
    mainClassId: string,
    scrollImg: string,
    state: boolean,
    sso?: string
}
```

- **响应**
```ts
interface ReqResSaveMainClassScrollImg {
    sso?: string
}
```

---