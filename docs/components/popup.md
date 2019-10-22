# Popup 弹层

底层弹层组件，Portal 组件的上层封装，参考 cube-ui（[基于 Vue.js 实现的精致移动端组件库](https://didi.github.io/cube-ui/#/zh-CN)）API。

可以理解为提供基础功能的传送门：是否有蒙层（mask）以及定位（position）。

自定义动画，以增强体验。

## 示例

### 基本用法

```jsx
import { Popup, Toggler } from '../../components';
import '../../components/popup/style';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  open = () => {
    this.setState({
      visible: true
    });
  };

  hide = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <div>
        <button onClick={this.open}>popup!</button>
        <Popup position="center" visible={visible} onClose={this.hide}>
          Popup
        </Popup>
      </div>
    );
  }
}
```

### 与 Toggler 一起使用

```jsx
import { Popup, Toggler } from '../../components';
import '../../components/popup/style';

export default () => (
  <Toggler>
    {([toggled, onToggle]) => {
      return (
        <>
          <button onClick={() => onToggle(true)}>popup!</button>
          <Popup visible={toggled} position="top" onClose={() => onToggle(false)}>
            从上弹出
          </Popup>
        </>
      );
    }}
  </Toggler>
);
```

## API

```ts
type positionType = 'top' | 'right' | 'bottom' | 'left' | 'center';
```

| 属性                | 说明                                                                                          | 类型          | 默认值                                                                                              |
| ------------------- | --------------------------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------- |
| visible             | 显示状态，是否可见                                                                            | Boolean?      | false                                                                                               |
| children            | 内容，必传                                                                                    | ReactNode     | -                                                                                                   |
| position            | 弹层位置                                                                                      | positionType? | 'center'                                                                                            |
| mask                | 是否展示蒙层                                                                                  | Boolean?      | true                                                                                                |
| maskClosable        | 点击蒙层是否隐藏(需要有 onClose 方法)                                                         | Boolean?      | true                                                                                                |
| onClose             | 点击蒙层的回调                                                                                | Function?     | ()=>{}                                                                                              |
| node                | 挂载节点                                                                                      | HTMLElement?  | 无，不传时会在 body 尾部下 新建 div 以容纳弹层，存在多个 Popup 时可选择同一个 node 进行单例控制优化 |
| stopScrollUnderMask | 存在蒙层时是否禁止滚动穿透                                                                    | Boolean?      | true，默认禁止滚动穿透。注：复杂弹层内容时禁止滚动穿透可能存在问题                                  |
| destroyOnClose      | 隐藏时销毁内容组件                                                                            | Boolean?      | false                                                                                               |
| wrapClassName       | 自定义容器类名                                                                                | String?       | -                                                                                                   |
| contentStyle        | 内容行内样式                                                                                  | Object?       | {}                                                                                                  |
| transitionName      | 内容过渡动画，可自定义，定义方式参考 react-transition-group                                   | String?       | 映射 position 默认动画                                                                              |
| transitionDuration  | 内容过渡动画持续时间，只对自定义动画有效（与 transitionName CSS 过渡时间 保持一致，单位毫秒） | number?       | 300ms                                                                                               |
