import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CreateModal from '@/components/dashboard/CreateModal';
import FormInput from '@/components/Form/FormInput';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import RadioGroup from '@/components/ui/RadioGroup';
import Select from '@/components/ui/Select';

import { useTheme } from '@/theme/themeContext';

import {
  createOfficial,
  deleteOfficial,
  getOfficials,
  updateOfficial,
} from '@/services/officialService';

export default function OfficialsScreen() {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [officials, setOfficials] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      age: '',
      mobile: '',
      city: '',
      state: '',
      role: 'Referee',
      gender: 'male',
    },
    mode: 'onChange'
  });

  useEffect(() => {
  console.log("Officials screen mounted");
}, []);

  // LOAD DATA
  const loadOfficials = async () => {
    try {
      const data = await getOfficials();
      setOfficials(data);
    } catch (err) {
      console.log('GET officials error:', err);
    }
  };

  useEffect(() => {
    loadOfficials();
  }, []);

  const nameRef = useRef<any>(null);
const roleRef = useRef<any>(null);
const ageRef = useRef<any>(null);
const phoneRef = useRef<any>(null);
const addressRef = useRef<any>(null);

  // CREATE / UPDATE
  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        age: Number(data.age),
      };

      if (editingId !== null) {
        await updateOfficial(editingId, payload);
      } else {
        await createOfficial(payload);
      }

      await loadOfficials();

      setOpen(false);
      setEditingId(null);
      reset();
    } catch (err) {
      console.log('Official submit error:', err);
    }
  };

  // EDIT
  const handleEdit = (item: any) => {
    setEditingId(item.id);

    reset({
      name: item.name ?? '',
      age: String(item.age ?? ''),
      mobile: item.mobile ?? '',
      city: item.city ?? '',
      state: item.state ?? '',
      role: item.role ?? 'Referee',
      gender: item.gender ?? 'male',
    });

    setOpen(true);
  };

  // DELETE
  const handleDelete = async (id: number) => {
    try {
      await deleteOfficial(id);
      await loadOfficials();
    } catch (err) {
      console.log('Delete error:', err);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={{ padding: theme.spacing.lg }}>

        {/* HEADER */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: theme.typography.h1, fontWeight: 'bold' }}>
            Officials
          </Text>

          <Button
            title="Add"
            icon="person-add"
            size="sm"
            onPress={() => {
              setEditingId(null);
              reset();
              setOpen(true);
            }}
          />
        </View>

        {/* LIST */}
        <View style={{ marginTop: 20, gap: 12 }}>
          {officials.map((item) => (
            <Card key={item.id}>
  <Text
    style={{
      fontWeight: '600',
      fontSize: 16,
      color: theme.colors.textPrimary,
    }}
  >
    {item.name}
  </Text>

  <Text
    style={{
      marginTop: theme.spacing.sm,
      color: theme.colors.textSecondary,
    }}
  >
    Role: {item.role}
  </Text>

  <Text
    style={{
      color: theme.colors.textSecondary,
    }}
  >
    Age: {item.age}
  </Text>

  <Text
    style={{
      color: theme.colors.textSecondary,
    }}
  >
    City: {item.city}
  </Text>

  <Text
    style={{
      color: theme.colors.textSecondary,
    }}
  >
    State: {item.state}
  </Text>

  <Text
    style={{
      color: theme.colors.textSecondary,
    }}
  >
    Mobile: {item.mobile}
  </Text>

  {/* ACTIONS */}
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: theme.spacing.sm,
      marginTop: theme.spacing.md,
    }}
  >
    <Button
      title="✏️"
      variant="ghost"
      size="sm"
      onPress={() => handleEdit(item)}
    />

    <Button
      title="🗑️"
      variant="ghost"
      size="sm"
      onPress={() => handleDelete(item.id)}
    />
  </View>
</Card>
          ))}
        </View>
      </ScrollView>

      {/* MODAL */}
      <CreateModal
        visible={open}
        onClose={() => {
          setOpen(false);
          setEditingId(null);
          reset();
        }}
      >
        <FormInput
  control={control}
  name="name"
  label="Official Name"
  placeholder="Enter official name"
  inputRef={nameRef}
  returnKeyType="next"
  onSubmitEditing={() => ageRef.current?.focus()}
  rules={{
    required: 'Official name is required',
    minLength: {
      value: 3,
      message: 'Minimum 3 characters required',
    },
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: 'Only alphabets allowed',
    },
  }}
/>



<FormInput
  control={control}
  name="age"
  label="Age"
  placeholder="Enter age"
  keyboardType="numeric"
  inputRef={ageRef}
  returnKeyType="next"
  onSubmitEditing={() => phoneRef.current?.focus()}
  rules={{
    required: 'Age is required',
    pattern: {
      value: /^[0-9]+$/,
      message: 'Only numbers allowed',
    },
    min: {
      value: 18,
      message: 'Minimum age is 18',
    },
    max: {
      value: 80,
      message: 'Maximum age is 80',
    },
  }}
/>

<FormInput
  control={control}
  name="phone"
  label="Phone"
  placeholder="Enter phone number"
  keyboardType="numeric"
  inputRef={phoneRef}
  returnKeyType="next"
  onSubmitEditing={() => addressRef.current?.focus()}
  rules={{
    required: 'Phone number is required',
    pattern: {
      value: /^[0-9]{10}$/,
      message: 'Enter valid 10 digit number',
    },
  }}
/>

<FormInput
  control={control}
  name="address"
  label="Address"
  placeholder="Enter address"
  inputRef={addressRef}
  returnKeyType="done"
  onSubmitEditing={handleSubmit(onSubmit)}
  rules={{
    required: 'Address is required',
    minLength: {
      value: 5,
      message: 'Address too short',
    },
  }}
/>
        

        {/* ROLE */}
        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, value } }) => (
            <Select
              label="Role"
              value={value}
              onChange={onChange}
              options={[
                { label: 'Referee', value: 'Referee' },
                { label: 'Judge', value: 'Judge' },
              ]}
            />
          )}
        />

        {/* GENDER */}
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              label="Gender"
              value={value}
              onChange={onChange}
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Other', value: 'other' },
              ]}
            />
          )}
        />

        <Button
          title={editingId !== null ? 'Update Official' : 'Create Official'}
          icon="checkmark"
          onPress={handleSubmit(onSubmit)}
        />
      </CreateModal>
    </SafeAreaView>
  );
}