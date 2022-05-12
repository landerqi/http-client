/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import 'reflect-metadata';
import { judgeType } from './helper';
import {
  PropertyOptions, ObjectPropertyOptions, ArrayPropertyOptions, MappingOptions, EnumPropertyOptions,
} from '../type';

// string, boolean, number, array(type), object(type), date(format)
// optional can be null

export class ApiModel {
}

/**
 * 类装饰器，给类增加元数据
 * @param options 类装饰器配置
 */
export function mapping(options: MappingOptions): ClassDecorator {
  // console.log('options::', options);
  return (target) => {
    Reflect.defineMetadata('mapping', options, target);
  };
}

/**
 * 枚举值装饰器，给属性增加元数据
 * @param options 装饰器配置
 */
export function enumDecorator(options?: EnumPropertyOptions):PropertyDecorator {
  return (target, key: string) => {
    if (options) {
      Reflect.defineMetadata('property', { type: 'enum', ...options }, target, key);
    } else {
      Reflect.defineMetadata('property', { type: 'enum' }, target, key);
    }
  };
}

/**
 * 数据处理方法
 * @param Model 数据模型，对应的class
 * @param data 要处理的数据
 */
function handleData(Model, data) {
  const result = new Model();
  const mappingOptions = Reflect.getMetadata('mapping', Model);

  // console.log('mappingOptions::', mappingOptions);
  Object.keys(mappingOptions).forEach((key) => {
    const targetArr = mappingOptions[key].split('.');
    const receiveDataKey = targetArr[targetArr.length - 1];
    // result[key] = data[mappingOptions[key]];

    // 获取属性的元数据
    const property = Reflect.getMetadata('property', result, key);
    // console.log('property options::', property);

    switch (property?.type) {
      case 'string':
        result[key] = checkString(data[receiveDataKey], key,
          { defaultVal: result[key], ...property });
        break;
      case 'number':
        result[key] = checkNumber(data[receiveDataKey], key,
          { defaultVal: result[key], ...property });
        break;
      case 'enum':
        result[key] = checkEnum(data[receiveDataKey], key,
          { defaultVal: result[key], ...property });
        break;
      case 'boolean':
        result[key] = checkBoolean(data[receiveDataKey], key,
          { defaultVal: result[key], ...property });
        break;
      case 'object':
        result[key] = checkObject(data[receiveDataKey], key,
          { defaultVal: result[key], ...property });
        break;
      case 'array':
        result[key] = checkArray(data[receiveDataKey], key,
          { defaultVal: result[key], ...property });
        break;
      default:
        break;
    }
  });
  return result;
}

/**
 * string 类型的装饰器，给属性增加元数据
 * @param options 类装饰器配置
 */
export function string(options?: PropertyOptions):PropertyDecorator {
  return (target, key: string) => {
    if (options) {
      Reflect.defineMetadata('property', { type: 'string', ...options }, target, key);
    } else {
      Reflect.defineMetadata('property', { type: 'string' }, target, key);
    }
  };
}

/**
 * boolean 类型的装饰器，给属性增加元数据
 * @param options 类装饰器配置
 */
export function boolean(options?: PropertyOptions):PropertyDecorator {
  return (target, key: string) => {
    if (options) {
      Reflect.defineMetadata('property', { type: 'boolean', ...options }, target, key);
    } else {
      Reflect.defineMetadata('property', { type: 'boolean' }, target, key);
    }
  };
}

/**
 * number 类型的装饰器，给属性增加元数据
 * @param options 类装饰器配置
 */
export function number(options?: PropertyOptions):PropertyDecorator {
  return (target, key: string) => {
    if (options) {
      Reflect.defineMetadata('property', { type: 'number', ...options }, target, key);
    } else {
      Reflect.defineMetadata('property', { type: 'number' }, target, key);
    }
  };
}

/**
 * array 类型的装饰器，给属性增加元数据
 * @param options 类装饰器配置
 */
export function array(options?: ArrayPropertyOptions) {
  return function (target: any, key: string) {
    Reflect.defineMetadata('property', { type: 'array', ...options }, target, key);
  };
}

/**
 * object 类型的装饰器，给属性增加元数据
 * @param options 类装饰器配置
 */
export function object(options?: ObjectPropertyOptions) {
  return function (target, key: string) {
    Reflect.defineMetadata('property', { type: 'object', ...options }, target, key);
  };
}

/**
 * 校验枚举值
 * @param data 接收到的数据
 * @param key 属性的key
 * @param options 装饰器配置
 */
