import { type ComponentRef, forwardRef, memo, useMemo, useState } from 'react';
import {
  Pressable as RNPressable,
  type PressableProps as RNPressableProps,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { useNeo } from '../../core/hooks/useNeo';
import { useBackgroundStyles } from '../../core/hooks/styles/useBackgroundStyles';
import { useBorderStyles } from '../../core/hooks/styles/useBorderStyles';
import { useFontStyles } from '../../core/hooks/styles/useFontStyles';
import { useShadowStyles } from '../../core/hooks/styles/useShadowStyles';
import { useSpacingStyles } from '../../core/hooks/styles/useSpacingStyles';

import type { PressableProps } from '../../typings/components';

const AnimatedPressable = Animated.createAnimatedComponent(RNPressable);

export type PressableRef = ComponentRef<typeof RNPressable>;

const Pressable = memo(
  forwardRef<PressableRef, PressableProps>(
    (
      {
        children,

        style,
        disabled,
        loading,

        onPressIn,
        onPressOut,

        backgroundColor = 'primary',

        border,
        borderColor,
        borderSize,
        radius,

        shadow,
        shadowColor,
        shadowSize,

        padding = 'md',
        paddingBottom,
        paddingHorizontal,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingVertical,

        margin,
        marginBottom,
        marginHorizontal,
        marginLeft,
        marginRight,
        marginTop,
        marginVertical,

        fontFamily,
        fontSize,
        fontWeight,
        textColor,

        accessibilityRole,

        ...props
      },
      ref
    ) => {
      const { theme } = useNeo();

      // const scale = useSharedValue(0);
      const [pressed, setPressed] = useState(false);

      const spacingStyles = useSpacingStyles({
        padding,
        paddingBottom,
        paddingHorizontal,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingVertical,

        margin,
        marginBottom,
        marginHorizontal,
        marginLeft,
        marginRight,
        marginTop,
        marginVertical,
      });

      const backgroundStyles = useBackgroundStyles({
        backgroundColor,
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
        pressed ? 2 : 1
      );

      const fontStyles = useFontStyles({
        fontFamily,
        fontSize,
        fontWeight,
        textColor,
      });

      const animatedStyle = useMemo(() => {
        if (!shadowStyles) {
          return {};
        }
        return {
          transform: [
            {
              translateX: pressed ? shadowStyles.shadowSize / 2 : 0,
            },
            {
              translateY: pressed ? shadowStyles.shadowSize / 2 : 0,
            },
          ],
          boxShadow: `${shadowStyles.shadowSize}px ${shadowStyles.shadowSize}px 0 ${shadowStyles.shadowColor}`,
          transitionProperty: ['boxShadow', 'transform', 'backgroundColor'],
          transitionDuration: theme.animationDuration,
          transitionTimingFunction: 'ease-in-out',
        };
      }, [pressed, shadowStyles, theme.animationDuration]);

      const composedStyles = useMemo(
        () => [
          spacingStyles,
          backgroundStyles,
          borderStyles,
          shadowStyles,
          fontStyles,
          animatedStyle,
          style,
        ],
        [
          animatedStyle,
          backgroundStyles,
          borderStyles,
          fontStyles,
          shadowStyles,
          spacingStyles,
          style,
        ]
      );

      const handlePressIn: RNPressableProps['onPressIn'] = (event) => {
        if (theme.animation && !disabled && !loading) {
          setPressed(true);
        }

        onPressIn?.(event);
      };

      const handlePressOut: RNPressableProps['onPressOut'] = (event) => {
        if (theme.animation && !disabled && !loading) {
          setPressed(false);
        }

        onPressOut?.(event);
      };

      return (
        <AnimatedPressable
          ref={ref}
          disabled={disabled || loading}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={composedStyles}
          accessibilityRole={accessibilityRole ?? 'button'}
          accessibilityState={{
            disabled,
            busy: loading,
          }}
          {...props}
        >
          {children}
        </AnimatedPressable>
      );
    }
  )
);

Pressable.displayName = 'Pressable';

export default Pressable;
