import type { ShadowSize, ShadowSizeTokens } from '../typings';

export function resolveShadowSize(
  value: ShadowSize | number | undefined,
  tokens: ShadowSizeTokens
) {
  if (typeof value === 'number' || value === undefined) {
    return value;
  }

  return tokens[value];
}
