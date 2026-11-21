import { Pressable, StyleSheet, Text as RNText } from 'react-native';

import { archivo, color, components, padding, spacing, textStyle, type } from '@/theme';

export type ButtonVariant = 'scout' | 'primary' | 'secondary' | 'danger' | 'onDark' | 'ghostOnDark';

const tokenFor = {
  scout: components['button-scout'],
  primary: components['button-primary'],
  secondary: components['button-secondary'],
  danger: components['button-danger'],
  onDark: components['button-on-dark'],
  ghostOnDark: components['button-ghost-on-dark'],
} as const;

type Props = {
  label: string;
  onPress?: () => void;
  /**
   * Decision 29: `scout` (orange) only when the button hands work to Scout or
   * applies what Scout proposed, and at most one per screen. Every other main
   * button is `primary` on light screens and `onDark` on dark screens.
   */
  variant?: ButtonVariant;
  size?: 'regular' | 'small';
  disabled?: boolean;
};

export function Button({ label, onPress, variant = 'primary', size = 'regular', disabled }: Props) {
  const token = tokenFor[variant] as {
    backgroundColor?: string;
    textColor: string;
    borderColor?: string;
    borderWidth?: number;
    rounded: number;
    height: number;
    typography: Parameters<typeof textStyle>[0];
  };
  const horizontal = padding(components['button-primary'].padding).paddingLeft;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: token.backgroundColor ?? 'transparent',
          borderColor: token.borderColor,
          borderWidth: token.borderWidth ?? 0,
          borderRadius: token.rounded,
          height: size === 'small' ? spacing.touch : token.height,
          paddingHorizontal: size === 'small' ? spacing['4'] : horizontal,
          opacity: pressed || disabled ? 0.85 : 1,
        },
      ]}
    >
      <RNText style={[textStyle(token.typography), { color: token.textColor }]}>{label}</RNText>
    </Pressable>
  );
}

/** Underlined text link, 14/600 (DESIGN.md, Button). Ink on light, mist on dark; never orange. */
export function TextLink({ label, onPress, tone = 'ink' }: { label: string; onPress?: () => void; tone?: 'ink' | 'mist' }) {
  return (
    <Pressable accessibilityRole="link" onPress={onPress} hitSlop={spacing['3']} style={styles.link}>
      <RNText style={[type.small, styles.linkText, { color: color[tone] }]}>{label}</RNText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start' },
  link: { minHeight: spacing.touch, justifyContent: 'center' },
  linkText: {
    fontFamily: archivo('600'),
    textDecorationLine: 'underline',
  },
});
