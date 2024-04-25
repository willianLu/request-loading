# request-loading

基于 TypeScript 开发的 HTTP 请求 Loading 动画插件，主要用于延迟展示 Loading 和防止重复点击。

延迟展示 Loading，短时间内的请求不展示 Loading，当请求时间达到某个阈值（默认 500ms），则展示 Loading，为了防止 Loading 闪烁，做了最少展示时间处理。
防重复点击，当调用 Loading show 时，则先展示透明遮罩，用于阻止用户点击，Loading hide 时，则移除该遮罩。

### 安装

```bash
# 使用npm
npm i -S request-loading
# 使用yarn
yarn add request-loading
```

### 运行项目示例

```bash
cd ./example
npm install
npm run dev
```

### 用法

```ts
// 需要引入全局样式
import Loading from 'request-loading'
import 'request-loading/dist/index.css'

Loading.show()

http.get('/user/info').then(() => {
  Loading.hide()
})
```

### 方法

- setConfig(options)
  你可以设置 Loading 的配置，来达到更理想的效果

| 参数         | 类型   | 必填项 | 默认                     | 说明                      |
| ------------ | ------ | ------ | ------------------------ | ------------------------- |
| zIndex       | number | 否     | 9999                     | 指定 loadin 层级          |
| delay        | number | 否     | 500                      | 延迟展示 loading 的时间   |
| icon         | string | 否     | 'default'、'dot'、 'bar' | 默认提供三种 Loading 动画 |
| iconTemplate | string | 否     | --                       | 设置自定义 icon 模版      |

- show
  Loading 展示调用

- hide
  关闭 Loading 调用

## License

MIT
