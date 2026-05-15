import { forwardRef, useState } from 'react';

import {
  Text,
  TextInput,
  View,
} from 'react-native';

import { useTheme } from '../../theme/themeContext';

const Input = forwardRef(({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  returnKeyType = 'next',
  onSubmitEditing,
}: any, ref: any) => {

  const theme = useTheme();

  const [isFocused, setIsFocused] =
    useState(false);

  const borderColor = error
    ? theme.colors.error
    : isFocused
    ? theme.colors.primary
    : theme.colors.border;

  return (
    <View
      style={{
        marginBottom: theme.spacing.md,
      }}
    >
      {/* Label */}
      {label && (
        <Text
          style={{
            marginBottom: 4,
            color: theme.colors.textPrimary,
            fontSize: theme.typography.small,
          }}
        >
          {label}
        </Text>
      )}

      {/* Input */}
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={
          theme.colors.textSecondary
        }
        secureTextEntry={secureTextEntry}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          borderWidth: 1,
          borderColor,
          padding: theme.spacing.md,
          borderRadius: theme.radius.md,
          fontSize: theme.typography.body,
          color: theme.colors.textPrimary,
        }}
      />

      {/* Error */}
      {error && (
        <Text
          style={{
            marginTop: 4,
            color: theme.colors.error,
            fontSize: theme.typography.small,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
});

export default Input;