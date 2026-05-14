import type { Spacing, SpacingTokens } from '../typings';

export function resolveSpacing(
  value: Spacing | number | undefined,
  tokens: SpacingTokens
) {
  if (typeof value === 'number' || value === undefined) {
    return value;
  }

  return tokens[value];
}
