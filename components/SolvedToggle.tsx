import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SUCCESS = '#52B788';
const MUTED = '#6B7A8D';

type Props = {
  solved: boolean;
  onToggle: () => void;
};

export function SolvedToggle({ solved, onToggle }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.row, { opacity: pressed ? 0.7 : 1 }]}
      android_ripple={{ color: 'transparent' }}
      onPress={onToggle}
    >
      <Ionicons
        name={solved ? 'checkbox' : 'square-outline'}
        size={24}
        color={solved ? SUCCESS : MUTED}
      />
      <Text style={[styles.text, solved && styles.textActive]}>Mark as Solved</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    fontSize: 16,
    color: MUTED,
    fontWeight: '500',
  },
  textActive: {
    color: SUCCESS,
  },
});
