import {BoxProps} from 'design-system';

export interface headerProps {
  hasBackButton?: boolean;
  hasRightIcon?: React.ReactElement;
  onPressRightIcon?: () => void;
  onPressLeftIcon?: () => void;
  containerProps?: BoxProps;
  hasHeaderText?: string;
  hasSubHeaderText?: string;
  width?: number;
  textVariant?: 'bodySmall' | 'smallBold';
  darkColor?: boolean;
}
