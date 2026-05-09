import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/fake_auth';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <Text>Login Screen</Text>

      <Button
        title="GO TO DASHBOARD"
        onPress={() => {
          login(); // ✅ set flag
          router.replace('/dashboard'); // ✅ go inside app
        }}
      />
    </View>
  );
}