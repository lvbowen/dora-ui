import React from 'react';
import Toast from 'dora-ui/lib/toast';
import 'dora-ui/lib/toast/style';

import { Button } from 'antd';

export default () => (
  <Button
    onClick={() => {
      Toast.info(
        <p>由于法律法规限制，balabalabala，您的发言不符合社区规范，哈哈哈哈哈哈哈哈哈</p>,
        2000
      );
    }}
  >
    基本使用
  </Button>
);
