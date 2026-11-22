import { Check } from 'lucide-react-native';
import { Pressable, StyleSheet, Text as RNText, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { archivo, color, components, crewColors, type CrewName, iconSize, spacing, type } from '@/theme';

import { ICON_STROKE } from './IconButton';

export const AVATAR_SIZES = components.avatar.sizes
  .split(/\s+/)
  .map((size) => Number.parseFloat(size)) as number[];

export type AvatarSize = 28 | 40 | 48 | 64;

// The initial's size follows the type scale: label at 28, small at 40 and 48, subhead at 64.
const initialSize: Record<AvatarSize, number> = {
  28: type.label.fontSize as number,
  40: type.small.fontSize as number,
  48: type.small.fontSize as number,
  64: type.subhead.fontSize as number,
};

type AvatarProps = {
  name: string;
  crew: CrewName | 'shared';
  size?: AvatarSize;
  /** 0 to 1. When set, the ring shows packing progress instead of a full circle. */
  progress?: number;
};

/** Everyone is a circle: a crew fill, a 2.5 ring in the deep shade, and an initial. */
export function CrewAvatar({ name, crew, size = 40, progress }: AvatarProps) {
  const colors = crewColors(crew);
  const ring = components.avatar.ringWidth;
  const r = (size - ring) / 2;
  const circumference = 2 * Math.PI * r;
  const initial = crew === 'shared' ? 'Us' : name.slice(0, 1).toUpperCase();
  const filled = progress === undefined ? 1 : Math.max(0, Math.min(1, progress));
  return (
    <View
      accessible
      accessibilityLabel={progress === undefined ? name : `${name}, ${Math.round(filled * 100)} percent packed`}
      style={{ width: size, height: size }}
    >
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle cx={size / 2} cy={size / 2} r={r - ring / 2} fill={colors.fill} />
        {progress !== undefined && (
          <Circle cx={size / 2} cy={size / 2} r={r} stroke={color.track} strokeWidth={ring} fill="none" />
        )}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={colors.deep}
          strokeWidth={ring}
          fill="none"
          strokeDasharray={`${circumference * filled} ${circumference}`}
          strokeLinecap={filled < 1 ? 'round' : 'butt'}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.center}>
        <RNText
          style={{
            fontFamily: archivo('600'),
            fontSize: initialSize[size],
            color: colors.initial,
          }}
        >
          {initial}
        </RNText>
      </View>
    </View>
  );
}

export type PackState = 'empty' | 'partial' | 'done';

type CheckProps = {
  state: PackState;
  crew: CrewName | 'shared';
  label: string;
  onPress?: () => void;
};

/** 26 square in the owner's crew color: empty (edge), partial (crew dash), done (crew-deep fill). Hit area 44 by 48. */
export function PackCheck({ state, crew, label, onPress }: CheckProps) {
  const token = components['pack-check'];
  const deep = crewColors(crew).deep;
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked: state === 'done' ? true : state === 'partial' ? 'mixed' : false }}
      onPress={onPress}
      style={styles.checkHit}
    >
      <View
        style={{
          width: token.size,
          height: token.size,
          borderRadius: token.rounded,
          borderWidth: token.borderWidth,
          borderColor: state === 'empty' ? token.borderColor : deep,
          backgroundColor: state === 'done' ? deep : color.card,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {state === 'partial' && (
          <View style={{ width: spacing['3'], height: token.borderWidth, borderRadius: token.borderWidth, backgroundColor: deep }} />
        )}
        {state === 'done' && <Check size={iconSize.regular} color={color.card} strokeWidth={ICON_STROKE} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  center: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, alignItems: 'center', justifyContent: 'center' },
  checkHit: { width: spacing.touch, height: components['item-row'].height, alignItems: 'center', justifyContent: 'center' },
});
