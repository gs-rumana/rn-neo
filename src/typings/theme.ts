export type Colors =
  | 'primary'
  | 'onPrimary'
  | 'secondary'
  | 'onSecondary'
  | 'error'
  | 'onError'
  | 'success'
  | 'onSuccess'
  | 'warning'
  | 'onWarning'
  | 'background'
  | 'onBackground'
  | 'surface'
  | 'onSurface'
  | 'border'
  | 'shadow'
  | 'muted';
export type ColorTokens = Record<Colors, string>;

export type BgColors =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'success'
  | 'warning'
  | 'background'
  | 'surface'
  | 'muted';

export type ShadowSize = 'sm' | 'md' | 'lg';
export type ShadowSizeTokens = Record<ShadowSize, number>;
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type RadiusTokens = Record<Radius, number>;
export type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type SpacingTokens = Record<Spacing, number>;
export type BorderSize = 'none' | 'thin' | 'medium' | 'thick';
export type BorderSizeTokens = Record<BorderSize, number>;
export type FontSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type FontSizeTokens = Record<FontSize, number>;
export type FontWeight = 'normal' | 'medium' | 'bold';

export type NeoTheme = {
  animation?: boolean;
  animationDuration?: number;
  border?: boolean;
  borderSize: BorderSize;
  radius: Radius;
  dark: boolean;
  colors: ColorTokens;
  shadow?: boolean;
  shadowSize: ShadowSize;
};

export type NeoConfig = {
  radius: RadiusTokens;
  borderSize: BorderSizeTokens;
  shadowSize: ShadowSizeTokens;
  spacing: SpacingTokens;
  fontSize: FontSizeTokens;
  fonts: Record<FontWeight, string>;
};
