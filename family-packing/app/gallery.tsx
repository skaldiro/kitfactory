import { router } from 'expo-router';
import { ChevronLeft, Ellipsis, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, TextLink } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { CrewAvatar, PackCheck } from '@/components/Crew';
import { IconButton } from '@/components/IconButton';
import { ItemRow, Tag } from '@/components/ItemRow';
import { Logo, LogoTile, ScoutMark } from '@/components/Marks';
import { Assumed, MicButton, ScoutBar, ScoutCard } from '@/components/Scout';
import { Sheet, Toast } from '@/components/Sheet';
import { Text } from '@/components/Text';
import { color, crewOrder, iconSize, radius, spacing, type TypographyName } from '@/theme';

const typeSamples: [TypographyName, string][] = [
  ['display', 'Italy'],
  ['title', 'Your lists are ready.'],
  ['heading', 'Dates in Florence'],
  ['subhead', '12 things, across 5 lists'],
  ['body', 'Rain shells, one each'],
  ['body-strong', 'Open the packing list'],
  ['small', 'Saved while packing Italy'],
  ['label', 'Where and when'],
];

const crew = [
  { name: 'Nadia', age: 'Adult' },
  { name: 'Sam', age: 'Adult' },
  { name: 'Leo', age: '6 yrs' },
  { name: 'Ivy', age: '3 yrs' },
  { name: 'Mo', age: 'Under 1' },
  { name: 'Ana', age: 'Adult' },
];

