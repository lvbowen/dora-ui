import { ComponentType } from 'react';

// 忽略T中为K的键
declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

/**
 * 目的：使得默认属性在类型定义中是可选的，但在组件实现中是必选的
 */
export const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
  defaultProps: DP,
  Cmp: ComponentType<P>
) => {
  // 抽取出必需的props（不含defaultProps的部分）
  type RequiredProps = Omit<P, keyof DP>;
  // 重新创建props接口定义，还原原本的接口定义
  type Props = Partial<DP> & Required<RequiredProps>;
  // 注入defaultProps
  Cmp.defaultProps = defaultProps;
  return (Cmp as ComponentType<any>) as ComponentType<Props>;
};
