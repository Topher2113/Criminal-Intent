import { Stack } from 'expo-router';
import { SettingsButton } from '@/components/HeaderButtons';

const headerStyle = { backgroundColor: '#0A0E17' };
const headerTintColor = '#F1FAEE';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle,
        headerTintColor,
        headerRight: () => <SettingsButton />,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Criminal Intent' }} />
      <Stack.Screen name="detail" options={{ title: 'Crime Detail' }} />
      <Stack.Screen
        name="settings"
        options={{ title: 'Settings', headerRight: undefined }}
      />
    </Stack>
  );
}
