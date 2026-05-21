import { Ionicons } from '@expo/vector-icons';
import { Redirect, Stack, Tabs } from 'expo-router';
import { useWindowDimensions } from 'react-native';

import { useAuth } from '../../hooks/fake_auth';

import MobileLayout from '../layouts/MobileLayout';
import WebLayout from '../layouts/web/WebLayout';

export default function AppLayout() {
  const { isLoggedIn } = useAuth();
  const { width } = useWindowDimensions();

  const isMobile = width < 768;

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  if (!isMobile) {
    return (
      <WebLayout>
        <Stack screenOptions={{ headerShown: false }} />
      </WebLayout>
    );
  }

  return (
    <MobileLayout>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: any = 'home';

            if (route.name === 'dashboard') iconName = 'home';
            else if (route.name === 'players') iconName = 'people';
            else if (route.name === 'matches') iconName = 'trophy';
            else if (route.name === 'officials') iconName = 'shield-checkmark';
            else if (route.name === 'tournaments') iconName = 'medal';
            else if (route.name === 'scoring') iconName = 'flash';

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tabs.Screen
  name="dashboard"
  options={{
    title: 'Dashboard',
  }}
/>

<Tabs.Screen
  name="players"
  options={{
    title: 'Players',
  }}
/>

<Tabs.Screen
  name="matches"
  options={{
    title: 'Matches',
  }}
/>

<Tabs.Screen
  name="officials"
  options={{
    title: 'Officials',
  }}
/>

<Tabs.Screen
  name="tournaments"
  options={{
    title: 'Tournaments',
  }}
/>

<Tabs.Screen
  name="scoring"
  options={{
    title: 'Scoring',
  }}
/>
      </Tabs>
    </MobileLayout>
  );
}