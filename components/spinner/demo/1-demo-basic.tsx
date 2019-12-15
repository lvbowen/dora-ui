import React from 'react';
import Spinner from 'dora-ui/lib/spinner';
import 'dora-ui/lib/spinner/style';

export default () => (
  <div
    style={{
      background: 'rgba(0, 0, 0, 0.7)',
      height: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Spinner />
  </div>
);
