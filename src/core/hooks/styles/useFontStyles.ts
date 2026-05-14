import { useMemo } from 'react';
import type { TextStyle } from 'react-native';

import { useNeo } from '../../hooks/useNeo';

import { resolveColors } from '../../../resolvers/colors';
import { resolveFontSize } from '../../../resolvers/text';

import type { FontProps } from '../../../typings';

export function useFontStyles(props: FontProps): TextStyle {
  const { theme, config } = useNeo();

  return useMemo(() => {
    return {
      fontFamily:
        props.fontFamily ?? config.fonts[props.fontWeight ?? 'normal'],

      fontSize: resolveFontSize(props.fontSize, config.fontSize),

      color: resolveColors(props.textColor ?? 'onBackground', theme.colors),
    };
  }, [
    props.fontFamily,
    props.fontSize,
    props.fontWeight,
    props.textColor,

    config.fonts,
    config.fontSize,

    theme.colors,
  ]);
}
