import React from 'react';
import { Button } from 'antd';
import Toast from '..';
import '../style';

import Spinner from '../../spinner';
import '../../spinner/style';

Toast.useIcons({
  loading: <Spinner></Spinner>,
});

export default () => (
  <Button
    onClick={() => {
      Toast.loading(null);
      setTimeout(() => {
        Toast.loaded();
      }, 2000);
    }}
  >
    自定义图标类型
  </Button>
);
