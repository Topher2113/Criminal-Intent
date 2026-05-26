import { useEffect, useState } from 'react';
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
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { getCrime, saveCrime } from '@/storage/crimes';
import { useSettings } from '@/context/SettingsContext';
import { DatePickerModal } from '@/components/DatePickerModal';
import { SettingsButton } from '@/components/HeaderButtons';

const C = {
  bg: '#0A0E17',
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

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { settings } = useSettings();

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState(new Date());
  const [solved, setSolved] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (!id) return;
    getCrime(id).then((crime) => {
      if (!crime) return;
      setTitle(crime.title);
      setDetails(crime.details);
      setDate(new Date(crime.date));
      setSolved(crime.solved);
      setPhotoUri(crime.photoUri);
    });
  }, [id]);

  const handlePickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Allow access to your photo library to add a photo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

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
      <Stack.Screen options={{ headerRight: () => <SettingsButton /> }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.topRow}>
          {photoUri ? (
            <Pressable onPress={handlePickPhoto}>
              <Image source={{ uri: photoUri }} style={styles.photo} />
            </Pressable>
          ) : (
            <Pressable
              style={({ pressed }) => [styles.photoPlaceholder, { opacity: pressed ? 0.7 : 1 }]}
              onPress={handlePickPhoto}
            >
              <Ionicons name="camera-outline" size={28} color={C.muted} />
              <Text style={styles.photoPlaceholderText}>Add Photo</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Crime title"
            placeholderTextColor={C.muted}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Details</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={details}
            onChangeText={setDetails}
            placeholder="Describe what happened..."
            placeholderTextColor={C.muted}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Date</Text>
          <Pressable
            style={({ pressed }) => [styles.dateBtn, { opacity: pressed ? 0.7 : 1 }]}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={18} color={C.secondary} />
            <Text style={styles.dateBtnText}>{formatDate(date.toISOString(), settings.dateFormat)}</Text>
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [styles.solvedRow, { opacity: pressed ? 0.7 : 1 }]}
          onPress={() => setSolved((s) => !s)}
        >
          <Ionicons
            name={solved ? 'checkbox' : 'square-outline'}
            size={24}
            color={solved ? C.success : C.muted}
          />
          <Text style={[styles.solvedText, solved && styles.solvedTextActive]}>
            Mark as Solved
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.saveBtn, { opacity: pressed ? 0.8 : 1 }]}
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
  field: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: C.muted,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
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
  solvedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  solvedText: {
    fontSize: 16,
    color: C.muted,
    fontWeight: '500',
  },
  solvedTextActive: {
    color: C.success,
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
