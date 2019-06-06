export interface TogglerShape {
  children: ([toggled, onToggle]: [boolean, (flag?: boolean) => void]) => React.ReactNode;
  defaultToggled?: boolean;
  afterToggled?: (toggled: boolean) => void;
}

// interface TestA {
//   a: number;
//   b?: string;
// }

// interface TestB {
//   b: string;
// }

// type TestC = TestA & TestB;

// let a: TestA = {
//   a: 1
// };

// let b: TestB = {
//   b: 'ccc'
// };

// let c: TestC = {
//   a: 1,
//   b: '2'
// };

// b = c;
// a = c;
