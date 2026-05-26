import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const C = {
  primary: '#E63946',
  text: '#F1FAEE',
};

export function SettingsButton() {
  const router = useRouter();
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.6 : 1 }]}
      onPress={() => router.push('/settings')}
    >
      <Ionicons name="settings-outline" size={22} color={C.text} />
    </Pressable>
  );
}

type AddButtonProps = { onPress: () => void };

export function AddButton({ onPress }: AddButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.6 : 1 }]}
      onPress={onPress}
    >
      <Ionicons name="add" size={26} color={C.text} />
    </Pressable>
  );
}

export function IndexHeaderRight({ onAdd }: { onAdd: () => void }) {
  return (
    <View style={styles.row}>
      <SettingsButton />
      <AddButton onPress={onAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginRight: 4,
  },
});
