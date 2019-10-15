# Portal 传送门

传送门组件，不提供样式，Modal/Toast/Popup 等组件的基石。

基于 React 16 的 createPortal 方法，使用该组件的好处是不需要自己管理动态插入的节点。

## Basic Usage

```jsx
import Portal from '../../components/portal';

export default () => (
  <>
    <div>the text in Playground container</div>
    <Portal>
      <div
        style={{
          color: 'blue',
          position: 'absolute',
          left: '30%',
          bottom: '0'
        }}
      >
        the text out of the root container(检查看看这段文字在文档流何处？)
      </div>
    </Portal>
  </>
);
```

## API

| 属性     | 说明           | 类型         | 默认值 |
| -------- | -------------- | ------------ | ------ |
| node     | 自定义容器节点 | HTMLElement? | -      |
| children | 需要传送的内容 | ReactNode    | -      |
