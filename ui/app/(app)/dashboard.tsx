import { router } from 'expo-router';

import { ScrollView, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import DashboardCard from '@/components/dashboard/DashboardCard';
import Card from '@/components/ui/Card';

import { useTheme } from '@/theme/themeContext';
export default function Dashboard() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: theme.spacing.lg,
        }}
      >
        {/* Header */}
        <View
          style={{
            marginBottom: theme.spacing.xl,
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.h1,
              fontWeight: 'bold',
              color: theme.colors.textPrimary,
            }}
          >
            Kushti Dashboard
          </Text>

          <Text
            style={{
              marginTop: 4,
              color: theme.colors.textSecondary,
              fontSize: theme.typography.body,
            }}
          >
            Wrestling Management System
          </Text>
        </View>

        {/* Stats */}
        <View
          style={{
            gap: theme.spacing.md,
          }}
        >
          <DashboardCard
            title="Players"
            value="128"
            onPress={() => router.push('/(app)/players')}
          />

          <DashboardCard
            title="Matches"
            value="12"
            onPress={() => router.push('/(app)/matches')}
          />

          <DashboardCard
            title="Officials"
            value="18"
            onPress={() => router.push('/(app)/officials')}
          />

          <DashboardCard
            title="Tournaments"
            value="4"
            onPress={() => router.push('/(app)/tournaments')}
          />
        </View>

        {/* Recent Activity */}
        <View
          style={{
            marginTop: theme.spacing.xl,
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.h2,
              fontWeight: '600',
              color: theme.colors.textPrimary,
              marginBottom: theme.spacing.md,
            }}
          >
            Recent Activity
          </Text>

          <View
            style={{
              gap: theme.spacing.md,
            }}
          >
            <Card>
              <View>
                <Text
                  style={{
                    fontSize: theme.typography.body,
                    fontWeight: '600',
                    color: theme.colors.textPrimary,
                  }}
                >
                  Maharashtra State Tournament
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.small,
                  }}
                >
                  Tournament created recently
                </Text>
              </View>
            </Card>

            <Card>
              <View>
                <Text
                  style={{
                    fontSize: theme.typography.body,
                    fontWeight: '600',
                    color: theme.colors.textPrimary,
                  }}
                >
                  Rahul vs Akash
                </Text>

                <Text
                  style={{
                    marginTop: 4,
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.small,
                  }}
                >
                  Match created recently
                </Text>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}