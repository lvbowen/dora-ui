import React from 'react';
import Toast from 'dora-ui/lib/toast';
import 'dora-ui/lib/toast/style';

import Spinner from 'dora-ui/lib/spinner';
import 'dora-ui/lib/spinner/style';

import { Button } from 'antd';

Toast.useIcons({
  loading: <Spinner></Spinner>
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
