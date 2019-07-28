import { ComponentType } from 'react';

// https://medium.com/@martin_hotell/react-typescript-and-defaultprops-dilemma-ca7f81c661c7

/**
 * 目的：使得默认属性在类型定义中是可选的
 * 但我们在组件实现中是必选的
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

/**
 * 默认属性不报错的另外一种实现方式
 * 把可选的defaultProps的类型剔除后，加入必选的defaultProps的类型，从而形成一个新的Props类型，
 * 这个Props类型中的defaultProps相关属性就变成了必选的
 * @param defaultProps 默认属性对象
 */
export const createPropsGetter = <DP extends object>(defaultProps: DP) => {
  return <P extends Partial<DP>>(props: P) => {
    // 剔除Props类型中关于defaultProps的部分
    type RequiredProps = Omit<P, keyof DP>;
    // 将默认属性的类型DP与剔除了默认属性的Props类型结合在一起 均为必选
    type Props = DP & RequiredProps;

    return (props as any) as Props;
  };
};
