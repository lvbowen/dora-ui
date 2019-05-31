export interface TogglerShape {
  children: ([toggled, onToggle]: [boolean, () => void]) => React.ReactNode;
  defaultToggled?: boolean;
  afterToggled?: (toggled: boolean) => void;
}
