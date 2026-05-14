import { useMemo } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';

import { useSpacingStyles } from './useSpacingStyles';
import { useBorderStyles } from './useBorderStyles';
import { useShadowStyles } from './useShadowStyles';
import { useFontStyles } from './useFontStyles';
import { useBackgroundStyles } from './useBackgroundStyles';

import type {
  BackgroundProps,
  BorderProps,
  FontProps,
  ShadowProps,
  SpacingProps,
} from '../../../typings';

type NeoStylesProps = BackgroundProps &
  BorderProps &
  ShadowProps &
  SpacingProps &
  Partial<FontProps>;

export function useNeoStyles(props: NeoStylesProps): ViewStyle & TextStyle {
  const spacingStyles = useSpacingStyles(props);

  const backgroundStyles = useBackgroundStyles(props);

  const borderStyles = useBorderStyles(props);

  const shadowStyles = useShadowStyles(props);

  const fontStyles = useFontStyles(props);

  return useMemo(() => {
    return {
      ...spacingStyles,
      ...backgroundStyles,
      ...borderStyles,
      ...shadowStyles,
      ...fontStyles,
    };
  }, [spacingStyles, backgroundStyles, borderStyles, shadowStyles, fontStyles]);
}
