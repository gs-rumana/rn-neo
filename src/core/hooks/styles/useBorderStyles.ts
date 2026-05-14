import { useMemo } from 'react';
import type { ViewStyle } from 'react-native';

import { useNeo } from '../../hooks/useNeo';

import { resolveBorderSize, resolveRadius } from '../../../resolvers/border';
import { resolveColors } from '../../../resolvers/colors';

import { type BorderProps } from '../../../typings';

export function useBorderStyles(props: BorderProps): ViewStyle {
  const { theme, config } = useNeo();

  return useMemo(() => {
    const borderEnabled = props.border ?? theme.border;

    if (!borderEnabled) {
      return {
        borderRadius: resolveRadius(
          props.radius ?? theme.radius,
          config.radius
        ),
      };
    }

    return {
      borderWidth: resolveBorderSize(
        props.borderSize ?? theme.borderSize,
        config.borderSize
      ),
      borderRadius: resolveRadius(props.radius ?? theme.radius, config.radius),
      borderColor: resolveColors(props.borderColor ?? 'border', theme.colors),
    };
  }, [
    props.border,
    props.borderSize,
    props.borderColor,
    props.radius,

    theme.border,
    theme.borderSize,
    theme.radius,
    theme.colors,

    config.borderSize,
    config.radius,
  ]);
}
