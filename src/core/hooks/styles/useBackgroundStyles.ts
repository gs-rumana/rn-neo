import { useMemo } from 'react';
import type { ViewStyle } from 'react-native';

import { useNeo } from '../../hooks/useNeo';

import { resolveColors } from '../../../resolvers/colors';

import type { BackgroundProps } from '../../../typings';

type UseBackgroundStylesProps = BackgroundProps & {
  state?: boolean;
};

export function useBackgroundStyles(
  props: UseBackgroundStylesProps
): ViewStyle {
  const { theme } = useNeo();

  return useMemo(() => {
    let backgroundColor = props.backgroundColor;

    if (typeof backgroundColor === 'object' && backgroundColor !== null) {
      backgroundColor = backgroundColor[props.state ? 'true' : 'false'];
    }

    return {
      backgroundColor: resolveColors(backgroundColor, theme.colors),
    };
  }, [props.backgroundColor, props.state, theme.colors]);
}
