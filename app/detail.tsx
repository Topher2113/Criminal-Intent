import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { saveCrime } from '@/storage/crimes';
import { useCrime } from '@/hooks/useCrime';
import { useImagePicker } from '@/hooks/useImagePicker';
import { useStoredSettings } from '@/hooks/useStoredSettings';
import { FormField } from '@/components/FormField';
import { SolvedToggle } from '@/components/SolvedToggle';
import { DatePickerModal } from '@/components/DatePickerModal';
import { BackButton, SettingsButton } from '@/components/HeaderButtons';

const C = {
  bg: '#0A0E17',
  card: '#141824',
  cardBorder: '#1E2535',
  primary: '#E63946',
  secondary: '#48CAE4',
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

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { settings } = useStoredSettings();

  const { title, setTitle, details, setDetails, date, setDate, solved, setSolved, photoUri, setPhotoUri } = useCrime(id);
  const { pickPhoto } = useImagePicker(setPhotoUri);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    await saveCrime({
      id,
      title,
      details,
      date: date.toISOString(),
      solved,
      photoUri,
    });
    Alert.alert('Saved', 'Crime report saved.', [{ text: 'OK', onPress: () => router.back() }]);
  };

  return (
    <>
      <Stack.Screen options={{
        headerLeft: () => <BackButton label="Criminal Intent" />,
        headerRight: () => <SettingsButton />,
      }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.topRow}>
          {photoUri ? (
            <Pressable android_ripple={{ color: 'transparent' }} onPress={pickPhoto}>
              <Image source={{ uri: photoUri }} style={styles.photo} />
            </Pressable>
          ) : (
            <Pressable
              style={({ pressed }) => [styles.photoPlaceholder, { opacity: pressed ? 0.7 : 1 }]}
              android_ripple={{ color: 'transparent' }}
              onPress={pickPhoto}
            >
              <Ionicons name="camera-outline" size={28} color={C.muted} />
              <Text style={styles.photoPlaceholderText}>Add Photo</Text>
            </Pressable>
          )}
        </View>

        <FormField label="Title">
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Crime title"
            placeholderTextColor={C.muted}
          />
        </FormField>

        <FormField label="Details">
          <TextInput
            style={[styles.input, styles.multiline]}
            value={details}
            onChangeText={setDetails}
            placeholder="Describe what happened..."
            placeholderTextColor={C.muted}
            multiline
            numberOfLines={4}
          />
        </FormField>

        <FormField label="Date">
          <Pressable
            style={({ pressed }) => [styles.dateBtn, { opacity: pressed ? 0.7 : 1 }]}
            android_ripple={{ color: 'transparent' }}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={18} color={C.secondary} />
            <Text style={styles.dateBtnText}>{formatDate(date.toISOString(), settings.dateFormat)}</Text>
          </Pressable>
        </FormField>

        <SolvedToggle solved={solved} onToggle={() => setSolved((s) => !s)} />

        <Pressable
          style={({ pressed }) => [styles.saveBtn, { opacity: pressed ? 0.8 : 1 }]}
          android_ripple={{ color: 'transparent' }}
          onPress={handleSave}
        >
          <Text style={styles.saveBtnText}>Save</Text>
        </Pressable>
      </ScrollView>

      <DatePickerModal
        visible={showDatePicker}
        date={date}
        onChange={setDate}
        onClose={() => setShowDatePicker(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },
  content: {
    padding: 20,
    gap: 20,
  },
  topRow: {
    alignItems: 'flex-start',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  photoPlaceholderText: {
    fontSize: 11,
    color: C.muted,
  },
  input: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: C.text,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  dateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dateBtnText: {
    fontSize: 16,
    color: C.secondary,
    fontWeight: '500',
  },
  saveBtn: {
    backgroundColor: C.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: C.text,
    letterSpacing: 0.5,
  },
});
