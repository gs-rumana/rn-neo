import type {
  BgColors,
  BorderSize,
  Colors,
  FontSize,
  FontWeight,
  Radius,
  ShadowSize,
  Spacing,
} from '../typings';

export interface BackgroundProps {
  /**
   * Background color of the component.
   *
   * Accepts a theme background color token or any valid color string.
   *
   * @example "primary"
   * @example "#ffffff"
   * @example "rgba(0,0,0,0.5)"
   */
  backgroundColor?: BgColors & string;
}

export interface BorderProps {
  /**
   * Enables or disables the border.
   *
   * When `true`, a border is rendered using the resolved border styles.
   *
   * @default true
   */
  border?: boolean;

  /**
   * Border width of the component.
   *
   * Accepts a theme border size token or a numeric value.
   *
   * @default "medium"
   * @example "thin"
   * @example 1
   */
  borderSize?: BorderSize | number;

  /**
   * Border color of the component.
   *
   * Accepts a theme color token or any valid color string.
   *
   * @example "primary"
   * @example "#000000"
   */
  borderColor?: Colors & string;

  /**
   * Border radius of the component.
   *
   * Accepts a theme radius token or a numeric value.
   *
   * @example "md"
   * @example 12
   */
  radius?: Radius | number;
}

export interface FontProps {
  /**
   * Font family used for text rendering.
   *
   * Must match a registered font family.
   *
   * @example "Inter-Regular"
   * @example "Poppins-SemiBold"
   */
  fontFamily?: string;

  /**
   * Font size of the text.
   *
   * Accepts a theme font size token.
   *
   * @example "md"
   * @example "xl"
   */
  fontSize?: FontSize;

  /**
   * Text color.
   *
   * Accepts a theme color token.
   *
   * @example "textPrimary"
   * @example "danger"
   */
  textColor?: Colors & string;

  /**
   * Font weight of the text.
   *
   * Accepts a predefined font weight token.
   *
   * @example "regular"
   * @example "bold"
   */
  fontWeight?: FontWeight;
}

export interface ShadowProps {
  /**
   * Enables or disables the shadow.
   *
   * When `true`, shadow styles are applied using the resolved shadow values.
   *
   * @default true
   */
  shadow?: boolean;

  /**
   * Shadow intensity or size.
   *
   * Accepts a theme shadow size token or a numeric value.
   *
   * @default "md"
   * @example "sm"
   * @example 4
   */
  shadowSize?: ShadowSize | number;

  /**
   * Shadow color.
   *
   * Accepts a theme color token or any valid color string.
   *
   * @example "black"
   * @example "rgba(0,0,0,0.2)"
   */
  shadowColor?: Colors & string;
}

export interface SpacingProps {
  /**
   * Padding applied to all sides.
   *
   * Accepts a spacing token or numeric value.
   *
   * @example "md"
   * @example 16
   */
  padding?: Spacing | number;

  /**
   * Vertical padding.
   *
   * Applies padding to top and bottom.
   *
   * @example "sm"
   * @example 8
   */
  paddingVertical?: Spacing | number;

  /**
   * Horizontal padding.
   *
   * Applies padding to left and right.
   *
   * @example "lg"
   * @example 24
   */
  paddingHorizontal?: Spacing | number;

  /**
   * Top padding.
   *
   * @example "xs"
   * @example 4
   */
  paddingTop?: Spacing | number;

  /**
   * Bottom padding.
   *
   * @example "xs"
   * @example 4
   */
  paddingBottom?: Spacing | number;

  /**
   * Left padding.
   *
   * @example "sm"
   * @example 8
   */
  paddingLeft?: Spacing | number;

  /**
   * Right padding.
   *
   * @example "sm"
   * @example 8
   */
  paddingRight?: Spacing | number;

  /**
   * Margin applied to all sides.
   *
   * Accepts a spacing token or numeric value.
   *
   * @example "md"
   * @example 16
   */
  margin?: Spacing | number;

  /**
   * Vertical margin.
   *
   * Applies margin to top and bottom.
   *
   * @example "sm"
   * @example 8
   */
  marginVertical?: Spacing | number;

  /**
   * Horizontal margin.
   *
   * Applies margin to left and right.
   *
   * @example "lg"
   * @example 24
   */
  marginHorizontal?: Spacing | number;

  /**
   * Top margin.
   *
   * @example "xs"
   * @example 4
   */
  marginTop?: Spacing | number;

  /**
   * Bottom margin.
   *
   * @example "xs"
   * @example 4
   */
  marginBottom?: Spacing | number;

  /**
   * Left margin.
   *
   * @example "sm"
   * @example 8
   */
  marginLeft?: Spacing | number;

  /**
   * Right margin.
   *
   * @example "sm"
   * @example 8
   */
  marginRight?: Spacing | number;
}
