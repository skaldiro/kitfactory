import { X } from 'lucide-react-native';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { components, iconSize, spacing } from '@/theme';

import { IconButton } from './IconButton';
import { ScoutMark } from './Marks';
import { Text } from './Text';
import { TextLink } from './Button';

type SheetProps = {
  visible: boolean;
  title: string;
  label?: string;
  /** Scout's sheet adds its mark to the header. */
  scout?: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

/** White, 22 top corners, over the scrim; header with title, optional label and a mist close button. */
export function Sheet({ visible, title, label, scout, onClose, children }: SheetProps) {
  const insets = useSafeAreaInsets();
  const token = components.sheet;
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[styles.scrim, { backgroundColor: token.scrim }]}>
        <Pressable style={styles.flex} accessibilityLabel="Close" onPress={onClose} />
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: token.backgroundColor,
              borderTopLeftRadius: token.rounded,
              borderTopRightRadius: token.rounded,
              paddingBottom: insets.bottom + spacing['4'],
            },
          ]}
        >
          <View style={styles.header}>
            <View style={styles.flex}>
              {label ? (
                <Text variant="label" tone={scout ? 'scout-text' : 'muted'}>
                  {label}
                </Text>
              ) : null}
              <View style={styles.titleRow}>
                {scout ? <ScoutMark size={iconSize.large} /> : null}
                <Text variant="heading" accessibilityRole="header">
                  {title}
                </Text>
              </View>
            </View>
            <IconButton icon={X} label="Close" tone="mist" onPress={onClose} />
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
}

type ToastProps = { message: string; onUndo?: () => void };

/** Ink, 52 tall, text plus Undo. Shown for the 5-second undo window. */
export function Toast({ message, onUndo }: ToastProps) {
  const token = components.toast;
  return (
    <View
      accessibilityLiveRegion="polite"
      style={[
        styles.toast,
        { height: token.height, borderRadius: token.rounded, backgroundColor: token.backgroundColor },
      ]}
    >
      <Text variant="small" style={[styles.flex, { color: token.textColor }]}>
        {message}
      </Text>
      {onUndo ? <UndoLink onPress={onUndo} /> : null}
    </View>
  );
}

function UndoLink({ onPress }: { onPress: () => void }) {
  return (
    <View style={styles.undo}>
      <TextLink label="Undo" onPress={onPress} tone="mist" />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrim: { flex: 1, justifyContent: 'flex-end' },
  sheet: { paddingTop: spacing['4'], paddingHorizontal: spacing['screen-edge'], gap: spacing['4'] },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing['3'] },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing['2'] },
  toast: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing['4'], gap: spacing['3'] },
  undo: { marginLeft: 'auto' },
});
