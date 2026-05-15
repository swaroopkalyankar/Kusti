import { Text, View } from 'react-native';

import Card from '../ui/Card';

import { useTheme } from '../../theme/themeContext';

export default function DashboardCard({
  title,
  value,
  onPress,
}: any) {
  const theme = useTheme();

  return (
    <Card onPress={onPress}>
      <View>
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.body,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            marginTop: 8,
            fontSize: theme.typography.h1,
            fontWeight: 'bold',
            color: theme.colors.textPrimary,
          }}
        >
          {value}
        </Text>
      </View>
    </Card>
  );
}