import { i18n as zhCN } from './zh-cn';
import { i18n as enUS } from './en-us';

// 根据系统语言判断中英文
export const i18n = require('os-locale').sync() === 'zh-CN' ? zhCN : enUS;