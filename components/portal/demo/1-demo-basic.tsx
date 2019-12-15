import React from 'react';
import Portal from 'dora-ui/lib/portal';

export default () => (
  <>
    <p>the text in Playground container</p>
    <Portal>
      <p
        style={{
          color: 'blue',
          position: 'absolute',
          left: '30%',
          bottom: '0'
        }}
      >
        the text out of the root container(检查看看这段文字在文档流何处？)
      </p>
    </Portal>
  </>
);
