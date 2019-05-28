---
name: Quick Start
---

# 快速开始

## 安装

使用 npm

```
npm i @xmly/dora-ui -S
```

使用 yarn

```
yarn add @xmly/dora-ui
```

## 如何使用

全部引入

```jsx
import { Toast } from '@xmly/dora-ui';
import '@xmly/dora-ui/dist/dora-ui.min.css';
```

按需引入

手动按需引入

```jsx
import Toast from '@xmly/dora-ui/lib/toast';
// less (需项目支持less)
import '@xmly/dora-ui/lib/toast/style';
// or css
import '@xmly/dora-ui/lib/toast/style/css';
```

使用[babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import)

```js
// .babelrc.js
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: '@xmly/dora-ui',
        libraryDirectory: 'es', // default: lib, es有利于tree shakeing
        style: true // 引入less(需项目支持less) or 'css' 引入css
      }
    ]
  ]
};
```

直接如下引入组件即可

```jsx
import { Toast } from '@xmly/dora-ui';
```
