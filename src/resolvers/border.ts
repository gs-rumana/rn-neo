import type {
  BorderSize,
  BorderSizeTokens,
  Radius,
  RadiusTokens,
} from '../typings';

export function resolveBorderSize(
  value: BorderSize | number | undefined,
  tokens: BorderSizeTokens
) {
  if (typeof value === 'number' || value === undefined) {
    return value;
  }

  return tokens[value];
}

export function resolveRadius(
  value: Radius | number | undefined,
  tokens: RadiusTokens
) {
  if (typeof value === 'number' || value === undefined) {
    return value;
  }

  return tokens[value];
}
