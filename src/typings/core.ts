import React from 'react';

import type { NeoConfig, NeoTheme } from './theme';

export type NeoContextType = {
  theme: NeoTheme;
  config: NeoConfig;
};

export type NeoProviderProps = {
  theme?: Partial<NeoTheme>;
  config?: Partial<NeoConfig>;
  children: React.ReactNode;
};
