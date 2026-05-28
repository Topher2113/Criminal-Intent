import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HeaderBackButton, HeaderButton } from '@react-navigation/elements';

const TEXT = '#F1FAEE';

export function SettingsButton() {
  const router = useRouter();
  return (
    <HeaderButton pressOpacity={0.5} onPress={() => router.push('/settings')}>
      <Ionicons name="settings-outline" size={22} color={TEXT} />
    </HeaderButton>
  );
}

export function AddButton({ onPress }: { onPress: () => void }) {
  return (
    <HeaderButton pressOpacity={0.5} onPress={onPress}>
      <Ionicons name="add" size={26} color={TEXT} />
    </HeaderButton>
  );
}

export function BackButton({ label }: { label?: string }) {
  const router = useRouter();
  return (
    <HeaderBackButton
      onPress={() => router.back()}
      label={label}
      tintColor={TEXT}
    />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: -8,
  },
});
