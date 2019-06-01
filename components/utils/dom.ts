export const stopBodyScroll = (() => {
  let top = 0;
  return function(isFixed = false) {
    const bodyEl = document.body;
    if (isFixed) {
      top = window.scrollY;
      bodyEl.style.position = 'fixed';
      bodyEl.style.top = -top + 'px';
      // 居中样式
      bodyEl.style.left = '0px';
      bodyEl.style.right = '0px';
    } else {
      bodyEl.style.position = '';
      window.scrollTo(0, top); // 回到原先的top
    }
  };
})();
