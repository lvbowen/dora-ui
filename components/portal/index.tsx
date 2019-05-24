import React, { Component } from 'react';

export default class Portal extends Component<any, any> {
  private constructor(props: any) {
    super(props);
    this.state = {
      visible: false
    };
  }

  private handleBtnClick = () => {
    const testArr: number[] = [1, 2, 3];
    console.log(Array.isArray(testArr));
    console.log(testArr.includes(0));
    this.setState({
      visible: !this.state.visible
    });
    return Promise.resolve(1);
  };

  public render() {
    const { visible } = this.state;
    const content = visible ? <div>I am visible</div> : <div>I am hide</div>;

    return (
      <div className="dora-portal">
        <button onClick={this.handleBtnClick}>click me</button>
        {content}
      </div>
    );
  }
}
