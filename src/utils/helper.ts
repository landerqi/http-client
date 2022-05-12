/**
 * 帮助函数模块
 */

/**
 * 对象是否相等
 */
export const isEqual = (a: any, b: any) =>
  JSON.stringify(a) === JSON.stringify(b);

/**
 * 对象过滤字段
 */
export const objectFilter = (obj: any = {}, excludeKeys = []) =>
  Object.keys(obj).reduce((acc: any, key) => {
    const isExclude = excludeKeys.some((excludeKey) => excludeKey === key);
    if (!isExclude) acc[key] = obj[key];
    return acc;
  }, {});

/**
 * timeout Promise 封装
 */
export const timeoutPromise = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time, 'timeout');
  });

/**
 * 判断类型
 */
export const judgeType = (ele) => {
  let dataType = '';
  if (typeof ele !== 'object') {
    dataType = typeof ele;
  } else {
    const tempStr = Object.prototype.toString.call(ele);
    dataType = tempStr.match(/\[object (.*?)\]/)[1].toLowerCase();
  }
  return dataType;
};

/**
 * 根据路径获取对象
 * @param obj 对象
 * @param path 对象属性路径
 */
export function getValueByPath(obj, path) {
  const paths = path.split('.');
  let res = obj;
  let prop;
  // eslint-disable-next-line no-cond-assign
  while (prop = paths.shift()) {
    res = res[prop];
  }
  return res;
}
