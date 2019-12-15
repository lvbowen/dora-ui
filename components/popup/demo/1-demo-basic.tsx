import React from 'react';
import useToggle from 'react-use/esm/useToggle';

import { Button } from 'antd';

import Popup from 'dora-ui/lib/popup';
import 'dora-ui/lib/popup/style';

export default () => {
  const [visible, toggleVisible] = useToggle(false);

  return (
    <>
      <Button onClick={toggleVisible}>显示弹层</Button>
      <Popup mask maskClosable visible={visible} position="center" onClose={toggleVisible}>
        <div style={{ width: 200, height: 80, backgroundColor: '#fff', color: '#000' }}>
          在这里面写一些你喜欢的内容，如花式弹窗。
        </div>
      </Popup>
    </>
  );
};
