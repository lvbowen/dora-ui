# Countdown 倒计时

倒计时组件，根据[该文章](https://juejin.im/post/5badf8305188255c8e728adc)进行了纠偏。

## 示例

最基础的倒计时组件

### 基本用法

```jsx
import { Countdown } from '../../components';

export default () => <Countdown endTime={new Date().getTime() + 1000 * 60 * 60 * 24 * 3} />;
```

### 自定义模板

```jsx
import { Countdown } from '../../components';

export default () => (
  <Countdown
    format="dd-天 hh-: mm-: ss-"
    daysPadding
    endTime={new Date().getTime() + 1000 * 5}
    onEnd={() => {
      console.log(1);
    }}
  />
);
```

## API

| 属性          | 说明             | 类型      | 默认值                                                                        |
| ------------- | ---------------- | --------- | ----------------------------------------------------------------------------- |
| endTime       | 结束时间点，必传 | TimeStamp | -                                                                             |
| format        | 展示规则         | String?   | 'dd-天 hh-时 mm-分 ss-秒' `-`分隔连接符 block `dd-天 hh-时`之间要存在一个空格 |
| padding       | 是否补零         | Boolean?  | true                                                                          |
| daysPadding   | 天数是否补零     | Boolean?  | false                                                                         |
| wrapClassName | 自定义容器类名   | String?   | -                                                                             |
| prefixCls     | 自定义类名前缀   | String?   | 'dora-countdown'                                                              |
| onEnd         | 倒计时结束回调   | Function? | -                                                                             |
