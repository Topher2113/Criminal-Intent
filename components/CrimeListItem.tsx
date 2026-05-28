import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Crime } from '@/types';

const C = {
  card: '#141824',
  cardBorder: '#1E2535',
  primary: '#E63946',
  secondary: '#48CAE4',
  success: '#52B788',
  text: '#F1FAEE',
  muted: '#6B7A8D',
};

function formatDate(iso: string, fmt: 'short' | 'long'): string {
  const d = new Date(iso);
  if (fmt === 'long') {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return d.toLocaleDateString('en-US');
}

type Props = {
  crime: Crime;
  dateFormat: 'short' | 'long';
  onPress: () => void;
};

export function CrimeListItem({ crime, dateFormat, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, { opacity: pressed ? 0.7 : 1 }]}
      android_ripple={{ color: 'transparent' }}
      onPress={onPress}
    >
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {crime.title || 'Untitled Crime'}
        </Text>
        <Text style={styles.date}>{formatDate(crime.date, dateFormat)}</Text>
      </View>
      {crime.solved && (
        <MaterialCommunityIcons name="handcuffs" size={22} color={C.success} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.card,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: C.cardBorder,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: C.text,
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: C.muted,
  },
});
