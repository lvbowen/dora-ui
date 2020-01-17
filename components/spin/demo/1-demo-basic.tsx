import React from 'react';
import Spin from '..';
import '../style';

import { Button } from 'antd';
import useToggle from 'react-use/lib/useToggle';

export default () => {
  const [loading, toggleLoading] = useToggle(false);

  return (
    <>
      <Spin spinning={loading} fullScreen={false}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum tempora illum soluta, ipsum
          quod libero reiciendis consequuntur incidunt ipsa pariatur, quaerat eligendi. Commodi
          earum quos culpa animi, libero minima eligendi!
        </p>
      </Spin>

      <Button onClick={toggleLoading}>基本使用</Button>
    </>
  );
};
