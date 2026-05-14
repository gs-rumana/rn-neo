import { type ComponentRef, forwardRef, memo, useMemo, useState } from 'react';
import { TextInput, type FocusEvent } from 'react-native';
import Animated, { type AnimatedStyle } from 'react-native-reanimated';

import { useNeo } from '../../core/hooks/useNeo';
import { useBackgroundStyles } from '../../core/hooks/styles/useBackgroundStyles';
import { useBorderStyles } from '../../core/hooks/styles/useBorderStyles';
import { useFontStyles } from '../../core/hooks/styles/useFontStyles';
import { useShadowStyles } from '../../core/hooks/styles/useShadowStyles';
import { useSpacingStyles } from '../../core/hooks/styles/useSpacingStyles';

import { resolveColors } from '../../resolvers/colors';

import type { InputProps } from '../../typings/components';

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

export type InputRef = ComponentRef<typeof AnimatedInput>;

const Input = memo(
  forwardRef<InputRef, InputProps>(
    (
      {
        style,

        backgroundColor,

        border,
        borderColor,
        borderSize,
        radius,

        fontFamily,
        fontSize,
        fontWeight,
        textColor,

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

        placeholderTextColor,
        selectionColor,

        onFocus,
        onBlur,

        ...props
      },
      ref
    ) => {
      const { theme } = useNeo();

      const [focused, setFocused] = useState(false);

      const backgroundStyles = useBackgroundStyles({
        backgroundColor,
      });

      const borderStyles = useBorderStyles({
        border,
        borderColor,
        borderSize,
        radius,
      });

      const fontStyles = useFontStyles({
        fontFamily,
        fontSize,
        fontWeight,
        textColor,
      });

      const shadowStyles = useShadowStyles(
        {
          shadow,
          shadowColor,
          shadowSize,
        },
        focused ? 2 : 1
      );

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

      const inputStyles = useMemo<AnimatedStyle<InputProps['style']>>(
        () => ({
          ...backgroundStyles,
          ...borderStyles,
          ...fontStyles,
          ...(shadowStyles && {
            boxShadow: `${shadowStyles.shadowSize}px ${shadowStyles.shadowSize}px 0 ${shadowStyles.shadowColor}`,
            transitionProperty: 'boxShadow',
            transitionTimingFunction: 'ease-in-out',
            transitionDuration: theme.animationDuration,
          }),
          ...spacingStyles,
        }),
        [
          backgroundStyles,
          borderStyles,
          fontStyles,
          shadowStyles,
          spacingStyles,
          theme.animationDuration,
        ]
      );

      const defaultPlaceholderColor = useMemo(
        () => resolveColors('muted', theme.colors),
        [theme.colors]
      );
      const defaultSelectionColor = useMemo(
        () => resolveColors('primary', theme.colors),
        [theme.colors]
      );

      const handleFocus = (e: FocusEvent) => {
        setFocused(true);
        onFocus && onFocus(e);
      };
      const handleBlur = (e: FocusEvent) => {
        setFocused(false);
        onBlur && onBlur(e);
      };

      return (
        <AnimatedInput
          ref={ref}
          style={[inputStyles, style]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={placeholderTextColor ?? defaultPlaceholderColor}
          selectionColor={selectionColor ?? defaultSelectionColor}
          {...props}
        />
      );
    }
  )
);

Input.displayName = 'Input';

export default Input;
