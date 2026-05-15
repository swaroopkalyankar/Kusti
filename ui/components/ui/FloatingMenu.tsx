import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../../theme/themeContext';

export default function FloatingMenu({ counts }: any) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const items = [
    {
      label: 'players',
      route: '/(app)/players',
      count: counts.players,
    },
    {
      label: 'Matches',
      route: '/(app)/matches',
      count: counts.matches,
    },
    {
      label: 'Officials',
      route: '/(app)/officials',
      count: counts.officials,
    },
    {
      label: 'Tournaments',
      route: '/(app)/tournaments',
      count: counts.tournaments,
    },
  ];

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 25,
        right: 20,
        alignItems: 'flex-end',
      }}
    >
      {/* MENU ITEMS */}
      {open &&
        items.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => {
              setOpen(false);
              router.push(item.route as any);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme.colors.surface,
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 10,
              marginBottom: 8,
              gap: 10,
            }}
          >
            <Text style={{ color: theme.colors.textPrimary }}>
              {item.label}
            </Text>

            <View
              style={{
                backgroundColor: theme.colors.primary,
                paddingHorizontal: 8,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 12 }}>
                {item.count}
              </Text>
            </View>
          </Pressable>
        ))}

      {/* SINGLE FAB BUTTON */}
      <Pressable
        onPress={() => setOpen(!open)}
        style={{
          width: 58,
          height: 58,
          borderRadius: 29,
          backgroundColor: theme.colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontSize: 26 }}>
          +
        </Text>
      </Pressable>
    </View>
  );
}