import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { screenFor } from '@/lib/routes';
import { color, radius, spacing } from '@/theme';

import { IconButton } from './IconButton';
import { Text } from './Text';

type Props = {
  /** The route as written in design/screens.md, for example "/trips/[id]/pack". */
  route: string;
  children?: React.ReactNode;
};

/** Stands in for a screen until its build task. Names the screen and its design file. */
export function Placeholder({ route, children }: Props) {
  const screen = screenFor(route);
  const canGoBack = route !== '/';
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        {canGoBack ? (
          <IconButton icon={ChevronLeft} label="Back" onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} />
        ) : null}
        <View style={styles.card}>
          <Text variant="label" tone="muted">
            {screen.id} · {screen.source}
          </Text>
          <Text variant="title" accessibilityRole="header">
            {screen.title}
          </Text>
          <Text tone="muted">Built in a later task. The design is design/screens/{screen.source.replace('.dc.html', '.png')}.</Text>
          <Text variant="small" tone="muted">
            Route {screen.route}
          </Text>
        </View>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: color.mist },
  content: { padding: spacing['screen-edge'], gap: spacing['4'] },
  card: { backgroundColor: color.card, borderRadius: radius.card, padding: spacing['4'], gap: spacing['2'] },
});
