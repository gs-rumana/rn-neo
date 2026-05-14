import { useMemo } from 'react';

import { useNeo } from '../../hooks/useNeo';

import { resolveColors } from '../../../resolvers/colors';
import { resolveShadowSize } from '../../../resolvers/shadow';

import { type ShadowProps } from '../../../typings';

export function useShadowStyles(props: ShadowProps, divisor: number = 1) {
  const { theme, config } = useNeo();

  return useMemo(() => {
    const shadowEnabled = props.shadow ?? theme.shadow;

    if (!shadowEnabled) {
      return undefined;
    }

    const shadowSize = resolveShadowSize(
      props.shadowSize ?? theme.shadowSize,
      config.shadowSize
    );

    if (!shadowSize) {
      return undefined;
    }

    const shadowColor = resolveColors(
      props.shadowColor ?? 'shadow',
      theme.colors
    );

    return {
      shadowSize: shadowSize / divisor,
      shadowColor,
    };
  }, [
    props.shadow,
    props.shadowSize,
    props.shadowColor,

    theme.shadow,
    theme.shadowSize,
    theme.colors,

    config.shadowSize,

    divisor,
  ]);
}
