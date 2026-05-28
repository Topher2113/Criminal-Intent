import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings } from '@/types';

const KEY = '@settings';
const defaults: Settings = { sortOrder: 'newest', dateFormat: 'short' };

export async function getSettings(): Promise<Settings> {
  const json = await AsyncStorage.getItem(KEY);
  return json ? { ...defaults, ...JSON.parse(json) } : defaults;
}

export async function saveSettings(partial: Partial<Settings>): Promise<void> {
  const current = await getSettings();
  await AsyncStorage.setItem(KEY, JSON.stringify({ ...current, ...partial }));
}
