import { ApiModel } from './utils/reflect';

export interface ApiFunction<T> {
  (
    data?: Record<string, any> | undefined,
    config?: Record<string, any> | undefined,
  ): Promise<{ res?: T; rawRes?: any; _status?: string; _error?: string }>;
}
export interface Api<T> {
  [propName: string]: ApiFunction<T>;
}
export interface Req {
  url: string;
  data: Record<string, any> | undefined;
  config: Record<string, any> | undefined;
}
export interface HttpClientOption {
  urls: Record<string, any>;
  mocks?: Record<string, any> | boolean | undefined | null;
  method?: string;
  baseURL?: string;
  timeout?: number;
  throttle?: boolean;
  log?: boolean;
  beforeRequest?(req: Req): Promise<Req> | void;
  afterResponse?(
    res: any,
    req: Req,
    httpOption: Record<string, any>,
  ): Promise<any> | void;
  afterError?(err: Error, req: Req, httpOption: Record<string, any>): void;
  [propName: string]: any;
}

export interface PropertyOptions {
  optional?: boolean;
  defaultVal?: any;
}

export interface EnumPropertyOptions {
  optional?: boolean;
  model?: any;
  defaultVal?: any;
}

export interface ArrayPropertyOptions {
  optional?: boolean;
  model?: ApiModel | 'string' | 'number';
  defaultVal?: any;
}

export interface ObjectPropertyOptions {
  optional?: boolean;
  model?: ApiModel | 'string' | 'number';
  defaultVal?: any;
}

export interface MappingOptions {
  [key: string]: string;
}
