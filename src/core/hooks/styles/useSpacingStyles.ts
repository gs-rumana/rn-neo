import { useMemo } from 'react';

import { useNeo } from '../../hooks/useNeo';

import { resolveSpacing } from '../../../resolvers/spacing';

import type { SpacingProps } from '../../../typings/props';

export function useSpacingStyles(props: SpacingProps) {
  const { config } = useNeo();

  return useMemo(() => {
    return {
      padding: resolveSpacing(props.padding, config.spacing),
      paddingVertical: resolveSpacing(props.paddingVertical, config.spacing),
      paddingHorizontal: resolveSpacing(
        props.paddingHorizontal,
        config.spacing
      ),
      paddingTop: resolveSpacing(props.paddingTop, config.spacing),
      paddingBottom: resolveSpacing(props.paddingBottom, config.spacing),
      paddingLeft: resolveSpacing(props.paddingLeft, config.spacing),
      paddingRight: resolveSpacing(props.paddingRight, config.spacing),
      margin: resolveSpacing(props.margin, config.spacing),
      marginVertical: resolveSpacing(props.marginVertical, config.spacing),
      marginHorizontal: resolveSpacing(props.marginHorizontal, config.spacing),
      marginTop: resolveSpacing(props.marginTop, config.spacing),
      marginBottom: resolveSpacing(props.marginBottom, config.spacing),
      marginLeft: resolveSpacing(props.marginLeft, config.spacing),
      marginRight: resolveSpacing(props.marginRight, config.spacing),
    };
  }, [props, config.spacing]);
}
