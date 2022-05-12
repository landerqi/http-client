import 'reflect-metadata';
import { PropertyOptions, ObjectPropertyOptions, ArrayPropertyOptions, MappingOptions, EnumPropertyOptions } from '../type';
export declare class ApiModel {
}
/**
 * 类装饰器，给类增加元数据
 * @param options 类装饰器配置
 */
export declare function mapping(options: MappingOptions): ClassDecorator;
/**
 * 枚举值装饰器，给属性增加元数据
 * @param options 装饰器配置
 */
export declare function enumDecorator(options?: EnumPropertyOptions): PropertyDecorator;
/**
 * string 类型的装饰器，给属性增加元数据
 * @param options 类装饰器配置
 */
export declare function string(options?: PropertyOptions): PropertyDecorator;
/**
 * boolean 类型的装饰器，给属性增加元数据
 * @param options 类装饰器配置
 */
export declare function boolean(options?: PropertyOptions): PropertyDecorator;
/**
 * number 类型的装饰器，给属性增加元数据
 * @param options 类装饰器配置
 */
export declare function number(options?: PropertyOptions): PropertyDecorator;
/**
 * array 类型的装饰器，给属性增加元数据
 * @param options 类装饰器配置
 */
export declare function array(options?: ArrayPropertyOptions): (target: any, key: string) => void;
/**
 * object 类型的装饰器，给属性增加元数据
 * @param options 类装饰器配置
 */
export declare function object(options?: ObjectPropertyOptions): (target: any, key: string) => void;
/**
 * 数据处理入口方法
 * @param Model 接口请求传入的model
 * @param data 通过mainField字段，筛选出接口返回的数据
 */
export declare function generateApiModel(Model: typeof ApiModel, data: any): any;
