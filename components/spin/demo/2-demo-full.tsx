import React from 'react';
import Spin from 'dora-ui/lib/spin';
import 'dora-ui/lib/spin/style';

import { Button } from 'antd';
import useToggle from 'react-use/lib/useToggle';

export default () => {
  const [loading, toggleLoading] = useToggle(false);

  const handleBtnClick = () => {
    toggleLoading();
    setTimeout(toggleLoading, 3000);
  };

  return (
    <>
      <Spin spinning={loading} fullScreen={true}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum tempora illum soluta, ipsum
          quod libero reiciendis consequuntur incidunt ipsa pariatur, quaerat eligendi. Commodi
          earum quos culpa animi, libero minima eligendi!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis voluptas qui, a incidunt
          porro doloremque magni debitis dolorem quo deleniti quas, at nemo nisi. Earum voluptate
          libero in modi possimus.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ut voluptates cupiditate odio
          atque alias, aspernatur qui! Porro ad nesciunt totam reiciendis minima, quas sit veniam
          excepturi a, asperiores autem!
        </p>
      </Spin>

      <Button onClick={handleBtnClick}>全屏加载</Button>
    </>
  );
};
