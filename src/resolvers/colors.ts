import type { BgColors, Colors, ColorTokens } from '../typings';

export function resolveColors(
  value: Colors | string | undefined,
  tokens: ColorTokens
) {
  if (!value) {
    return undefined;
  }

  if (value in tokens) {
    return tokens[value as Colors];
  }

  return value;
}

export function resolveColorFromBG(
  value: BgColors,
  tokens: ColorTokens
): Colors {
  if (!value || value === 'background' || value === 'muted') {
    return 'onBackground';
  }

  if (value in tokens) {
    switch (value) {
      case 'primary':
        return 'onPrimary';
      case 'secondary':
        return 'onSecondary';
      case 'error':
        return 'onError';
      case 'success':
        return 'onSuccess';
      case 'warning':
        return 'onWarning';
      case 'surface':
        return 'onSurface';
      default:
        return value;
    }
  }

  return value;
}
