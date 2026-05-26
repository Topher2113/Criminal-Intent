import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import * as Crypto from 'expo-crypto';
import { getAllCrimes } from '@/storage/crimes';
import { useSettings } from '@/context/SettingsContext';
import { CrimeListItem } from '@/components/CrimeListItem';
import { IndexHeaderRight } from '@/components/HeaderButtons';
import { Crime } from '@/types';

const C = {
  bg: '#0A0E17',
  muted: '#6B7A8D',
  text: '#F1FAEE',
};

function sortCrimes(crimes: Crime[], order: 'newest' | 'oldest' | 'title'): Crime[] {
  return [...crimes].sort((a, b) => {
    if (order === 'title') return a.title.localeCompare(b.title);
    const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
    return order === 'newest' ? diff : -diff;
  });
}

export default function IndexScreen() {
  const [crimes, setCrimes] = useState<Crime[]>([]);
  const router = useRouter();
  const { settings } = useSettings();

  useFocusEffect(
    useCallback(() => {
      getAllCrimes().then((data) => setCrimes(data));
    }, [])
  );

  const handleAdd = () => {
    router.push({ pathname: '/detail', params: { id: Crypto.randomUUID() } });
  };

  const sorted = sortCrimes(crimes, settings.sortOrder);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => <IndexHeaderRight onAdd={handleAdd} />,
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={sorted}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CrimeListItem
              crime={item}
              dateFormat={settings.dateFormat}
              onPress={() => router.push({ pathname: '/detail', params: { id: item.id } })}
            />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No crimes reported yet.</Text>
              <Text style={styles.emptyHint}>Tap + to add one.</Text>
            </View>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  list: {
    padding: 16,
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: C.text,
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 14,
    color: C.muted,
  },
});
