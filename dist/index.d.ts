/**
 * 创建通用请求 http 语法方法
 * @Author landerqi
 * @Date 2021/6
 */
import { HttpClientOption } from './type';
import * as utils from './utils';
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
declare function httpClient<T>(option: HttpClientOption): T;
declare const _default: {
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
    mapping(options: import("./type").MappingOptions): ClassDecorator;
    enumDecorator(options?: import("./type").EnumPropertyOptions): PropertyDecorator;
    string(options?: import("./type").PropertyOptions): PropertyDecorator;
    boolean(options?: import("./type").PropertyOptions): PropertyDecorator;
    number(options?: import("./type").PropertyOptions): PropertyDecorator;
    array(options?: import("./type").ArrayPropertyOptions): (target: any, key: string) => void;
    object(options?: import("./type").ObjectPropertyOptions): (target: any, key: string) => void;
    generateApiModel(Model: typeof utils.ApiModel, data: any): any;
    ApiModel: typeof utils.ApiModel;
    httpClient: typeof httpClient;
};
export default _default;
