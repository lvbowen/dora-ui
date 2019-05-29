// We convert less import in es/lib to css file path - antd-tools
// 根据component/style/index.js 生成component/style/css.js 以便css按需加载
module.exports = function cssInjection(content) {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.less/g, '.css');
};
