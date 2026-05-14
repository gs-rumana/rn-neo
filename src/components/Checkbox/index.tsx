import { memo, useMemo, useState } from 'react';
import { Pressable, Text } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
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

  const indicatorStyle = useMemo<TextStyle>(
    () => ({
      fontFamily: 'NeoIcons',
      fontSize: containerSize * 0.7,
      color: resolvedCheckColor,
    }),
    [containerSize, resolvedCheckColor]
  );

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
      {checked ? <Text style={indicatorStyle}>{'\uf000'}</Text> : null}
    </AnimatedPressable>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
