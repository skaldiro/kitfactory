import { Pressable, StyleSheet, Text as RNText } from 'react-native';

import { color, components, padding, spacing, textStyle } from '@/theme';

type Props = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

/** One chip style: 40 tall, edge outline, ink when selected (DESIGN.md, Chip). */
export function Chip({ label, selected = false, onPress }: Props) {
  const chip = components.chip;
  const on = components['chip-selected'];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      hitSlop={(spacing.touch - chip.height) / 2}
      style={[
        styles.base,
        padding(chip.padding),
        {
          height: chip.height,
          borderRadius: chip.rounded,
          borderWidth: chip.borderWidth,
          borderColor: selected ? on.backgroundColor : chip.borderColor,
          backgroundColor: selected ? on.backgroundColor : chip.backgroundColor,
        },
      ]}
    >
      <RNText style={[textStyle(chip.typography), { color: selected ? color.mist : chip.textColor }]}>
        {label}
      </RNText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { justifyContent: 'center', alignSelf: 'flex-start' },
});
