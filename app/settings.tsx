import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { getSettings, saveSettings } from '@/storage/settings';
import { BackButton } from '@/components/HeaderButtons';
import { Settings } from '@/types';

const C = {
  bg: '#0A0E17',
  card: '#141824',
  cardBorder: '#1E2535',
  primary: '#E63946',
  text: '#F1FAEE',
  muted: '#6B7A8D',
};

const defaults: Settings = { sortOrder: 'newest', dateFormat: 'short' };

type OptionProps<T extends string> = {
  label: string;
  value: T;
  selected: boolean;
  onSelect: (v: T) => void;
};

function Option<T extends string>({ label, value, selected, onSelect }: OptionProps<T>) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.option,
        selected && styles.optionSelected,
        { opacity: pressed ? 0.7 : 1 },
      ]}
      android_ripple={{ color: 'transparent' }}
      onPress={() => onSelect(value)}
    >
      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{label}</Text>
    </Pressable>
  );
}

export default function SettingsScreen() {
  const [settings, setSettings] = useState<Settings>(defaults);

  useFocusEffect(
    useCallback(() => {
      getSettings().then(setSettings);
    }, [])
  );

  const update = async (partial: Partial<Settings>) => {
    await saveSettings(partial);
    setSettings((prev) => ({ ...prev, ...partial }));
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Settings', headerLeft: () => <BackButton />, headerRight: undefined }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sort Order</Text>
          <View style={styles.optionRow}>
            <Option<Settings['sortOrder']>
              label="Newest"
              value="newest"
              selected={settings.sortOrder === 'newest'}
              onSelect={(v) => update({ sortOrder: v })}
            />
            <Option<Settings['sortOrder']>
              label="Oldest"
              value="oldest"
              selected={settings.sortOrder === 'oldest'}
              onSelect={(v) => update({ sortOrder: v })}
            />
            <Option<Settings['sortOrder']>
              label="A – Z"
              value="title"
              selected={settings.sortOrder === 'title'}
              onSelect={(v) => update({ sortOrder: v })}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date Format</Text>
          <View style={styles.optionRow}>
            <Option<Settings['dateFormat']>
              label="Short"
              value="short"
              selected={settings.dateFormat === 'short'}
              onSelect={(v) => update({ dateFormat: v })}
            />
            <Option<Settings['dateFormat']>
              label="Long"
              value="long"
              selected={settings.dateFormat === 'long'}
              onSelect={(v) => update({ dateFormat: v })}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  content: {
    padding: 20,
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: C.muted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  optionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: C.primary,
    borderColor: C.primary,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: C.muted,
  },
  optionTextSelected: {
    color: C.text,
  },
});
