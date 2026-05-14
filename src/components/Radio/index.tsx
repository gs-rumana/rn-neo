import { memo, useMemo } from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { useNeo } from '../../core/hooks/useNeo';
import { useSpacingStyles } from '../../core/hooks/styles/useSpacingStyles';
import { useBorderStyles } from '../../core/hooks/styles/useBorderStyles';
import { useShadowStyles } from '../../core/hooks/styles/useShadowStyles';

import { resolveColors } from '../../resolvers/colors';

import type { Spacing } from '../../typings';
import type { ComponentSize, RadioProps } from '../../typings/components';

const SIZE_MAP: Record<ComponentSize, { size: number; padding: Spacing }> = {
  sm: {
    size: 18,
    padding: 'sm',
  },
  md: {
    size: 22,
    padding: 'md',
  },
  lg: {
    size: 28,
    padding: 'md',
  },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Radio = memo(function Radio({
  selected,
  onChange,
  disabled,

  size = 'md',

  backgroundColor,
  innerColor,

  border,
  borderColor,
  borderSize,
  radius,

  shadow,
  shadowColor,
  shadowSize,

  style,

  ...spacingProps
}: RadioProps & { style?: ViewStyle }) {
  const { theme } = useNeo();

  const spacingStyles = useSpacingStyles({
    padding: spacingProps.padding ?? SIZE_MAP[size].padding,
    ...spacingProps,
  });

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
    selected ? 2 : 1
  );

  const containerSize = SIZE_MAP[size].size;
  const innerSize = containerSize - (spacingStyles.padding ?? 0) * 2;
  const innerRadius =
    ((typeof borderStyles.borderRadius === 'number'
      ? borderStyles.borderRadius
      : 0) /
      containerSize) *
    innerSize;

  const resolvedBackgroundColor = useMemo(() => {
    const color = selected
      ? (backgroundColor?.true ?? 'primary')
      : (backgroundColor?.false ?? 'surface');

    return resolveColors(color, theme.colors);
  }, [backgroundColor, selected, theme.colors]);

  const resolvedInnerColor = useMemo(() => {
    const color = selected
      ? (innerColor?.true ?? 'onPrimary')
      : (innerColor?.false ?? 'transparent');

    return resolveColors(color, theme.colors);
  }, [innerColor, selected, theme.colors]);

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      width: containerSize,
      height: containerSize,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: resolvedBackgroundColor,
      opacity: disabled ? 0.5 : 1,
      ...(theme.animation && {
        transitionProperty: ['opacity', 'backgroundColor', 'boxShadow'],
        transitionDuration: theme.animationDuration,
        transitionTimingFunction: 'ease-in-out',
      }),
    }),
    [containerSize, resolvedBackgroundColor, disabled, theme]
  );

  const innerStyle = useMemo<ViewStyle>(
    () => ({
      width: innerSize,
      height: innerSize,
      borderRadius: innerRadius,
      backgroundColor: resolvedInnerColor,
      transform: [{ scale: selected ? 1 : 0 }],
    }),
    [innerSize, resolvedInnerColor, innerRadius, selected]
  );

  const composedStyle = useMemo(
    () => [
      styles.container,
      containerStyle,
      spacingStyles,
      borderStyles,
      shadowStyles
        ? {
            boxShadow: `${shadowStyles.shadowSize}px ${shadowStyles.shadowSize}px 0 ${shadowStyles.shadowColor}`,
          }
        : undefined,
      style,
    ],
    [borderStyles, containerStyle, shadowStyles, spacingStyles, style]
  );

  return (
    <AnimatedPressable
      disabled={disabled}
      onPress={() => onChange(!selected)}
      style={composedStyle}
      accessibilityRole="radio"
      accessibilityState={{
        disabled,
        selected,
      }}
    >
      <View style={innerStyle} />
    </AnimatedPressable>
  );
});

Radio.displayName = 'Radio';

export default Radio;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
