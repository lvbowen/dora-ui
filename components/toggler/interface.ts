export interface TogglerShape {
  children: ([toggled, onToggle]: [boolean, (flag?: boolean) => void]) => React.ReactNode;
  defaultToggled?: boolean;
  afterToggled?: (toggled: boolean) => void;
}
