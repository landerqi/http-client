class ApiModel {}

interface Config {
  model?: typeof ApiModel | null;
  method?: string;
  throttle?: boolean;
  completeResponse?: boolean;
  log?: boolean;
  mainField?: string;
}
export interface ApiFunction<T> {
  (data?: Record<string, any>, config?: Config): Promise<{
    res: T;
    rawRes?: any;
    _status?: string;
    _error?: string;
  }>;
}

type Option = {
  url: string; // 接口路径
  desc?: string; // 接口描述
  model?: any; // 数据模型
  method?: 'get' | 'post' | 'jsonp';
};

export type Urls = Record<string, Option>;
