# Toggler 切换器

Toggler 是一个用于控制切换（一个布尔值）的 render props 组件，受[smooth UI-Toggler](https://smooth-ui.smooth-code.com/docs-utilities-toggler)启发。

常见使用场景：show/hide 某个组件，可以参考 Popup-与 Toggler 一起使用。

## 示例

### 基本使用

```jsx
import Toggler from '../../components/toggler';

export default () => (
  <Toggler>
    {([toggled, onToggle]) => <button onClick={onToggle}>{toggled ? 'ON' : 'OFF'}</button>}
  </Toggler>
);
```

### 设置默认状态

```jsx
import { Toggler } from '../../components';

export default () => (
  <Toggler defaultToggled>
    {([toggled, onToggle]) => <button onClick={onToggle}>{toggled ? 'ON' : 'OFF'}</button>}
  </Toggler>
);
```

### 监听切换事件

```jsx
import Toggler from '../../components/toggler';

export default () => (
  <Toggler afterToggled={toggled => alert(toggled)}>
    {([toggled, onToggle]) => <button onClick={onToggle}>{toggled ? 'ON' : 'OFF'}</button>}
  </Toggler>
);
```

## API

| 属性           | 说明                       | 类型      | 默认值                |
| -------------- | -------------------------- | --------- | --------------------- |
| children       | renderProps 所需函数，必需 | Function  | -                     |
| defaultToggled | 默认状态值                 | Boolean?  | false                 |
| afterToggled   | 当切换行为发生后触发的回调 | Function? | (toggled:boolean)=>{} |
