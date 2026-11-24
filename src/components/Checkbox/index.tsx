import { memo, useMemo, useState } from 'react';
import { PixelRatio, Pressable, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { useNeo } from '../../core/hooks/useNeo';
import { useSpacingStyles } from '../../core/hooks/styles/useSpacingStyles';
import { useBorderStyles } from '../../core/hooks/styles/useBorderStyles';
import { useShadowStyles } from '../../core/hooks/styles/useShadowStyles';

import { resolveColors } from '../../resolvers/colors';

import type { ComponentSize, CheckboxProps } from '../../typings/components';

const SIZE_MAP: Record<ComponentSize, number> = {
  sm: 18,
  md: 22,
  lg: 28,
};

/**
 * The tick is the right and bottom borders of a box turned 45°, so no icon font has to be linked.
 * Lengths are fractions of `size * 0.7` and match the NeoIcons glyph that Checkbox used to render.
 */
const TICK = { short: 0.3758, long: 0.6243, stroke: 0.0836 };

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Checkbox = memo(function Checkbox({
  checked,
  onChange,
  disabled,

  size = 'md',

  backgroundColor,
  checkColor,

  border,
  borderColor,
  borderSize,
  radius,

  shadow,
  shadowColor,
  shadowSize,

  style,

  ...spacingProps
}: CheckboxProps & { style?: ViewStyle }) {
  const { theme } = useNeo();

  const [pressed, setPressed] = useState(false);

  const spacingStyles = useSpacingStyles({
    padding: 0,
    ...spacingProps,
  });

  const borderStyles = useBorderStyles({
    border,
    borderColor,
    borderSize,
    radius,
  });

  const shadowStyles = useShadowStyles(
    {
      shadow,
      shadowColor,
      shadowSize,
    },
    checked || pressed ? 2 : 1
  );

  const containerSize = SIZE_MAP[size];

  const resolvedBackgroundColor = useMemo(() => {
    const color = checked
      ? (backgroundColor?.true ?? 'primary')
      : (backgroundColor?.false ?? 'surface');

    return resolveColors(color, theme.colors);
  }, [backgroundColor, checked, theme.colors]);

  const resolvedCheckColor = useMemo(() => {
    const color = checked
      ? (checkColor?.true ?? 'onPrimary')
      : (checkColor?.false ?? 'transparent');

    return resolveColors(color, theme.colors);
  }, [checkColor, checked, theme.colors]);

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      width: containerSize,
      height: containerSize,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: resolvedBackgroundColor,
      opacity: disabled ? 0.5 : 1,

      ...(shadowStyles
        ? {
            transform: [
              {
                translateX: pressed ? shadowStyles?.shadowSize : 0,
              },
              {
                translateY: pressed ? shadowStyles?.shadowSize : 0,
              },
            ],
          }
        : {}),

      ...(theme.animation && {
        transitionProperty: [
          'opacity',
          'backgroundColor',
          'boxShadow',
          'transform',
        ],
        transitionDuration: theme.animationDuration,
        transitionTimingFunction: 'ease-in-out',
      }),
    }),
    [
      containerSize,
      resolvedBackgroundColor,
      disabled,
      theme,
      pressed,
      shadowStyles,
    ]
  );

  const tickStyle = useMemo<ViewStyle>(() => {
    const unit = containerSize * 0.7;
    const short = unit * TICK.short;
    // Browsers floor a border to whole device pixels, which would thin the tick by up to a third.
    const stroke = PixelRatio.roundToNearestPixel(unit * TICK.stroke);

    return {
      width: short,
      height: unit * TICK.long,
      borderRightWidth: stroke,
      borderBottomWidth: stroke,
      borderColor: resolvedCheckColor,
      // Turning the box about its centre leaves the visible tick low by this much.
      transform: [
        { translateY: (-(short - stroke) / 2) * Math.SQRT1_2 },
        { rotate: '45deg' },
      ],
    };
  }, [containerSize, resolvedCheckColor]);

  return (
    <AnimatedPressable
      disabled={disabled}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => onChange(!checked)}
      style={[
        containerStyle,
        spacingStyles,
        borderStyles,
        shadowStyles
          ? {
              boxShadow: `${shadowStyles.shadowSize}px ${shadowStyles.shadowSize}px 0 ${shadowStyles.shadowColor}`,
            }
          : undefined,
        style,
      ]}
      accessibilityRole="checkbox"
      accessibilityState={{
        checked,
        disabled,
      }}
    >
      {checked ? <View style={tickStyle} /> : null}
    </AnimatedPressable>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
