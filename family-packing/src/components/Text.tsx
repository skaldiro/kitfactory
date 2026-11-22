import { Text as RNText, type TextProps } from 'react-native';

import { color, type ColorName, type, type TypographyName } from '@/theme';

type Props = TextProps & {
  variant?: TypographyName;
  tone?: ColorName;
};

/** All app text. Variant and tone come from the tokens; there is no free font or color prop. */
export function Text({ variant = 'body', tone = 'ink', style, ...rest }: Props) {
  return <RNText {...rest} style={[type[variant], { color: color[tone] }, style]} />;
}
