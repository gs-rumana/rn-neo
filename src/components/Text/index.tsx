import { type ComponentRef, forwardRef, memo, useMemo } from 'react';
import { Text as RNText, type TextStyle, type StyleProp } from 'react-native';

import { useSpacingStyles } from '../../core/hooks/styles/useSpacingStyles';
import { useFontStyles } from '../../core/hooks/styles/useFontStyles';
import { useTextShadowStyles } from '../../core/hooks/styles/useTextShadowStyles';

import type { TextProps } from '../../typings/components';

export type TextRef = ComponentRef<typeof RNText>;

const Text = memo(
  forwardRef<TextRef, TextProps>(
    (
      {
        style,
        children,

        color,
        align,

        fontFamily,
        fontSize,
        fontWeight,

        shadow = false,
        shadowColor,
        shadowSize,

        ...props
      },
      ref
    ) => {
      const spacingStyles = useSpacingStyles(props);

      const fontStyles = useFontStyles({
        fontFamily,
        fontSize,
        fontWeight,
        textColor: color,
      });

      const shadowStyles = useTextShadowStyles({
        shadow,
        shadowColor,
        shadowSize,
      });

      const textStyles: StyleProp<TextStyle> = useMemo(
        () => [
          spacingStyles,
          fontStyles,
          shadowStyles,
          align && {
            textAlign: align,
          },
          style,
        ],
        [align, fontStyles, shadowStyles, spacingStyles, style]
      );

      return (
        <RNText ref={ref} style={textStyles} {...props}>
          {children}
        </RNText>
      );
    }
  )
);

Text.displayName = 'Text';

export default Text;
