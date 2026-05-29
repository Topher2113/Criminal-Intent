import { Pressable, StyleSheet, Text, View } from 'react-native';

const C = {
  card: '#141824',
  cardBorder: '#1E2535',
  primary: '#E63946',
  text: '#F1FAEE',
  muted: '#6B7A8D',
};

type OptionItem<T extends string> = { label: string; value: T };

type Props<T extends string> = {
  title: string;
  options: OptionItem<T>[];
  selected: T;
  onSelect: (v: T) => void;
};

function Option<T extends string>({
  label,
  value,
  isSelected,
  onSelect,
}: OptionItem<T> & { isSelected: boolean; onSelect: (v: T) => void }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.option,
        isSelected && styles.optionSelected,
        { opacity: pressed ? 0.7 : 1 },
      ]}
      android_ripple={{ color: 'transparent' }}
      onPress={() => onSelect(value)}
    >
      <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function SettingRow<T extends string>({ title, options, selected, onSelect }: Props<T>) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.optionRow}>
        {options.map((opt) => (
          <Option
            key={opt.value}
            label={opt.label}
            value={opt.value}
            isSelected={selected === opt.value}
            onSelect={onSelect}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: C.muted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  optionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: C.primary,
    borderColor: C.primary,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: C.muted,
  },
  optionTextSelected: {
    color: C.text,
  },
});
