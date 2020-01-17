import React from 'react';
import Spin from '..';
import '../style';

import { Button } from 'antd';
import { BounceLoader, ClipLoader, ScaleLoader } from 'react-spinners';

export default class extends React.Component {
  state = {
    loading: false,
    spinner: undefined
  };
  spinnerIndex = -1;

  changeSpinner = () => {
    const spinners: React.ReactNode[] = [
      BounceLoader,
      ClipLoader,
      ScaleLoader
    ].map((Spinner: typeof BounceLoader) => <Spinner></Spinner>);
    this.spinnerIndex = this.spinnerIndex + 1 === spinners.length ? 0 : this.spinnerIndex + 1;
    this.setState({
      spinner: spinners[this.spinnerIndex],
      loading: true
    });
  };

  render() {
    const { loading, spinner } = this.state;
    return (
      <>
        <div>
          <Spin spinning={loading} spinner={spinner} fullScreen={false}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum tempora illum soluta,
              ipsum quod libero reiciendis consequuntur incidunt ipsa pariatur, quaerat eligendi.
              Commodi earum quos culpa animi, libero minima eligendi!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum tempora illum soluta,
              ipsum quod libero reiciendis consequuntur incidunt ipsa pariatur, quaerat eligendi.
              Commodi earum quos culpa animi, libero minima eligendi!
            </p>
          </Spin>
        </div>
        <Button onClick={this.changeSpinner}>点击切换Spinner</Button>
      </>
    );
  }
}
