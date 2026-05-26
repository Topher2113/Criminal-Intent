import { useEffect } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const C = {
  bg: '#0A0E17',
  card: '#141824',
  cardBorder: '#1E2535',
  primary: '#E63946',
  text: '#F1FAEE',
  muted: '#6B7A8D',
};

type Props = {
  visible: boolean;
  date: Date;
  onChange: (date: Date) => void;
  onClose: () => void;
};

export function DatePickerModal({ visible, date, onChange, onClose }: Props) {
  useEffect(() => {
    if (visible && Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: date,
        mode: 'date',
        onChange: (_event, selected) => {
          onClose();
          if (selected) onChange(selected);
        },
      });
    }
  }, [visible]);

  if (Platform.OS === 'android') return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.heading}>Select Date</Text>
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            textColor={C.text}
            onChange={(_event, selected) => {
              if (selected) onChange(selected);
            }}
            style={styles.picker}
          />
          <Pressable
            style={({ pressed }) => [styles.doneBtn, { opacity: pressed ? 0.7 : 1 }]}
            onPress={onClose}
          >
            <Text style={styles.doneBtnText}>Done</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: C.cardBorder,
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: C.text,
    marginBottom: 12,
  },
  picker: {
    width: '100%',
    height: 180,
  },
  doneBtn: {
    marginTop: 16,
    backgroundColor: C.primary,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  doneBtnText: {
    color: C.text,
    fontSize: 16,
    fontWeight: '700',
  },
});
