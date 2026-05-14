import { type ComponentRef, forwardRef, memo, useMemo } from 'react';
import { View } from 'react-native';

import { useBackgroundStyles } from '../../core/hooks/styles/useBackgroundStyles';
import { useBorderStyles } from '../../core/hooks/styles/useBorderStyles';
import { useShadowStyles } from '../../core/hooks/styles/useShadowStyles';
import { useSpacingStyles } from '../../core/hooks/styles/useSpacingStyles';

import type { BoxProps } from '../../typings';

export type BoxRef = ComponentRef<typeof View>;

const Box = memo(
  forwardRef<BoxRef, BoxProps>(
    (
      {
        style,

        // Background
        backgroundColor,

        // Border
        border = false,
        borderColor,
        borderSize,
        radius,

        // Shadow
        shadow = false,
        shadowColor,
        shadowSize,

        // Spacing
        padding,
        paddingVertical,
        paddingHorizontal,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,

        margin,
        marginVertical,
        marginHorizontal,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,

        ...props
      },
      ref
    ) => {
      const backgroundStyles = useBackgroundStyles({
        backgroundColor,
      });

      const borderStyles = useBorderStyles({
        border,
        borderColor,
        borderSize,
        radius,
      });

      const shadowStyles = useShadowStyles({
        shadow,
        shadowColor,
        shadowSize,
      });

      const spacingStyles = useSpacingStyles({
        padding,
        paddingVertical,
        paddingHorizontal,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,

        margin,
        marginVertical,
        marginHorizontal,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
      });

      const composedStyle = useMemo(
        () => [
          backgroundStyles,
          borderStyles,
          shadowStyles !== undefined && {
            boxShadow: `${shadowStyles.shadowSize}px ${shadowStyles.shadowSize}px 0 ${shadowStyles.shadowColor}`,
          },
          spacingStyles,
          style,
        ],
        [backgroundStyles, borderStyles, shadowStyles, spacingStyles, style]
      );

      return <View ref={ref} style={composedStyle} {...props} />;
    }
  )
);

Box.displayName = 'Box';

export default Box;
