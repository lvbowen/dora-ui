import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export interface IconProps {
  // 图标的名称
  type: 'success' | 'error' | 'info' | 'warning' | 'loading';
  // size 大小
  size?: 'xss' | 'xs' | 'sm' | 'md' | 'lg';
  // color 图标的颜色
  color?: string;
  // 是否旋转 默认为false
  spinning?: boolean;
  // prefixCls 类名的前缀
  prefixCls?: string;
  // className
  className?: string;
  // onClick
  onClick?: (e: React.MouseEvent) => void;
}

const cacheScript = new Set();
const url = '//at.alicdn.com/t/font_1307286_wu10fg1zil.js';

class Icon extends Component<IconProps, {}> {
  static propTypes = {
    type: PropTypes.oneOf(['success', 'error', 'info', 'warning', 'loading']).isRequired,
    size: PropTypes.oneOf(['xss', 'xs', 'sm', 'md', 'lg']),
    color: PropTypes.string,
    spinning: PropTypes.bool,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func
  };

  static defaultProps = {
    type: 'info',
    prefixCls: 'dora-icon',
    size: 'md',
    color: '#000',
    onClick: () => {}
  };

  componentDidMount() {
    this.createScript();
  }

  createScript() {
    if (!cacheScript.has(url)) {
      const script = document.createElement('script');
      script.src = url;
      cacheScript.add(url);
      document.body.appendChild(script);
    }
  }

  render() {
    const { prefixCls, size, type, spinning, color, className, ...rest } = this.props;

    const cls = cx(prefixCls, className, `${prefixCls}-${size}`, {
      [`${prefixCls}-spinning`]: spinning
    });

    const style: React.CSSProperties = {
      color
    };

    return (
      <svg {...rest} className={cls} style={style}>
        <use xlinkHref={`#icon-${type}`} />
      </svg>
    );
  }
}

export default Icon;
