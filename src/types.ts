export interface SpinnerWheelItem {
  id: string | number;
  label: string;
  color?: string;
  textColor?: string;
}

export interface SpinnerWheelProps {
  items: SpinnerWheelItem[];
  onSpinComplete?: (item: SpinnerWheelItem) => void;
  spinning?: boolean;
  duration?: number;
  size?: number;
  fontSize?: number;
  borderWidth?: number;
  borderColor?: string;
  buttonText?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  buttonIcon?: React.ReactNode;
  buttonSize?: number; // Custom button radius (overrides default 0.25 * radius)
  buttonBorderColor?: string;
  buttonBorderWidth?: number;
  disabled?: boolean;
  winningIndex?: number;
  autoSpinTrigger?: string | number | boolean | null;
}
