# Spinner 加载元素

用于页面和区块的加载中状态。

## 示例

### 基本使用

```jsx
import Spinner from '../../components/spinner';
import '../../components/spinner/style';
export default () => (
  <div style={{ background: '#000', textAlign: 'center' }}>
    <Spinner />
  </div>
);
```

## API

| 属性 | 说明 | 类型           | 默认值 |
| ---- | ---- | -------------- | ------ |
| size | 大小 | 'sm'/'md'/'lg' | 'md'   |
