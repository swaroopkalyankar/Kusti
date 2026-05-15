import { Ionicons } from '@expo/vector-icons';
import {
  Redirect,
  Stack,
  Tabs,
  router,
  usePathname,
} from 'expo-router';

import {
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';

import { useAuth } from '../../hooks/fake_auth';

import { useTheme } from '../../theme/themeContext';

export default function AppLayout() {
  const { isLoggedIn } = useAuth();

  const theme = useTheme();

  const pathname = usePathname();

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  // 🖥️ WEB SIDEBAR
  if (Platform.OS === 'web') {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          backgroundColor: theme.colors.background,
        }}
      >
        {/* Sidebar */}
        <View
          style={{
            width: 240,
            backgroundColor: theme.colors.surface,
            borderRightWidth: 1,
            borderRightColor: theme.colors.border,
            paddingTop: theme.spacing.xl,
            paddingHorizontal: theme.spacing.md,
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.h2,
              fontWeight: 'bold',
              color: theme.colors.textPrimary,
              marginBottom: theme.spacing.xl,
            }}
          >
            Kushti Admin
          </Text>

          <SidebarItem
            label="Dashboard"
            icon="home"
            active={pathname.includes('dashboard')}
            onPress={() => router.push('/dashboard')}
          />

          <SidebarItem
            label="Matches"
            icon="trophy"
            active={pathname.includes('matches')}
            onPress={() => router.push('/matches')}
          />

          <SidebarItem
            label="Players"
            icon="people"
            active={pathname.includes('players')}
            onPress={() => router.push('/players')}
          />

          <SidebarItem
            label="Tournaments"
            icon="medal"
            active={pathname.includes('tournaments')}
            onPress={() => router.push('/tournaments')}
          />

          <SidebarItem
            label="Officials"
            icon="shield-checkmark"
            active={pathname.includes('officials')}
            onPress={() => router.push('/officials')}
          />
        </View>

        {/* Content */}
        <View
          style={{
            flex: 1,
          }}
        >
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </View>
    );
  }

  // 📱 MOBILE TABS
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor:
          theme.colors.textSecondary,

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName: any = 'home';

          if (route.name === 'dashboard') {
            iconName = 'home';
          } else if (route.name === 'matches') {
            iconName = 'trophy';
          } else if (route.name === 'players') {
            iconName = 'people';
          } else if (route.name === 'tournaments') {
            iconName = 'medal';
          } else if (route.name === 'officials') {
            iconName = 'shield-checkmark';
          }

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
    name="matches"
    options={{
      title: 'Matches',
    }}
  />
    </Tabs>
  );
}

function SidebarItem({
  label,
  icon,
  active,
  onPress,
}: any) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,

        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,

        borderRadius: theme.radius.md,

        backgroundColor: active
          ? theme.colors.primary
          : 'transparent',

        marginBottom: theme.spacing.sm,
      }}
    >
      <Ionicons
        name={icon}
        size={20}
        color={
          active
            ? '#fff'
            : theme.colors.textPrimary
        }
      />

      <Text
        style={{
          color: active
            ? '#fff'
            : theme.colors.textPrimary,

          fontSize: theme.typography.body,
          fontWeight: '500',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}