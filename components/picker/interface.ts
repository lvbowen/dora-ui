// [相关文章](https://segmentfault.com/a/1190000009611839)

export interface CascadeItem {
  label: string;
  value: string;
  children: CascadeItem[];
  [key: string]: any;
}

export type NormalItem = {
  label: string;
  value: string;
  [key: string]: any;
}[];

export interface Props {
  isCascade: boolean; // 是否级联 每一列的值变化 是否会影响其后面的列对应数组和值的变化 是否级联也会影响到数据源数据结果的不同
  data: CascadeItem[] | NormalItem[]; // 数据
  col: number; // 组件应该显示的列数
  value: string[]; // 默认值，一个数组，每一项对应一个col
  text: string; // popup组件中间的提示文字
  cancelText: string; // 取消按钮文案
  okText: string; //确认按钮文案
  onChange(values: string[]): any; // 点击确定之后的回调
  onCancel(): any; // 取消之后的回调
  onPickerChange?: (value: string) => any; // 每一列的值变化之后的回调
  wrapClassName: string; // 包装类名
  visible: boolean; // 是否可见
  mask: boolean; // 是否存在蒙层
  maskClosable: boolean; // 点击蒙层是否可以关闭
  stopScrollUnderMask: boolean; // 禁止滚动穿透
}

export interface State {
  value: string[];
}
