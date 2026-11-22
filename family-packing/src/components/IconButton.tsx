import type { LucideIcon } from 'lucide-react-native';
import { Pressable } from 'react-native';

import { color, components, iconSize } from '@/theme';

export const ICON_STROKE = 2.2;

type Props = {
  icon: LucideIcon;
  /** Required: every icon-only button has an accessibility label. */
  label: string;
  onPress?: () => void;
  /** Card tone on mist screens, mist tone inside sheets. */
  tone?: 'card' | 'mist';
};

export function IconButton({ icon: Icon, label, onPress, tone = 'card' }: Props) {
  const token = components['icon-button'];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({
        width: token.size,
        height: token.size,
        borderRadius: token.rounded,
        backgroundColor: tone === 'card' ? token.backgroundColor : color.mist,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <Icon size={iconSize.regular} color={token.textColor} strokeWidth={ICON_STROKE} />
    </Pressable>
  );
}
