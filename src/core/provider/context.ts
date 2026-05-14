import { createContext } from 'react';

import { defaultConfig, DefaultLightTheme } from '../theme/tokens';

import { type NeoContextType } from '../../typings';

export const NeoContext = createContext<NeoContextType>({
  theme: DefaultLightTheme,
  config: defaultConfig,
});
