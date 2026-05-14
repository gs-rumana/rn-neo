import type { FontSize, FontSizeTokens } from '../typings';

export function resolveFontSize(
  value: FontSize | number | undefined,
  tokens: FontSizeTokens
) {
  if (typeof value === 'number' || value === undefined) {
    return value;
  }

  return tokens[value];
}
