# Icon 图标

基于 iconfont svg 图标，目前只含五个基本图标。

## Basic Usage

```jsx
import Icon from '../../components/icon';
import '../../components/icon/style';
export default () => <Icon type="loading" size="lg" color="skyblue" spinning />;
```

## API

| 属性      | 说明           | 类型                                         | 默认值      |
| --------- | -------------- | -------------------------------------------- | ----------- |
| type      | 内置 icon 类型 | 'success','error','info','warning','loading' | 'info'      |
| size      | icon 大小      | 'sm','md','lg'                               | 'md'        |
| color     | icon 颜色      | String                                       | '#000'      |
| spinning  | 是否旋转       | Boolean                                      | false       |
| prefixCls | 类名前缀       | String                                       | 'dora-icon' |
| className | 自定义类名     | String                                       | -           |
| onClick   | 点击事件       | Function                                     | () => {}    |
