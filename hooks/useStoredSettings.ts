import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { getSettings } from '@/storage/settings';
import { Settings } from '@/types';

const defaults: Settings = { sortOrder: 'newest', dateFormat: 'short' };

export function useStoredSettings() {
  const [settings, setSettings] = useState<Settings>(defaults);

  useFocusEffect(
    useCallback(() => {
      getSettings().then(setSettings);
    }, [])
  );

  return { settings };
}
