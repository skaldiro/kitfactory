import { ArrowUp, Mic, Plus, Square } from 'lucide-react-native';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { SCOUT_NAME } from '@/lib/app';
import { color, components, iconSize, motion, padding, radius, spacing } from '@/theme';

import { ICON_STROKE } from './IconButton';
import { ScoutMark } from './Marks';
import { Text } from './Text';

/** Dashed flare on scout-tint: Scout's suggestion. Actions inside are ink and secondary, never orange. */
export function ScoutCard({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  const token = components['scout-card'];
  return (
    <View
      style={[
        padding(token.padding),
        {
          backgroundColor: token.backgroundColor,
          borderColor: token.borderColor,
          borderStyle: token.borderStyle as 'dashed',
          borderWidth: token.borderWidth,
          borderRadius: token.rounded,
          gap: spacing['2'],
        },
      ]}
    >
      <View style={styles.cardLabel}>
        <ScoutMark size={iconSize.regular} />
        <Text variant="label" tone="scout-text">
          {label}
        </Text>
      </View>
      <Text variant="body-strong">{title}</Text>
      {children ? <View style={styles.actions}>{children}</View> : null}
    </View>
  );
}

/** A value Scout assumed: dashed flare underline. Solid means fact. */
export function Assumed({ children }: { children: string }) {
  // React Native only draws dashed borders on all four sides, so the underline
  // is the top edge of a dashed box clipped to the border's height.
  const width = components['scout-card'].borderWidth;
  return (
    <View style={styles.assumed} accessibilityHint={`${SCOUT_NAME} assumed this`}>
      <Text variant="body-strong">{children}</Text>
      <View style={{ height: width, overflow: 'hidden' }}>
        <View style={{ height: width * 4, borderWidth: width, borderStyle: 'dashed', borderColor: color.flare }} />
      </View>
    </View>
  );
}

/** White pill with the Scout mark, a placeholder and a flare send disc; beside it an ink add button. */
export function ScoutBar({ onAsk, onAdd }: { onAsk?: () => void; onAdd?: () => void }) {
  const bar = components['scout-bar'];
  const send = bar.height - spacing['4'];
  return (
    <View style={styles.barRow}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Ask ${SCOUT_NAME}`}
        onPress={onAsk}
        style={[
          styles.bar,
          {
            height: bar.height,
            borderRadius: bar.rounded,
            borderWidth: bar.borderWidth,
            borderColor: bar.borderColor,
            backgroundColor: bar.backgroundColor,
          },
        ]}
      >
        <ScoutMark size={iconSize.large} />
        <Text tone="muted" numberOfLines={1} style={styles.flex}>
          Ask {SCOUT_NAME}
        </Text>
        <View style={[styles.disc, { width: send, height: send, backgroundColor: color.flare }]}>
          <ArrowUp size={iconSize.regular} color={color.ink} strokeWidth={ICON_STROKE} />
        </View>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add an item"
        onPress={onAdd}
        style={[styles.disc, { width: bar.height, height: bar.height, backgroundColor: color.ink }]}
      >
        <Plus size={iconSize.large} color={color.mist} strokeWidth={ICON_STROKE} />
      </Pressable>
    </View>
  );
}

export type MicState = 'idle' | 'recording' | 'transcribing';

/** Every mic: tap opens the recorder; recording is a flare disc with a pulse and a stop square. */
export function MicButton({ state = 'idle', onPress }: { state?: MicState; onPress?: () => void }) {
  // Reduced motion turns every loop off and shows the end state (DESIGN.md, Motion).
  const reduced = useReducedMotion();
  const pulse = useSharedValue(0);
  const size = spacing.button;

  useEffect(() => {
    if (state !== 'recording' || reduced) {
      cancelAnimation(pulse);
      pulse.value = 0;
      return;
    }
    // DESIGN.md gives the pulse no duration of its own; it uses Scout's stage beat.
    pulse.value = withRepeat(
      withTiming(1, { duration: motion['scout-stage'].duration, easing: Easing.out(Easing.quad) }),
      -1,
    );
    return () => cancelAnimation(pulse);
  }, [state, reduced, pulse]);

  const halo = useAnimatedStyle(() => ({
    opacity: 0.35 * (1 - pulse.value),
    transform: [{ scale: 1 + 0.4 * pulse.value }],
  }));

  if (state === 'transcribing') {
    return (
      <View
        accessible
        accessibilityLabel="Transcribing"
        style={[styles.transcribing, { height: size, borderRadius: radius.control }]}
      >
        {[0, 1, 2].map((bar) => (
          <View key={bar} style={styles.bar3} />
        ))}
      </View>
    );
  }

  const recording = state === 'recording';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={recording ? 'Stop recording' : 'Talk instead of typing'}
      onPress={onPress}
      style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}
    >
      {recording && (
        <Animated.View style={[styles.disc, styles.halo, { backgroundColor: color.flare }, halo]} />
      )}
      <View
        style={[
          styles.disc,
          { width: size, height: size, backgroundColor: recording ? color.flare : color.mist },
        ]}
      >
        {recording ? (
          <Square size={iconSize.regular} color={color.ink} fill={color.ink} strokeWidth={ICON_STROKE} />
        ) : (
          <Mic size={iconSize.large} color={color.ink} strokeWidth={ICON_STROKE} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  cardLabel: { flexDirection: 'row', alignItems: 'center', gap: spacing['2'] },
  actions: { flexDirection: 'row', gap: spacing['2'], marginTop: spacing['1'] },
  assumed: { alignSelf: 'flex-start' },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: spacing['2'] },
  bar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['3'],
    paddingLeft: spacing['4'],
    paddingRight: spacing['2'],
  },
  halo: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
  disc: { borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  transcribing: {
    backgroundColor: color.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing['1'],
    paddingHorizontal: spacing['6'],
  },
  bar3: { width: spacing['1'], height: spacing['6'], borderRadius: radius.pill, backgroundColor: color.mist },
});
