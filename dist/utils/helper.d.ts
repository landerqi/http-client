/**
 * 帮助函数模块
 */
/**
 * 对象是否相等
 */
export declare const isEqual: (a: any, b: any) => boolean;
/**
 * 对象过滤字段
 */
export declare const objectFilter: (obj?: any, excludeKeys?: any[]) => any;
/**
 * timeout Promise 封装
 */
export declare const timeoutPromise: (time: number) => Promise<unknown>;
/**
 * 判断类型
 */
export declare const judgeType: (ele: any) => string;
/**
 * 根据路径获取对象
 * @param obj 对象
 * @param path 对象属性路径
 */
export declare function getValueByPath(obj: any, path: any): any;
