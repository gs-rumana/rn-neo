import React, { useMemo } from 'react';

import { NeoContext } from './context';

import { DefaultLightTheme, defaultConfig } from '../theme/tokens';

import { type NeoProviderProps } from '../../typings';

export const NeoProvider: React.FC<NeoProviderProps> = ({
  theme,
  config,
  children,
}) => {
  const value = useMemo(() => {
    return {
      theme: {
        ...DefaultLightTheme,
        ...theme,
      },
      config: {
        ...defaultConfig,
        ...config,
      },
    };
  }, [theme, config]);

  return <NeoContext.Provider value={value}>{children}</NeoContext.Provider>;
};
