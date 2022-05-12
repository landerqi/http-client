# secure-http-client

> 创建安全的http 请求方法

## 安装

```bash
yarn add secure-http-client
```

## 使用

定义：

```js
// @/common/http_client
/**
 * 业务相关的 http 请求方法
 */
import HttpClient from 'secure-http-client'
import { getTicket, toast } from '@/common/xxx'
import { ApiFunction, Urls } from './demo/types';
import PayMessageConfigModel from './demo/models/pay_message';
import AnchorInfoModel from './demo/models/anchor_info';

// 定义后端 host
const beHost = {
  prod: 'x.xxx.com',
  test: 'xtest.xxx.com',
}

// 定义业务相关的 url
// value支持object {url: 'xxx'(必填), desc: 'xxx'(可选), method: 'get'(可选), model: ModelClass(可选)}
const urls: Urls = {
  enterstudio: {
    url: '/nonolive/gappserv/live/enterstudio',
    model: AnchorInfoModel,
  },
  payMsgConfig: {
    url: '/nonolive/gappserv/paidMessage/getConfig',
    model: PayMessageConfigModel,
  },
  getRechargeCoupon: { url: '/nonolive/payserv/user/getRechargeCoupon' },
};

// urls类型定义，同时通过泛型指定返回数据内型
type urlsTypes = {
  enterstudio: ApiFunction<AnchorInfoModel>;
  payMsgConfig: ApiFunction<PayMessageConfigModel>;
  getRechargeCoupon: ApiFunction<any>;
  postRecycle: ApiFunction<any>;
  getWidgetList: ApiFunction<any>;
  postWidgetSwitch: ApiFunction<any>;
};

// 定义 mock
const mocks = __DEV__ && {
  isHadTree: require('./mock/isHadTree'),
  // isHadTree2: require('./mock/isHadTree2'), // 关闭单个 mock：注释掉即可
}

// http 预设配置
const presetOption = {
  urls, // url 定义对象
  mocks, // mock 定义对象
  log: true, // 打印数据 log
  method: 'jsonp', // 默认请求方法：'post', 'jsonp', 'get' 等，支持所有常见的请求方法
  baseURL: `//${beHost[__PROD__ ? 'prod' : 'test']}`, // 前置基础 URL
  timeout: 5000, // 超时时间，单位 ms
  // axios 独有配置：更多字段参照 https://github.com/axios/axios
  headers: {}, // 设置头部信息
  // jsonp 独有配置
  callbackKey: 'callback', // 携带回调函数名的参数名
  callbackPrefix: '__jp', // 回调函数名前缀
  callbackName: '', // 回调函数名

  /**
   * 请求之前钩子：请求前统一处理
   * @param {Object} req = {url, data, config, method} config: 请求配置，url: 请求url, method：请求方法, data: 请求参数
   * @return 新的 req 对象
   */
  async beforeRequest(req) {
    // 统一添加数据
    req.data = {
      ticket: await getTicket(), // 携带 ticket
      ...req.data,
    }
    // 统一添加配置
    req.config = {
      // axios 独有配置：更多字段参照 https://github.com/axios/axios
      headers: {}, // 设置头部信息
      // jsonp 独有配置
      callbackKey: 'callback', // 携带回调函数名的参数名
      callbackPrefix: '__jp', // 回调函数名前缀
      callbackName: '', // 回调函数名
      ...req.config,
    }

    // 如果post请求需要特殊处理
    if (req?.method === 'post') {
      // arg.config.headers = {
      //   'Content-Type': 'application/x-www-form-urlencoded',
      // };
      // req.url = `${arg.url}?${qs.stringify(params)}`;
      req.config.withCredentials = true;
    } else {
      req.data = {
        // ...params,
        ...req.data,
      };
    }
    return req
  },
  /**
   * 请求之后钩子：请求后统一处理
   * @param {Object} res 接口返回
   * @param {Object} req = {url, data, config}
   * @param {Object} httpOption
   */
  afterResponse(res, req, httpOption) {
  },
  /**
   * 错误之后钩子：出错后统一处理
   * @param {Error} e 错误信息
   * @param {Object} req = {url, data, config}
   */
  afterError(e, req) {
    toast('请求超时')
  },
}

/**
 * 请求示例：$httpClient.isHadTree(data, config)
 * @param {Object} data 请求数据(可选)
 * @param {Object} config 当前的请求配置(可选)
 */
export default HttpClient.createHttp<urlsTypes>(presetOption)
```

调用：

```js
import $httpClient from '@/common/http_client'

const data = {
  a: 1,
  b: 2,
}
const res = await $httpClient.isHadTree(data)
```
