/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 创建通用请求 http 语法方法
 * @Author landerqi
 * @Date 2021/6
 */

import { createHttp } from '@landerqi/http';
import qs from 'qs';
// import { Api, HttpClientOption } from './type';
import { HttpClientOption } from './type';
import * as utils from './utils';
import * as relfect from './utils/reflect';

// 定义简单请求
const simpleMethods = ['get', 'delete', 'head', 'options'];

/**
 * 创建 http client
 * @param {Object} option 配置
 * option字段：
 * {
 *  urls: Object, // url 集合对象
 *  mocks: Object, // mock 集合对象
 *  method: String, // http 请求方法
 *  baseURL: String, // 前置基础 URL
 *  timeout: Number, // 超时时间，单位 ms
 *  throttle: Boolean, // 是否节流
 *  log: Boolean, // 是否显示数据 log
 *  completeResponse: Boolean, // 返回完整的响应，jsonp 不适用
 *
 *  beforeRequest: Func, //  请求之前 钩子
 *  afterResponse: Func, // 响应之后 钩子
 *  afterError: Func, // 错误之后 钩子
 * }
 *
 * @return {Object} api 方法
 */
function httpClient<T>(option: HttpClientOption): T {
  const {
    urls = {},
    mocks = null,
    method: defaultMethod = 'post',
    baseURL = '',
    timeout = 5000,
    throttle: defaultThrottle = true,
    log: defaultLog = true,
    completeResponse: defaultCompleteResponse = false,
    mainField: defaultMainField = 'body',
    beforeRequest,
    afterResponse,
    afterError,
    ...extraOption
  } = option;

  const httpOption = { baseURL, timeout, ...extraOption }; // 请求配置
  const $http = createHttp(httpOption); // 创建固化配置的 http 方法

  const _temp: Record<string, any> = {}; // 存放临时状态

  // const $api: Api<any> = {};
  const $api = {};
  Object.keys(urls).forEach((key) => {
    /**
     * @param {Object} data 请求数据
     * @param {Object} config 当前的请求配置
     */
    $api[key] = async (
      data = {},
      config: any = {},
    ): Promise<{
      res?: any;
      rawRes?: any;
      _status?: string;
      _error?: string;
    }> => {
      let url; // 接口url
      let desc; // 接口描述
      let method; // 接口请求方法
      let model; // 数据模型
      const urlsItem = urls[key]; // type: Object

      if (utils.judgeType(urlsItem) === 'object') {
        url = urlsItem.url;
        desc = urlsItem.desc || urlsItem.url;
        method = config.method || urlsItem.method || defaultMethod;
        model = urlsItem.model;
      } else {
        throw new Error('illegal urls config');
      }

      // config中的model优先级高于urls里传入的model
      if (config.model) model = config.model;

      const throttle = config.throttle !== undefined ? config.throttle : defaultThrottle;
      const log = config.log !== undefined ? config.log : defaultLog;
      const completeResponse = config.completeResponse !== undefined
        ? config.completeResponse
        : defaultCompleteResponse;
      const mainField = config.mainField !== undefined ? config.mainField : defaultMainField;

      // mock serve
      let mockRes;
      if (mocks && mocks[key]) {
        const mocksItem = mocks[key];
        const mockEnable = mocksItem && (Array.isArray(mocksItem) ? mocksItem[0] : mocksItem);
        mockRes = mocksItem && (Array.isArray(mocksItem) ? mocksItem[1] : mocksItem);
        if (mockEnable) {
          if (log) console.log(`【Http】 -- ${key}:${desc} Mock --`, mockRes);
          const rawRes = mockRes;
          const mainFieldData = utils.getValueByPath(mockRes, mainField);
          if (model) {
            mockRes = utils.generateApiModel(
              model,
              mainFieldData || mockRes,
            );
            return { res: mockRes, rawRes };
          }
          return { res: mockRes };
        }
      }

      // throttle 节流
      const throttleFlag = `${key}ThrottleFlag`; // 节流 flag 属性名
      const previousData = `${key}PreviousData`; // 上一次请求的数据 属性名

      // 若 相同请求接口 & 相同请求数据 & 上一个相同请求未完成，则被节流
      if (
        throttle
        && _temp[throttleFlag]
        && utils.isEqual(_temp[previousData], data)
      ) {
        console.warn(`【Http】 ** ${key}:${desc} 节流 **`, data);
        return {
          _status: 'throttle',
        };
      }
      _temp[throttleFlag] = true;
      _temp[previousData] = data;

      try {
        // log 打印请求数据
        if (log) console.log(`【Http】 -- ${key}:${desc} 请求 --`, data);

        // 请求之前 钩子
        if (beforeRequest) {
          const req = {
            url, data, config, method,
          };
          const newReq: any = (await Promise.race([
            beforeRequest(req),
            utils.timeoutPromise(timeout),
          ])) || {};
          if (newReq === 'timeout') {
            throw new Error('beforeRequest Hooks Timeout');
          }
          url = newReq.url || url;
          data = newReq.data || data;
          config = newReq.config || config;
        }

        const isSimpleMethod = simpleMethods.some((item) => item === method); // 是否为简单请求

        // 发起请求
        let res;
        if (isSimpleMethod) {
          url = url
            + (url.indexOf('?') < 0 ? '?' : '&')
            + qs.stringify(data, { arrayFormat: 'repeat' });
          res = await $http[method](url, config);
        } else {
          res = await $http[method](url, data, config);
        }

        if (method !== 'jsonp') {
          if (completeResponse) {
            res = {
              _headers: res.headers,
              _status: res.status,
              _statusText: res.statusText,
              _request: res.request,
              _config: res.config,
              ...res.data,
            };
          } else {
            res = res.data;
          }
        }

        // log 打印响应数据
        if (log) console.log(`【Http】 -- ${key}:${desc} 响应 --`, res);

        // 响应之后 钩子
        if (afterResponse) {
          res = (await afterResponse(res, { url, data, config }, httpOption))
            || res;
        }

        const rawRes = res;
        const mainFieldData = utils.getValueByPath(res, mainField);
        if (model) {
          res = utils.generateApiModel(
            model,
            mainFieldData || res,
          );
          return { res, rawRes };
        }
        return { res };
      } catch (err) {
        console.error(`【Http】 ** ${key}:${desc} 出错 **`, err);

        // 错误之后 钩子
        if (afterError) afterError(err, { url, data, config }, httpOption);

        return {
          _status: 'error',
          _error: String(err),
        };
      } finally {
        // throttle 恢复触发
        _temp[throttleFlag] = false;
      }
    };
  });

  return $api as T;
}

export default { httpClient, ...relfect };
