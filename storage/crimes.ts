import AsyncStorage from '@react-native-async-storage/async-storage';
import { Crime } from '@/types';

const KEY = '@crimes';

export async function getAllCrimes(): Promise<Crime[]> {
  const json = await AsyncStorage.getItem(KEY);
  return json ? JSON.parse(json) : [];
}

export async function getCrime(id: string): Promise<Crime | null> {
  const crimes = await getAllCrimes();
  return crimes.find((c) => c.id === id) ?? null;
}

export async function saveCrime(crime: Crime): Promise<void> {
  const crimes = await getAllCrimes();
  const index = crimes.findIndex((c) => c.id === crime.id);
  if (index >= 0) {
    crimes[index] = crime;
  } else {
    crimes.push(crime);
  }
  await AsyncStorage.setItem(KEY, JSON.stringify(crimes));
}
