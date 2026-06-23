import {
  type ViewStyle,
  type TextStyle,
  type TextInputProps,
  type ViewProps,
  type TextProps as RNTextProps,
  type PressableProps as RNPressableProps,
  type StyleProp,
  type ModalProps,
} from 'react-native';
import type { ReactNode } from 'react';

import type { Colors, BgColors } from './theme';
import type {
  BackgroundProps,
  BorderProps,
  FontProps,
  ShadowProps,
  SpacingProps,
} from './props';

export type ComponentSize = 'sm' | 'md' | 'lg';

interface ToggleComponentProps extends BorderProps, ShadowProps, SpacingProps {
  backgroundColor?: Record<'true' | 'false', BgColors & string>;
}

export interface BadgeProps extends BoxProps, FontProps {
  textStyle?: TextStyle;
  size?: ComponentSize;
}

export interface BoxProps
  extends ViewProps, BackgroundProps, BorderProps, ShadowProps, SpacingProps {}

export interface CardProps extends BoxProps {}

export interface DialogProps extends BoxProps {
  /**
   * Controls visibility of the dialog.
   */
  visible: boolean;

  /**
   * Called when the dialog requests to close — backdrop press (when
   * `dismissable`) or the hardware back button on Android.
   */
  onClose: () => void;

  /**
   * Optional heading rendered at the top of the dialog.
   */
  title?: string;

  /**
   * Color of the title text.
   *
   * @default "onSurface"
   */
  titleColor?: Colors & string;

  /**
   * Content rendered below the title (e.g. action buttons).
   */
  footer?: ReactNode;

  /**
   * When `true`, pressing the backdrop closes the dialog.
   *
   * @default true
   */
  dismissable?: boolean;

  /**
   * Backdrop overlay color.
   *
   * @default "rgba(0,0,0,0.5)"
   */
  backdropColor?: string;

  /**
   * Transition used when the dialog mounts/unmounts.
   *
   * @default "fade"
   */
  animationType?: ModalProps['animationType'];

  /**
   * Style applied to the centering container that wraps the panel.
   */
  containerStyle?: StyleProp<ViewStyle>;
}

export interface CheckboxProps extends ToggleComponentProps {
  checkColor?: Record<'true' | 'false', Colors & string>;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: ComponentSize;
}

export interface RadioProps extends ToggleComponentProps {
  innerColor?: Record<'true' | 'false', Colors & string>;
  selected: boolean;
  onChange: (selected: boolean) => void;
  disabled?: boolean;
  size?: ComponentSize;
}

export interface InputProps
  extends
    TextInputProps,
    BackgroundProps,
    BorderProps,
    FontProps,
    ShadowProps,
    SpacingProps {}

export interface PressableProps
  extends
    RNPressableProps,
    BackgroundProps,
    BorderProps,
    FontProps,
    ShadowProps,
    SpacingProps {
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface SwitchProps extends ToggleComponentProps {
  thumbColor?: Record<'true' | 'false', Colors & string>;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
  size?: ComponentSize;
}

export interface TextProps
  extends RNTextProps, Omit<FontProps, 'textColor'>, ShadowProps, SpacingProps {
  color?: Colors & string;
  align?: TextStyle['textAlign'];
}
