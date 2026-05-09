import { Text, View } from 'react-native';
import { useTheme } from '../../theme/themeContext';

export default function Tab1() {
  const theme = useTheme();
 
   return (
     <View style={{
       flex: 1,
       backgroundColor: theme.colors.background,
       padding: theme.spacing.md
     }}>
       <Text style={{
         color: theme.colors.textPrimary,
         fontSize: theme.typography.h1,
         fontFamily: theme.typography.fontFamily
       }}>
         Tab 1
       </Text>
     </View>
   );
}