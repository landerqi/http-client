import createApi from '../lib'

const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

// 定义 url
// 定义示例：name: ['url', '描述', 'post'(可选，默认用 presetOption 中的 method)]
const urls = {
  testApi: ['/api/count/trend', '测试接口'],
  testError: ['/mobileweb/error', '测试错误'],
  testMock: ['/mobileweb/mock', '测试Mock'],
}

// 定义 mock
const mocks = {
  testMock: 'mockTestSuccess',
}

describe('基础测试', () => {
  // api 预设配置
  const presetOption = {
    urls, // url 定义对象
    mocks, // mock 定义对象
    method: 'get', // 默认请求方法，可选: 'post', 'jsonp', 'get'
    baseURL: `//xxx.com`, // 前置基础 URL
    timeout: 5000, // 超时时间，单位 ms
    log: true, // 打印数据 log

    // 请求之前钩子：请求前统一处理
    async beforeRequest (req) {
      req.data = {
        test: await timeout(1000),
        ...req.data,
      }
      return req
    },
    // 错误之后钩子：出错后统一处理
    afterError (e, req) {},
  }

  const $api = createApi(presetOption)

  it('$api 是否创建成功', () => {
    expect(typeof $api).toBe('object')
    expect(typeof $api.testApi).toBeDefined()
  })
  it('测试请求发起', async () => {
    const expected = {code: 1}
    expect.assertions(1)
    await expect($api.testApi({item: ['pay', 'gift']})).resolves.toEqual(expect.objectContaining(expected))
  })
  it('测试请求节流', async () => {
    expect.assertions(1)
    $api.testApi()
    await expect($api.testApi()).resolves.toEqual({ _status: 'throttle' })
  })
  it('测试请求节流关闭', async () => {
    const expected = {code: 1}
    expect.assertions(1)
    $api.testApi()
    await expect($api.testApi({}, { throttle: false })).resolves.toEqual(expect.objectContaining(expected))
  })
  it('测试请求错误', async () => {
    expect.assertions(1)
    await expect($api.testError({ timeout: 100 })).resolves.toBeTruthy()
  })
  it('测试请求Mocks', async () => {
    expect.assertions(1)
    await expect($api.testMock()).resolves.toBe('mockTestSuccess')
  })
  it('测试 beforeRequest 超时', async () => {
    const presetOption = {
      urls, // url 定义对象
      timeout: 1000, // 超时时间，单位 ms
      // 请求之前钩子：请求前统一处理
      async beforeRequest (req) {
        req.data = {
          test: await timeout(2000),
          ...req.data,
        }
        return req
      },
    }
    const $api = createApi(presetOption)
    expect.assertions(1)
    await expect($api.testApi()).resolves.toBeTruthy()
  })
})
