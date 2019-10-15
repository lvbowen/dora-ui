# Toast 轻提示

基于 Popup 组件（position:center），提供 success/error/info/loading 等类型 Toast。

- Toast.success(content,duration,callback,mask)
- Toast.error
- Toast.info
- Toast.loading
- Toast.destroy('success'|'error'|'info'|'loading') 传`undefined`销毁所有 Toast
- Toast.loaded === Toast.destroy('loading')

## 示例

### 只有文字提示的 toast

```jsx
import Toast from '../../components/toast';
import '../../components/toast/style';
export default () => (
  <button
    onClick={() => {
      Toast.info(
        <p>由于法律法规限制，balabalabala，您的发言不符合社区规范，哈哈哈哈哈哈哈哈哈</p>,
        2000
      );
    }}
  >
    only text
  </button>
);
```

### 持续时间为 3s 的 toast

```jsx
import Toast from '../../components/toast';
import '../../components/toast/style';
export default () => (
  <button
    onClick={() => {
      Toast.success('3s success toast', 3000);
    }}
  >
    toast keep 3s
  </button>
);
```

### 带回调的 toast

```jsx
import Toast from '../../components/toast';
import '../../components/toast/style';
export default () => (
  <button
    onClick={() => {
      Toast.error(
        'error toast',
        2000,
        () => {
          console.log('关闭后的回调');
        },
        false
      );
    }}
  >
    toast with callback
  </button>
);
```

### 带蒙层的 toast

```jsx
import Toast from '../../components/toast';
import '../../components/toast/style';
export default () => (
  <button
    onClick={() => {
      Toast.success('good!', 2000, undefined, true);
    }}
  >
    toast with mask
  </button>
);
```

### loading

```jsx
import Toast from '../../components/toast';
import '../../components/toast/style';
export default () => (
  <button
    onClick={() => {
      Toast.loading(
        <div>
          <p>loading text</p>
          <button onClick={Toast.loaded}>hide loading</button>
        </div>
      );
    }}
  >
    show loading
  </button>
);
```

### 自定义 Icon

使用自定义 Icon，全局生效。

未设置的 Toast 类型将使用`dora-ui`自带 icon

```js
Toast.useIcons({
  [key: ToastType]: ReactElement
});
```

例如：

```js
import { BounceLoader } from 'react-spinners';
Toast.useIcons({
  loading: <BounceLoader />
});
```

```jsx
import Toast from '../../components/toast';
import '../../components/toast/style';
import { BounceLoader } from 'react-spinners';

export default () => (
  <>
    <button
      onClick={() => {
        Toast.useIcons({
          loading: <BounceLoader color="#fff" />
        });
      }}
    >
      全局设置Loading Icon
    </button>
    <br />
    <br />
    <button
      onClick={() => {
        Toast.loading(
          <div>
            <p>loading text</p>
            <button onClick={Toast.loaded}>hide loading</button>
          </div>
        );
      }}
    >
      展示新的loading
    </button>
  </>
);
```

## API

| 属性     | 说明             | 类型      | 默认值            |
| -------- | ---------------- | --------- | ----------------- |
| content  | toast 内容       | ReactNode | -                 |
| duration | 持续时间（毫秒） | Number?   | 1500,loading 无效 |
| onClose  | 关闭回调         | Function? | ()=>{}            |
| mask     | 是否展示蒙层     | Boolean?  | false             |
