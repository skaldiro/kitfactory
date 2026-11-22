// The custom marks from design/system/assets/Logos/, redrawn with token colors
// so no hex value lives outside design/tokens.json.
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { APP_NAME } from '@/lib/app';
import { color, spacing } from '@/theme';

import { Text } from './Text';

/** Scout's mark: a flare diamond with an ink eye. Every AI moment carries it. */
export function ScoutMark({ size = 24 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="Scout">
      <Rect x={5} y={5} width={14} height={14} rx={3.5} transform="rotate(45 12 12)" fill={color.flare} />
      <Circle cx={12} cy={12} r={2.6} fill={color.ink} />
    </Svg>
  );
}

const ribs = [color.crew.blue, color.crew.mint, color.crew.yellow, color.crew.pink];

/** Logo A, the Case, on its flare tile. For light grounds. Fixed colors. */
export function LogoTile({ size = 48 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" accessibilityLabel={APP_NAME}>
      <Rect width={48} height={48} rx={12} fill={color.flare} />
      <Path
        d="M19 13v-2.5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2V13"
        fill="none"
        stroke={color.ink}
        strokeWidth={2.6}
        strokeLinecap="round"
      />
      <Rect x={9} y={13} width={30} height={25} rx={6} fill={color.ink} />
      {ribs.map((rib, i) => (
        <Rect key={rib} x={13.5 + i * 6} y={18} width={3.6} height={15} rx={1.8} fill={rib} />
      ))}
      <Circle cx={16} cy={41} r={1.8} fill={color.ink} />
      <Circle cx={32} cy={41} r={1.8} fill={color.ink} />
    </Svg>
  );
}

/** The case drawn in flare with ink ribs, no tile. For ink grounds only. */
export function LogoCaseReversed({ size = 48 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" accessibilityLabel={APP_NAME}>
      <Path
        d="M18 11V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3"
        fill="none"
        stroke={color.flare}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <Rect x={7} y={11} width={34} height={30} rx={7} fill={color.flare} />
      {[12, 18.7, 25.3, 32].map((x) => (
        <Rect key={x} x={x} y={17} width={4} height={18} rx={2} fill={color.ink} />
      ))}
      <Circle cx={15} cy={44} r={2.2} fill={color.flare} />
      <Circle cx={33} cy={44} r={2.2} fill={color.flare} />
    </Svg>
  );
}

/** The lockup: tile and the set wordmark "kitmunk", Archivo 900 at 62.5% width. */
export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <View style={styles.lockup}>
      {onDark ? <LogoCaseReversed size={spacing.input} /> : <LogoTile size={spacing.input} />}
      <Text variant="title" tone={onDark ? 'mist' : 'ink'} accessibilityRole="header">
        {APP_NAME.toLowerCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  lockup: { flexDirection: 'row', alignItems: 'center', gap: spacing['3'] },
});
