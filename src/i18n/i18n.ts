import { i18n as zhCN } from './zh-cn';
import { i18n as enUS } from './en-us';

// 根据系统语言判断中英文
export const i18n: typeof zhCN = require('os-locale').sync() === 'zh-CN' ? zhCN : enUS;
// TODO en-us
// export const i18n = zhCN;