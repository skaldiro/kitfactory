import { Briefcase } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { color, components, type CrewName, iconSize, padding, radius, spacing } from '@/theme';

import { PackCheck, type PackState } from './Crew';
import { ICON_STROKE } from './IconButton';
import { Text } from './Text';

export type ShoppingState = 'have' | 'to-buy' | 'bought';

/** To buy is outlined ink; Bought sits on mist. Never orange. */
export function Tag({ kind }: { kind: 'to-buy' | 'bought' }) {
  const token = kind === 'to-buy' ? components['tag-to-buy'] : components['tag-bought'];
  return (
    <View
      style={[
        styles.tag,
        {
          height: token.height,
          borderRadius: token.rounded,
          backgroundColor: 'backgroundColor' in token ? token.backgroundColor : 'transparent',
          borderWidth: 'borderWidth' in token ? token.borderWidth : 0,
          borderColor: 'borderColor' in token ? token.borderColor : 'transparent',
        },
      ]}
    >
      <Text variant="label" style={[styles.tagText, { color: token.textColor }]}>
        {kind === 'to-buy' ? 'To buy' : 'Bought'}
      </Text>
    </View>
  );
}

type Props = {
  name: string;
  crew: CrewName | 'shared';
  need: number;
  packed: number;
  shopping?: ShoppingState;
  bag?: string;
  highlighted?: boolean;
  onToggle?: () => void;
  onPress?: () => void;
};

/** Progress counts item lines: a row is done when packed is at least need. */
export function packState(packed: number, need: number): PackState {
  if (packed >= need) return 'done';
  return packed > 0 ? 'partial' : 'empty';
}

export function quantityLabel(packed: number, need: number): string {
  if (packed > 0 && packed < need) return `${packed} of ${need}`;
  return `×${need}`;
}

/** Check, name, optional tag, optional bag, quantity. Done rows are struck through in muted. */
export function ItemRow({ name, crew, need, packed, shopping = 'have', bag, highlighted, onToggle, onPress }: Props) {
  const token = components['item-row'];
  const state = packState(packed, need);
  const done = state === 'done';
  return (
    <View
      style={[
        styles.row,
        padding(token.padding),
        {
          minHeight: token.height,
          backgroundColor: highlighted ? color['row-highlight'] : token.backgroundColor,
          borderBottomColor: token.borderColor,
        },
      ]}
    >
      <PackCheck state={state} crew={crew} label={`Packed ${name}`} onPress={onToggle} />
      <Pressable accessibilityRole="button" accessibilityLabel={`Open ${name}`} onPress={onPress} style={styles.body}>
        <Text
          numberOfLines={1}
          tone={done ? 'muted' : 'ink'}
          style={[styles.name, done && styles.struck]}
        >
          {name}
        </Text>
        {shopping !== 'have' && <Tag kind={shopping} />}
        {bag ? (
          <View style={styles.bag}>
            <Briefcase size={iconSize.regular} color={color.muted} strokeWidth={ICON_STROKE} />
            <Text variant="small" tone="muted">
              {bag}
            </Text>
          </View>
        ) : null}
        <Text variant="small" tone="muted">
          {quantityLabel(packed, need)}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth },
  body: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing['2'], minHeight: spacing.touch },
  name: { flexShrink: 1, flexGrow: 1 },
  struck: { textDecorationLine: 'line-through' },
  bag: { flexDirection: 'row', alignItems: 'center', gap: spacing['1'] },
  tagText: { textTransform: 'none', letterSpacing: 0 },
  tag: { paddingHorizontal: spacing['2'], justifyContent: 'center', borderRadius: radius.tag },
});
