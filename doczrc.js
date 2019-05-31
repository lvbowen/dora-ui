const doczPluginNetlify = require('docz-plugin-netlify');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackMerge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const modifyBundlerConfig = (config, dev) => {
  const styleLoaders = ['css-loader'];
  styleLoaders.unshift(dev ? 'style-loader' : MiniCssExtractPlugin.loader);
  return webpackMerge(config, {
    resolve: {
      alias: {
        components: path.resolve(__dirname, './components') // 配置alias
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: styleLoaders
        },
        { test: /\.less$/, use: [...styleLoaders, 'less-loader'] }
      ]
    },
    optimization: {
      minimizer: [new OptimizeCSSAssetsPlugin({})]
    },
    /**
     * 每个组件mdx都引入一个全量less 打包时进行命名覆盖
     * 为什么？
     * 最优解法为组件mdx中直接引入component/style/index.ts进行样式按需加载 就和我们组件库按需加载一样
     * 然而 docz build之后 并无法打包ts文件引入的less（dev没问题）
     * 一个一个手动引入less文件还要考虑到所写组件依赖的组件的样式 心智成本太高了（没错，和组件库按需引入思路一致，所以才有了component/style/index.ts）
     * 统一写一个全量的less文件（docs/style/index.lesss）专门用于组件mdx引入
     * 最后打包时又会生成多个全量css文件 dora-ui-[components].[hash].css（因为docz默认存在code splitting）
     * 所以每个组件mdx只引入一个全量less 同时打包时进行命名覆盖 最终只生成一个全量css文件 每个组件页面都会去请求
     */
    plugins: [
      dev
        ? () => {}
        : new MiniCssExtractPlugin({
            chunkFilename: 'static/css/common.[hash].css'
          })
    ]
  });
};

module.exports = {
  title: 'Dora UI', // 网站名称
  codeSandbox: false, // 是否开启codeSandbox
  htmlContext: {
    // 引入html一些内容
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://codemirror.net/theme/material.css'
        }
      ]
    }
  },
  themeConfig: {
    // 主题配置
    showPlaygroundEditor: false, // 展示Playground编辑器
    codemirrorTheme: 'material' // 代码主题
  },
  typescript: true, // 支持typescript组件
  propsParser: false, // 是否解析组件props用于官方Props组件展示
  notUseSpecifiers: true,
  filterComponents: files =>
    files.filter(filepath => /components\/.*\/*\.(js|jsx|ts|tsx)$/.test(filepath)),
  modifyBundlerConfig,
  plugins: [doczPluginNetlify()],
  menu: [
    'Introduction', // auto ordered menu "Introduction"
    'Quick Start',
    'Changelog',
    {
      name: 'Components' // manually oredered menu "Components"
    }
  ]
};
