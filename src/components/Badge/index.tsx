import { forwardRef, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import Box, { type BoxRef } from '../Box';
import Text from '../Text';

import { useNeo } from '../../core/hooks/useNeo';

import { resolveColorFromBG } from '../../resolvers/colors';

import type { FontSize, Spacing } from '../../typings';
import type { BadgeProps, ComponentSize } from '../../typings/components';

const SIZE_STYLES: Record<
  ComponentSize,
  {
    paddingHorizontal: Spacing;
    paddingVertical: Spacing;
    fontSize: FontSize;
  }
> = {
  sm: {
    paddingHorizontal: 'sm',
    paddingVertical: 'xs',
    fontSize: 'sm',
  },
  md: {
    paddingHorizontal: 'md',
    paddingVertical: 'sm',
    fontSize: 'md',
  },
  lg: {
    paddingHorizontal: 'lg',
    paddingVertical: 'md',
    fontSize: 'lg',
  },
};

const Badge = forwardRef<BoxRef, BadgeProps>(
  (
    {
      children,
      size = 'md',
      style,
      textStyle,

      border,

      backgroundColor = 'primary',
      textColor,
      fontSize,
      fontFamily,
      fontWeight,

      radius = 'full',

      padding,
      paddingHorizontal,
      paddingVertical,

      ...props
    },
    ref
  ) => {
    const { theme } = useNeo();
    const sizeStyles = useMemo(() => SIZE_STYLES[size], [size]);

    return (
      <Box
        ref={ref}
        border={border ?? theme.border}
        radius={radius}
        backgroundColor={backgroundColor}
        padding={padding ?? undefined}
        paddingHorizontal={paddingHorizontal ?? sizeStyles.paddingHorizontal}
        paddingVertical={paddingVertical ?? sizeStyles.paddingVertical}
        style={[styles.container, style]}
        {...props}
      >
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text
            color={
              textColor ?? resolveColorFromBG(backgroundColor, theme.colors)
            }
            fontWeight={fontWeight}
            fontFamily={fontFamily}
            fontSize={fontSize ?? sizeStyles.fontSize}
            style={[textStyle]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
      </Box>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});
