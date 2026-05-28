import { StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
  children: React.ReactNode;
};

export function FormField({ label, children }: Props) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B8C8D8',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
});
