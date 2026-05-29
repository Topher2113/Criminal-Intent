import { Stack } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { SettingsButton } from '@/components/HeaderButtons';

const BG = '#0A0E17';

// Sets the native Android window background before any React Native rendering.
// Without this, the Android window background (white by default) shows through
// during screen transition animations before the JS content fills in.
SystemUI.setBackgroundColorAsync(BG);

const headerStyle = { backgroundColor: BG };
const headerTintColor = '#F1FAEE';
const contentStyle = { backgroundColor: BG };

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle,
        headerTintColor,
        contentStyle,
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