function checkEnum(data: any, key: any, options: EnumPropertyOptions) {
  // console.log('check enum::', data, key, options);
  // console.log('data::', options.model[data]);
  // 如果不存在于枚举对象
  if (!options?.model[data]) {
    console.warn(
      `warn: ${key} expect enum val, but receive data is not in Enum`,
    );
    // 如果参数可选，但是值不存在，则返回 Null;
    if (options?.optional) {
      if (judgeType(data) === 'undefined') {
        return null;
      }
    }
    return options.defaultVal || 0;
  }
  return data;
}

/**
 * 校验 string
 * @param data 接收到的数据
 * @param key 属性的key
 * @param options 装饰器配置
 */
function checkString(data: any, key: any, options: PropertyOptions) {
  // console.log('check string:: ', data, key, options);
  if (judgeType(data) !== 'string') {
    console.warn(
      `warn: ${key} expect string, but receive ${judgeType(data)}`,
    );
    // 如果参数可选，但是值不存在，则返回 Null;
    if (options?.optional) {
      if (judgeType(data) === 'undefined') {
        return null;
      }
    }
    return options.defaultVal || '';
  }
  return data;
}

/**
 * 校验 number
 * @param data 接收到的数据
 * @param key 属性的key
 * @param options 装饰器配置
 */
function checkNumber(data: any, key: any, options:PropertyOptions) {
  // console.log('check number:: ', data);
  if (judgeType(data) !== 'number') {
    console.warn(
      `warn: ${key} expect number, but receive ${judgeType(data)}`,
    );
    // 如果参数可选，但是值不存在，则返回 Null;
    if (options?.optional) {
      if (judgeType(data) === 'undefined') {
        return null;
      }
    }
    return options.defaultVal || 0;
  }
  return data;
}

/**
 * 校验 boolean
 * @param data 接收到的数据
 * @param key 属性的key
 * @param options 装饰器配置
 */
function checkBoolean(data: any, key: any, options: PropertyOptions) {
  // console.log('check boolean:: ', data);
  if (judgeType(data) !== 'boolean') {
    console.warn(
      `warn: ${key} expect boolean, but receive ${judgeType(data)}`,
    );
    // 如果参数可选，但是值不存在，则返回 Null;
    if (options?.optional) {
      if (judgeType(data) === 'undefined') {
        return null;
      }
    }
    return options.defaultVal || false;
  }
  return data;
}

/**
 * 校验 array
 * @param data 接收到的数据
 * @param key 属性的key
 * @param options 装饰器配置
 */
function checkArray(data: any, key: string, options: ArrayPropertyOptions) {
  // console.log('check array::', data, key);
  const result = [];
  if (data && data.length > 0) {
    data.forEach((element) => {
      let item;
      if (judgeType(element) === 'string' || judgeType(element) === 'number' || judgeType(element) === 'boolean') {
        if (judgeType(element) !== options.model) {
          console.warn(
            `warn: ${key} value expect ${options.model}, but receive ${judgeType(
              element,
            )}`,
          );
        } else {
          item = element;
        }
      } else {
        const modalItem = checkObject(element, key, options);
        item = modalItem;
      }
      result.push(item);
    });
    return result;
  }
  if (options?.optional) return null;

  return options.defaultVal || [];
}

/**
 * 校验 object
 * @param data 接收到的数据
 * @param key 属性的key
 * @param options 装饰器配置
 */
function checkObject(data: any, key: string, options: ObjectPropertyOptions) {
  if (!options.model) return;

  // console.log('check object data and key:: ', data, key);
  // console.log('check object storeModel:: ', storeModel);
  if (judgeType(data) !== 'object') {
    console.warn(
      `warn: ${key} expect object, but receive ${judgeType(data)}`,
    );
    // 如果参数可选，但是值不存在，则返回 Null;
    if (options?.optional) {
      if (judgeType(data) === 'undefined') {
        return null;
      }
    }
    return options.defaultVal || null;
  }

  return handleData(options.model, data);
}

/**
 * 数据处理入口方法
 * @param Model 接口请求传入的model
 * @param data 通过mainField字段，筛选出接口返回的数据
 */
export function generateApiModel(Model: typeof ApiModel, data: any) {
  const resArr = [];
  const dataType = judgeType(data);
  if (dataType === 'array' && data.length > 0) {
    data.forEach((element) => {
      resArr.push(handleData(Model, element));
    });
    return resArr;
  } if (dataType === 'object') {
    return handleData(Model, data);
  }
  return null;
}
