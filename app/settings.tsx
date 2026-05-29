import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { getSettings, saveSettings } from '@/storage/settings';
import { BackButton } from '@/components/HeaderButtons';
import { SettingRow } from '@/components/SettingRow';
import { Settings } from '@/types';

const defaults: Settings = { sortOrder: 'newest', dateFormat: 'short' };

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
        <SettingRow
          title="Sort Order"
          options={[
            { label: 'Newest', value: 'newest' },
            { label: 'Oldest', value: 'oldest' },
            { label: 'A - Z', value: 'title' },
          ]}
          selected={settings.sortOrder}
          onSelect={(v) => update({ sortOrder: v })}
        />
        <SettingRow
          title="Date Format"
          options={[
            { label: 'Short', value: 'short' },
            { label: 'Long', value: 'long' },
          ]}
          selected={settings.dateFormat}
          onSelect={(v) => update({ dateFormat: v })}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E17',
  },
  content: {
    padding: 20,
    gap: 24,
  },
});
