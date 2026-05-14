import { useMemo } from 'react';
import type { TextStyle } from 'react-native';

import { useNeo } from '../../hooks/useNeo';

import { resolveShadowSize } from '../../../resolvers/shadow';
import { resolveColors } from '../../../resolvers/colors';

import { type ShadowProps } from '../../../typings';

export function useTextShadowStyles(props: ShadowProps): TextStyle {
  const { theme, config } = useNeo();

  return useMemo(() => {
    const shadowEnabled = props.shadow ?? theme.shadow;

    if (!shadowEnabled) {
      return {};
    }

    const shadowSize = resolveShadowSize(
      props.shadowSize ?? theme.shadowSize,
      config.shadowSize
    );

    const shadowColor = resolveColors(
      props.shadowColor ?? 'shadow',
      theme.colors
    );

    if (!shadowSize) {
      return {};
    }

    return {
      textShadowOffset: {
        height: shadowSize,
        width: shadowSize,
      },
      textShadowColor: shadowColor,
      textShadowRadius: 0,
    };
  }, [
    props.shadow,
    props.shadowSize,
    props.shadowColor,

    theme.shadow,
    theme.shadowSize,
    theme.colors,

    config.shadowSize,
  ]);
}
