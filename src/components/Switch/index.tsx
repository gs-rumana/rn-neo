import { memo, useMemo } from 'react';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { useNeo } from '../../core/hooks/useNeo';
import { useSpacingStyles } from '../../core/hooks/styles/useSpacingStyles';
import { useBorderStyles } from '../../core/hooks/styles/useBorderStyles';
import { useShadowStyles } from '../../core/hooks/styles/useShadowStyles';
import { useBackgroundStyles } from '../../core/hooks/styles/useBackgroundStyles';

import type { SwitchProps } from '../../typings/components';

const SIZE_MAP = {
  sm: {
    width: 36,
    height: 20,
  },
  md: {
    width: 48,
    height: 28,
  },
  lg: {
    width: 60,
    height: 34,
  },
} as const;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Switch = memo(function Switch({
  value,
  onChange,
  disabled,
  size = 'md',
  style,

  backgroundColor,
  thumbColor,

  border,
  borderColor,
  borderSize,
  radius,

  shadow,
  shadowColor,
  shadowSize,

  ...spacingProps
}: SwitchProps) {
  const { theme } = useNeo();

  const dimensions = SIZE_MAP[size];

  const borderStyles = useBorderStyles({
    border,
    borderColor,
    borderSize,
    radius: radius,
  });

  const shadowStyles = useShadowStyles(
    {
      shadow,
      shadowColor,
      shadowSize,
    },
    value ? 2 : 1
  );

  const backgroundStyles = useBackgroundStyles({
    backgroundColor:
      backgroundColor?.[String(value) as 'true' | 'false'] ??
      (value ? 'primary' : 'muted'),
  });

  const thumbBackground = useMemo(() => {
    const color =
      thumbColor?.[String(value) as 'true' | 'false'] ?? 'onPrimary';

    if (color in theme.colors) {
      return theme.colors[color as keyof typeof theme.colors];
    }

    return color;
  }, [thumbColor, theme, value]);

  const resolvedBorderSize =
    typeof borderStyles.borderWidth === 'number' ? borderStyles.borderWidth : 0;

  const thumbSize = dimensions.height * 0.6;
  const padding =
    (dimensions.height - thumbSize - resolvedBorderSize * 2) * 0.5;
  const maxTranslateX =
    dimensions.width - resolvedBorderSize * 2 - padding * 2 - thumbSize;
  const translateX = value ? maxTranslateX : 0;

  const containerRadius =
    typeof borderStyles.borderRadius === 'number'
      ? borderStyles.borderRadius
      : 0;
  const thumbRadius = Math.max(0, containerRadius - padding);

  const spacingStyles = useSpacingStyles({
    padding,
    ...spacingProps,
  });

  const containerStyles = useMemo<ViewStyle>(
    () => ({
      width: dimensions.width,
      height: dimensions.height,
      opacity: disabled ? 0.5 : 1,
      justifyContent: 'center',
      ...(theme.animation && {
        transitionProperty: ['opacity', 'backgroundColor', 'boxShadow'],
        transitionDuration: theme.animationDuration,
        transitionTimingFunction: 'ease-in-out',
      }),
    }),
    [dimensions, disabled, theme]
  );

  const thumbStyles = useMemo<ViewStyle>(
    () => ({
      width: thumbSize,
      height: thumbSize,
      borderRadius: thumbRadius,
      backgroundColor: thumbBackground,
      transform: [{ translateX }],
      ...(theme.animation && {
        transitionProperty: ['transform', 'backgroundColor'],
        transitionDuration: theme.animationDuration,
        transitionTimingFunction: 'ease-in-out',
      }),
    }),
    [thumbSize, thumbRadius, thumbBackground, translateX, theme]
  );

  return (
    <AnimatedPressable
      disabled={disabled}
      onPress={() => onChange(!value)}
      accessibilityRole="switch"
      accessibilityState={{
        checked: value,
        disabled,
      }}
      style={[
        styles.container,
        containerStyles,
        spacingStyles,
        borderStyles,
        shadowStyles
          ? {
              boxShadow: `${shadowStyles.shadowSize}px ${shadowStyles.shadowSize}px 0 ${shadowStyles.shadowColor}`,
            }
          : undefined,
        backgroundStyles,
        style,
      ]}
    >
      <Animated.View style={[styles.thumb, thumbStyles]} />
    </AnimatedPressable>
  );
});

Switch.displayName = 'Switch';

export default Switch;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  thumb: {},
});
