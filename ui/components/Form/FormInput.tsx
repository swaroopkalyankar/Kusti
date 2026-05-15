import { Controller } from 'react-hook-form';

import Input from '../ui/Input';

export default function FormInput({
  control,
  name,
  rules,
  inputRef,
  onSubmitEditing,
  returnKeyType,
  ...props
}: any) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error },
      }) => (
        <Input
          ref={inputRef}
          {...props}
          value={value}
          onChangeText={onChange}
          error={error?.message}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
        />
      )}
    />
  );
}