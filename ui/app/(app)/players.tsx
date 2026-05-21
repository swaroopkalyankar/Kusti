import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';

import {
  createPlayer,
  deletePlayer,
  getPlayers,
  updatePlayer
} from '@/services/playerService';



import { SafeAreaView } from 'react-native-safe-area-context';

import { useForm } from 'react-hook-form';

import CreateModal from '@/components/dashboard/CreateModal';

import FormInput from '@/components/Form/FormInput';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import RadioGroup from '@/components/ui/RadioGroup';

import { useTheme } from '@/theme/themeContext';

export default function PlayersScreen() {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      age: '',
      gender: 'male',
      city: '',
      state: '',
      mobile: '',
      weight: '',
      category: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const gender = watch('gender');

  const ageRef = useRef<any>(null);
  const weightRef = useRef<any>(null);
  const categoryRef = useRef<any>(null);
  const cityRef = useRef<any>(null);
  const stateRef = useRef<any>(null);
  const mobileRef = useRef<any>(null);

  useEffect(() => {
  const unsubscribe = navigation.addListener('blur', () => {
    setOpen(false);
    setEditingId(null);
  });

  return unsubscribe;
}, [navigation]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const data = await getPlayers();
      setPlayers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const playerData = {
        name: data.name,
        age: Number(data.age),
        gender: data.gender,
        city: data.city,
        state: data.state,
        mobile: data.mobile,
        weight: Number(data.weight),
        category: data.category,
      };

      if (editingId !== null) {
        await updatePlayer(editingId, playerData);
      } else {
        await createPlayer(playerData);
      }

      await fetchPlayers();

      reset({
        name: '',
        age: '',
        gender: 'male',
        city: '',
        state: '',
        mobile: '',
        weight: '',
        category: '',
      });

      setEditingId(null);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setEditingId(null);

    reset({
      name: '',
      age: '',
      gender: 'male',
      city: '',
      state: '',
      mobile: '',
      weight: '',
      category: '',
    });
  };

  
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
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
            Players
          </Text>

          <Button
title="Add"
    size="sm"
    icon="person-add"
  onPress={() => {
    setEditingId(null);
    reset({
      name: '',
      age: '',
      gender: 'male',
      city: '',
      state: '',
      mobile: '',
      weight: '',
      category: '',
    });
    setOpen(true);
  }}
/>
        </View>

        {/* Players List */}
        {/* Players List */}
<View
  style={{
    gap: 16,
  }}
>
  {players.map((player, index) => (
    <Card
  key={player.id ?? index}
  style={{
    borderRadius: 22,
    padding: 0,
    backgroundColor: theme.colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  }}
>
      <View
        style={{
          padding: 24,
          borderRadius: 18,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* LEFT INFO */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: theme.colors.textPrimary,
              marginBottom: 10,
            }}
          >
            {player.name}
          </Text>

          <Text style={{ color: theme.colors.textSecondary }}>
            Age: {player.age} • Gender: {player.gender}
          </Text>

          <Text
            style={{
              color: theme.colors.textSecondary,
              marginTop: 4,
            }}
          >
            Weight: {player.weight} kg • Category: {player.category}
          </Text>

          <Text
            style={{
              color: theme.colors.textSecondary,
              marginTop: 4,
            }}
          >
            {player.city}, {player.state}
          </Text>

          <Text
            style={{
              color: theme.colors.textSecondary,
              marginTop: 4,
            }}
          >
            Mobile: {player.mobile}
          </Text>
        </View>

        {/* ACTIONS */}
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginLeft: 20,
          }}
        >
          <Button
            title="Edit"
            size="sm"
            onPress={() => {
              setEditingId(player.id);

              reset({
                name: player.name ?? '',
                age: String(player.age ?? ''),
                gender: player.gender ?? 'male',
                city: player.city ?? '',
                state: player.state ?? '',
                mobile: player.mobile ?? '',
                weight: String(player.weight ?? ''),
                category: player.category ?? '',
              });

              setOpen(true);
            }}
          />

          <Button
            title="Delete"
            variant="danger"
            size="sm"
            onPress={async () => {
              try {
                await deletePlayer(player.id);

                setPlayers((prev) =>
                  prev.filter((p) => p.id !== player.id)
                );
              } catch (error) {
                console.log('Delete error:', error);
              }
            }}
          />
        </View>
      </View>
    </Card>
  ))}
</View>
      </ScrollView>

      {/* Modal */}
      <CreateModal
  visible={open}
  onClose={handleCloseModal}
  title="Create Player"
>
        <FormInput
  control={control}
  name="name"
  label="Player Name"
  placeholder="Enter player name"

  returnKeyType="next"
  onSubmitEditing={() => {
    ageRef.current?.focus();
  }}

  rules={{
    required: 'Player name is required',
    pattern: {
      value: /^[A-Za-z ]+$/,
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
  onSubmitEditing={() => weightRef.current?.focus()}
  rules={{
    required: 'Age is required',
    min: {
      value: 5,
      message: 'Invalid age',
    },
    max: {
      value: 80,
      message: 'Invalid age',
    },
  }}
/>

        <RadioGroup
          label="Gender"
          value={gender}
          onChange={(value: any) =>
            setValue('gender', value)
          }
          options={[
            {
              label: 'Male',
              value: 'male',
            },
            {
              label: 'Female',
              value: 'female',
            },
          ]}
        />

        <FormInput
  control={control}
  name="weight"
  label="Weight"
  placeholder="Enter weight"
  keyboardType="numeric"
  inputRef={weightRef}
  returnKeyType="next"
  onSubmitEditing={() => categoryRef.current?.focus()}
  rules={{
    required: 'Weight is required',
  }}
/>

<FormInput
  control={control}
  name="category"
  label="Category"
  placeholder="Enter category"
  inputRef={categoryRef}
  returnKeyType="next"
  onSubmitEditing={() => cityRef.current?.focus()}
  rules={{
    required: 'Category is required',
  }}
/>

        <FormInput
  control={control}
  name="city"
  label="City"
  placeholder="Enter city"

  inputRef={cityRef}
  returnKeyType="next"
  onSubmitEditing={() => {
    setTimeout(() => {
      stateRef.current?.focus();
    }, 50);
  }}

  rules={{
    required: 'City is required',
    pattern: {
      value: /^[A-Za-z ]+$/,
      message: 'Only alphabets allowed',
    },
  }}
/>

        <FormInput
  control={control}
  name="state"
  label="State"
  placeholder="Enter state"

  inputRef={stateRef}
  returnKeyType="next"
  onSubmitEditing={() => {
    setTimeout(() => {
      mobileRef.current?.focus();
    }, 50);
  }}

  rules={{
    required: 'State is required',
    pattern: {
      value: /^[A-Za-z ]+$/,
      message: 'Only alphabets allowed',
    },
  }}
/>

       <FormInput
  control={control}
  name="mobile"
  label="Mobile Number"
  placeholder="Enter mobile number"
  keyboardType="numeric"

  inputRef={mobileRef}
  returnKeyType="done"
  onSubmitEditing={handleSubmit(onSubmit)}

  rules={{
    required: 'Mobile number is required',
    pattern: {
      value: /^[0-9]{10}$/,
      message: 'Must be exactly 10 digits',
    },
  }}
/>

        <Button
          title={
            editingId !== null
              ? 'Update Player'
              : 'Create Player'
          }
          icon="checkmark"
          onPress={handleSubmit(onSubmit)}
        />
      </CreateModal>
    </SafeAreaView>
  );
}