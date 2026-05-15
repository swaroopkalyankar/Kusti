import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useTheme } from '../../theme/themeContext';
import Card from '../ui/Card';

export default function CreateModal({
  visible,
  onClose,
  title,
  children,
}: any) {
  const theme = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* BACKDROP */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.45)',
              justifyContent: 'center',
              padding: theme.spacing.lg,
            }}
          >
            {/* MODAL CONTENT WRAPPER */}
            <TouchableWithoutFeedback onPress={() => {}}>
              <View>
                <Card>
                  {/* HEADER */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: theme.spacing.lg,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: theme.typography.h2,
                        fontWeight: 'bold',
                        color: theme.colors.textPrimary,
                      }}
                    >
                      {title ?? ''}
                    </Text>

                    <Pressable onPress={onClose}>
                      <Text style={{ fontSize: 22 }}>✖️</Text>
                    </Pressable>
                  </View>

                  {/* CONTENT */}
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {children}
                  </ScrollView>
                </Card>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}