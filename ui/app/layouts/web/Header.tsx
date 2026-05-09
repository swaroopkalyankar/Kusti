import { useAuth } from '@/hooks/fake_auth';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../theme/themeContext';

export default function Header({ onToggle }: any) {
  const theme = useTheme();
  const router = useRouter();
const { logout } = useAuth();

  return (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
      }}
    >
      {/* LEFT */}
      <TouchableOpacity onPress={onToggle}>
        <Text style={{ fontSize: 18 }}>☰</Text>
      </TouchableOpacity>

      {/* CENTER */}
      <Text
        style={{
          color: theme.colors.textPrimary,
          fontSize: theme.typography.h3,
        }}
      >
        My App
      </Text>

      {/* RIGHT - LOGOUT */}
      <TouchableOpacity
        onPress={() => {
          logout(); // ❌ remove access
          router.replace('/login'); // 🔁 redirect
        }}
      >
        <Text style={{ color: 'red' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}