/** Every core component in the design's colors and fonts, for review on a phone. */
export default function Gallery() {
  const [sheet, setSheet] = useState<'plain' | 'scout' | null>(null);
  const [selected, setSelected] = useState<string[]>(['Museums']);
  const [packed, setPacked] = useState(1);

  const toggleChip = (label: string) =>
    setSelected((now) => (now.includes(label) ? now.filter((l) => l !== label) : [...now, label]));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topBar}>
          <IconButton icon={ChevronLeft} label="Back" onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} />
          <IconButton icon={Ellipsis} label="More" />
        </View>
        <Text variant="title" accessibilityRole="header">
          Component gallery
        </Text>

        <Section label="Brand">
          <Logo />
          <View style={[styles.dark, styles.rowWrap]}>
            <Logo onDark />
          </View>
          <View style={styles.rowWrap}>
            <LogoTile size={spacing.input} />
            <ScoutMark size={iconSize.large} />
          </View>
        </Section>

        <Section label="Type · Archivo only">
          {typeSamples.map(([variant, sample]) => (
            <View key={variant}>
              <Text variant="small" tone="muted">
                {variant}
              </Text>
              <Text variant={variant}>{sample}</Text>
            </View>
          ))}
        </Section>

        <Section label="Buttons">
          <Button variant="scout" label="Create our packing list" />
          <Button variant="primary" label="Open the packing list" />
          <View style={styles.rowWrap}>
            <Button variant="secondary" label="Start fresh" />
            <Button variant="danger" label="Delete trip" />
            <TextLink label="Text link" />
          </View>
          <View style={styles.rowWrap}>
            <Button variant="primary" size="small" label="Add item" />
            <Button variant="secondary" size="small" label="Skip" />
          </View>
          <View style={[styles.dark, styles.rowWrap]}>
            <Button variant="onDark" label="See the list" />
            <Button variant="ghostOnDark" label="Copy invite link" />
          </View>
          <View style={[styles.rowWrap, styles.mist]}>
            <IconButton icon={Plus} label="Add" />
          </View>
          <View style={styles.rowWrap}>
            <IconButton icon={Plus} label="Add, in a sheet" tone="mist" />
          </View>
        </Section>

        <Section label="Chips and tags">
          <View style={styles.rowWrap}>
            {['Hiking', 'Museums', 'Beach'].map((label) => (
              <Chip key={label} label={label} selected={selected.includes(label)} onPress={() => toggleChip(label)} />
            ))}
          </View>
          <View style={styles.rowWrap}>
            <Tag kind="to-buy" />
            <Tag kind="bought" />
          </View>
        </Section>

        <Section label="Item rows" flush>
          <ItemRow
            name="Rain shell"
            crew="blue"
            need={3}
            packed={packed}
            highlighted={packed > 0 && packed < 3}
            onToggle={() => setPacked((n) => (n >= 3 ? 0 : n + 1))}
          />
          <ItemRow name="Sun hat" crew="mint" need={1} packed={0} shopping="to-buy" />
          <ItemRow name="Swim nappies" crew="yellow" need={6} packed={0} shopping="bought" />
          <ItemRow name="Passport" crew="pink" need={1} packed={1} bag="Carry-on" />
          <ItemRow name="Sunscreen" crew="shared" need={1} packed={0} />
        </Section>

        <Section label="Pack check">
          <View style={styles.rowWrap}>
            <PackCheck state="empty" crew="blue" label="Empty" />
            <PackCheck state="partial" crew="blue" label="Partly packed" />
            <PackCheck state="done" crew="blue" label="Packed" />
            <PackCheck state="done" crew="mint" label="Packed" />
            <PackCheck state="done" crew="shared" label="Packed" />
          </View>
        </Section>

        <Section label="Crew">
          <View style={styles.rowWrap}>
            {crewOrder.map((name, i) => (
              <View key={name} style={styles.person}>
                <CrewAvatar name={crew[i].name} crew={name} size={48} />
                <Text variant="small">{crew[i].name}</Text>
                <Text variant="small" tone="muted">
                  {crew[i].age}
                </Text>
              </View>
            ))}
            <View style={styles.person}>
              <CrewAvatar name="Shared" crew="shared" size={48} />
              <Text variant="small">Shared</Text>
            </View>
          </View>
          <View style={[styles.rowWrap, styles.bottom]}>
            <CrewAvatar name="Nadia" crew="blue" size={64} />
            <CrewAvatar name="Sam" crew="mint" size={48} />
            <CrewAvatar name="Leo" crew="yellow" size={40} />
            <CrewAvatar name="Ivy" crew="pink" size={28} />
          </View>
          <Text variant="small" tone="muted">
            Ring as packing progress
          </Text>
          <View style={styles.rowWrap}>
            <CrewAvatar name="Nadia" crew="blue" size={48} progress={0.25} />
            <CrewAvatar name="Sam" crew="mint" size={48} progress={0.6} />
            <CrewAvatar name="Leo" crew="lavender" size={48} progress={1} />
          </View>
        </Section>

        <Section label="Scout">
          <ScoutCard label="Scout noticed" title="Two train rides between stops">
            <Button variant="primary" size="small" label="Add them" />
            <Button variant="secondary" size="small" label="Skip" />
          </ScoutCard>
          <Assumed>2 checked bags, 4 carry-ons</Assumed>
          <ScoutBar onAsk={() => setSheet('scout')} />
        </Section>

        <Section label="Voice · every mic does this">
          <View style={[styles.rowWrap, styles.center]}>
            <MicButton state="idle" />
            <MicButton state="recording" />
            <MicButton state="transcribing" />
          </View>
        </Section>

        <Section label="Feedback">
          <Toast message="Packed Pajamas ×3" onUndo={() => undefined} />
          <View style={styles.rowWrap}>
            <Button variant="secondary" size="small" label="Open a sheet" onPress={() => setSheet('plain')} />
            <Button variant="secondary" size="small" label="Open Scout's sheet" onPress={() => setSheet('scout')} />
          </View>
        </Section>
      </ScrollView>

      <Sheet visible={sheet === 'plain'} title="Rain shell" label="Nadia" onClose={() => setSheet(null)}>
        <Text tone="muted">Need 3, packed 1.</Text>
        <Button variant="primary" label="Save" onPress={() => setSheet(null)} />
      </Sheet>
      <Sheet visible={sheet === 'scout'} title="Ask Scout" label="Italy" scout onClose={() => setSheet(null)}>
        <ScoutBar />
      </Sheet>
    </SafeAreaView>
  );
}

function Section({ label, children, flush }: { label: string; children: React.ReactNode; flush?: boolean }) {
  return (
    <View style={styles.section}>
      <Text variant="label" tone="muted">
        {label}
      </Text>
      <View style={[styles.card, flush && styles.flush]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: color.mist },
  content: { padding: spacing['screen-edge'], gap: spacing['6'], paddingBottom: spacing['6'] * 2 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between' },
  section: { gap: spacing['2'] },
  card: { backgroundColor: color.card, borderRadius: radius.card, padding: spacing['4'], gap: spacing['3'] },
  flush: { padding: 0, overflow: 'hidden' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: spacing['2'] },
  bottom: { alignItems: 'flex-end' },
  center: { justifyContent: 'center', gap: spacing['4'] },
  dark: { backgroundColor: color.ink, borderRadius: radius.control, padding: spacing['4'] },
  mist: { backgroundColor: color.mist, borderRadius: radius.control, padding: spacing['3'] },
  person: { alignItems: 'center', width: spacing.button },
});
