import { type Href, Link } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { ICON_STROKE } from '@/components/IconButton';
import { Logo } from '@/components/Marks';
import { Placeholder } from '@/components/Placeholder';
import { Text } from '@/components/Text';
import { screenRoutes } from '@/lib/routes';
import { color, components, iconSize, radius, spacing } from '@/theme';

/** S01a home. Until it is built, it links to the component gallery and every placeholder route. */
export default function Home() {
  return (
    <Placeholder route="/">
      <Logo />
      <View style={styles.card}>
        <NavRow href="/gallery" title="Component gallery" detail="Every core component" />
      </View>
      <Text variant="label" tone="muted">
        Every route
      </Text>
      <View style={styles.card}>
        {screenRoutes
          .filter((screen) => screen.route !== '/')
          .map((screen) => (
            <NavRow key={screen.route} href={screen.href as Href} title={screen.title} detail={`${screen.id} · ${screen.route}`} />
          ))}
      </View>
    </Placeholder>
  );
}

function NavRow({ href, title, detail }: { href: Href; title: string; detail: string }) {
  return (
    <Link href={href} asChild>
      <Pressable accessibilityRole="link" style={styles.row}>
        <View style={styles.flex}>
          <Text variant="body-strong">{title}</Text>
          <Text variant="small" tone="muted">
            {detail}
          </Text>
        </View>
        <ArrowRight size={iconSize.regular} color={color.muted} strokeWidth={ICON_STROKE} />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  card: { backgroundColor: color.card, borderRadius: radius.card, overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['3'],
    minHeight: spacing.input,
    paddingVertical: spacing['2'],
    paddingHorizontal: spacing['4'],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: components['item-row'].borderColor,
  },
});
