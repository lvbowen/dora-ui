## [0.0.7](https://github.com/worldzhao/dora-ui/compare/v0.0.6...v0.0.7) (2019-08-22)


### Bug Fixes

* **popup:** flex布局与绝对定位导致低版本机型样式错乱 ([e75bf15](https://github.com/worldzhao/dora-ui/commit/e75bf15))



## [0.0.6](https://github.com/worldzhao/dora-ui/compare/v0.0.2...v0.0.6) (2019-08-15)


### Bug Fixes

* **package.json:** sideEffects字段导致样式文件生产环境被shake掉 ([67f53c4](https://github.com/worldzhao/dora-ui/commit/67f53c4))
* **popup:** 遮罩在ios10及以下版本显示异常 ([9e0f7ce](https://github.com/worldzhao/dora-ui/commit/9e0f7ce))
* **style:** 移除normalize.less ([80a1196](https://github.com/worldzhao/dora-ui/commit/80a1196))


### Features

* **popup:** 增加自定义Icon配置方法 ([3a98202](https://github.com/worldzhao/dora-ui/commit/3a98202))



## [0.0.2](https://github.com/worldzhao/dora-ui/compare/4e54fd6...v0.0.2) (2019-08-03)


### Bug Fixes

* **countdown:** 倒计时结束后为-1 ([6adb281](https://github.com/worldzhao/dora-ui/commit/6adb281))
* **gulpfile.js:** css-nano change the zIndex ([7589535](https://github.com/worldzhao/dora-ui/commit/7589535))
* **gulpfile.js:** 修复cjs模式使用esm形式babel-helpers的问题 ([9863b72](https://github.com/worldzhao/dora-ui/commit/9863b72))
* **index.less:** 删除body全局样式 ([446a6a8](https://github.com/worldzhao/dora-ui/commit/446a6a8))
* **popup:** ios10及以下版本系统的flex布局对脱离文档流的元素不生效 ([c9ceb6a](https://github.com/worldzhao/dora-ui/commit/c9ceb6a))
* **popup:** transform导致文本换行 ([756b84e](https://github.com/worldzhao/dora-ui/commit/756b84e))
* **popup:** 移除popup默认样式,并处理Toast flex居中在低版本webview的兼容性问题 ([1c519c5](https://github.com/worldzhao/dora-ui/commit/1c519c5))
* **popup:** 采用js处理滚动穿透问题 ([4475650](https://github.com/worldzhao/dora-ui/commit/4475650))
* **spin:** icon样式依赖 ([5759247](https://github.com/worldzhao/dora-ui/commit/5759247))
* **toast:** toast文件没有引入popup样式 导致按需加载样式失败 ([e9fcaef](https://github.com/worldzhao/dora-ui/commit/e9fcaef))
* docs style ([60e60e1](https://github.com/worldzhao/dora-ui/commit/60e60e1))


### Features

* **countdown:** add component countdown ([b824a25](https://github.com/worldzhao/dora-ui/commit/b824a25))
* **countdown:** add default countdown style ([4969d2a](https://github.com/worldzhao/dora-ui/commit/4969d2a))
* **icon:** add Icon ([4e54fd6](https://github.com/worldzhao/dora-ui/commit/4e54fd6))
* **package.json:** react-spring => react-transition-group ([e836a8a](https://github.com/worldzhao/dora-ui/commit/e836a8a))
* **popup:** add component - popup ([0c3f736](https://github.com/worldzhao/dora-ui/commit/0c3f736))
* **popup:** 增加maskTransitionName以及transitionName属性 ([8911dcc](https://github.com/worldzhao/dora-ui/commit/8911dcc))
* **portal:** add basic portal component ([33a6487](https://github.com/worldzhao/dora-ui/commit/33a6487))
* **spin:** 增加delay/transition API ([465408a](https://github.com/worldzhao/dora-ui/commit/465408a))
* **spin:** 增加fullScreen API ([6507162](https://github.com/worldzhao/dora-ui/commit/6507162))
* **spin:** 完成spin组件基本功能 ([17b82ac](https://github.com/worldzhao/dora-ui/commit/17b82ac))
* **toast:** add component toast ([d0081ef](https://github.com/worldzhao/dora-ui/commit/d0081ef))
* **toast:** Toast组件基于Popup重构,支持离场动画 ([79a6036](https://github.com/worldzhao/dora-ui/commit/79a6036))
* **toast:** 根据UI规范优化Toast样式 ([47371be](https://github.com/worldzhao/dora-ui/commit/47371be))
* **utils:** 增加createPropsGetter方法,实现默认属性的另外一种方式 ([f5542c5](https://github.com/worldzhao/dora-ui/commit/f5542c5))
* Popup组件增加动画效果 ([63bf662](https://github.com/worldzhao/dora-ui/commit/63bf662))
* **toggler:** add component-toggler ([843be6e](https://github.com/worldzhao/dora-ui/commit/843be6e))



