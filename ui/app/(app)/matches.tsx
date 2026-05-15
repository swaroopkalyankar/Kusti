import { useEffect, useRef, useState } from 'react';

import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useForm } from 'react-hook-form';

import CreateModal from '@/components/dashboard/CreateModal';
import FormInput from '@/components/Form/FormInput';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import {
  createMatch,
  deleteMatch,
  getMatches,
  updateMatch
} from '@/services/matchService';

import { useTheme } from '@/theme/themeContext';

import DateTimePicker from '@react-native-community/datetimepicker';
export default function MatchesScreen() {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
   const [editingId, setEditingId] = useState<number | null>(null);

   useEffect(() => {
  setOpen(false);
  setEditingId(null);
}, []);

  const [matches, setMatches] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [officials, setOfficials] = useState<any[]>([]);
  const [showDate, setShowDate] = useState(false);
 
  const [tournaments, setTournaments] = useState<any[]>([]);


  const wrestlerARef = useRef<any>(null);
const wrestlerBRef = useRef<any>(null);
const officialRef = useRef<any>(null);
const tournamentRef = useRef<any>(null);
const venueRef = useRef<any>(null);

  const {
  control,
  handleSubmit,
  reset,
  setValue,
  watch,
} = useForm({
  defaultValues: {
    wrestlerA: '',
    wrestlerB: '',
    official: '',
    matchDate: new Date(),
    venue: '',
    tournamentId: '',
  },
  mode: 'onChange',
});


  
  const matchDate = watch('matchDate');

  useEffect(() => {
    setPlayers([]);
    setOfficials([]);
    setTournaments([]);
  }, []);
const loadMatches = async () => {
  try {
    const data = await getMatches();
    setMatches(data);
  } catch (err) {
    console.log('Load matches error:', err);
  }
};

useEffect(() => {
  loadMatches();
}, []);

 const onSubmit = async (data: any) => {
  try {
    const payload = {
      wrestlerA: data.wrestlerA,
      wrestlerB: data.wrestlerB,
      official: data.official,
      venue: data.venue,
      tournamentId: data.tournamentId,
      matchDateTime: data.matchDate,
      status: 'upcoming',
    };

    if (editingId !== null) {
      await updateMatch(editingId, payload);
    } else {
      await createMatch(payload);
    }

    await loadMatches();

    reset({
      wrestlerA: '',
      wrestlerB: '',
      official: '',
      matchDate: new Date(),
      venue: '',
      tournamentId: '',
    });

    setOpen(false);
    setEditingId(null);
  } catch (err) {
    console.log('Match submit error:', err);
  }
};

  const navigation = useNavigation();

useFocusEffect(
  useCallback(() => {
    // when screen comes into focus → reset modal state
    setOpen(false);
    setEditingId(null);

    return () => {
      // when leaving screen → FORCE CLOSE MODAL
      setOpen(false);
      setEditingId(null);
    };
  }, [])
);

// extra safety (VERY IMPORTANT for Expo Router tabs)
useEffect(() => {
  const unsubscribe = navigation.addListener('blur', () => {
    setOpen(false);
    setEditingId(null);
  });

  return unsubscribe;
}, [navigation]);

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
        {/* HEADER */}
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
            Matches
          </Text>

          <Button
            title="Create"
            size="sm"
            icon="trophy"
            onPress={() => {
              reset({
                wrestlerA: '',
                wrestlerB: '',
                official: '',
                matchDate: new Date(),
              });

              setEditingId(null);
              setOpen(true);
            }}
          />
        </View>

        {/* MATCH LIST */}
        <View style={{ gap: theme.spacing.md }}>
          {matches.map((m, index) => (
            <Card key={index}>
              <Text
                style={{
                  fontWeight: '600',
                  color: theme.colors.textPrimary,
                }}
              >
                {m.wrestlerA || 'Player A'} vs {m.wrestlerB || 'Player B'}
              </Text>

              <Text
                style={{
                  marginTop: theme.spacing.sm,
                  color: theme.colors.textSecondary,
                }}
              >
                Official: {m.official || 'Not assigned'}
              </Text>

              <Text
                style={{
                  color: theme.colors.textSecondary,
                }}
              >
                Date:{' '}
                {m.matchDateTime
                  ? new Date(m.matchDateTime).toDateString()
                  : ''}
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
                  onPress={() => {
                    reset(m);
                    setEditingId(m.id);
                    setOpen(true);
                  }}
                />

                <Button
                  title="🗑️"
                  variant="ghost"
                  size="sm"
                  onPress={async() => {
                    await deleteMatch(m.id);
await loadMatches();
                  }}
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
  }}
  title={editingId !== null ? 'Update Match' : 'Create Match'}
>
        {/* Wrestler A */}
        <FormInput
  control={control}
  name="wrestlerA"
  label="Wrestler A"
  placeholder="Enter Wrestler A"
  inputRef={wrestlerARef}
  returnKeyType="next"
  onSubmitEditing={() => wrestlerBRef.current?.focus()}
  rules={{
    required: 'Wrestler A is required',
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

        {/* Wrestler B */}
        <FormInput
  control={control}
  name="wrestlerB"
  label="Wrestler B"
  placeholder="Enter Wrestler B"
  inputRef={wrestlerBRef}
  returnKeyType="next"
  onSubmitEditing={() => officialRef.current?.focus()}
  rules={{
    required: 'Wrestler B is required',
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: 'Only alphabets allowed',
    },
  }}
/>

        {/* Official */}
        <FormInput
  control={control}
  name="official"
  label="Official"
  placeholder="Enter Official"
  inputRef={officialRef}
  returnKeyType="next"
  onSubmitEditing={() => tournamentRef.current?.focus()}
  rules={{
    required: 'Official is required',
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: 'Only alphabets allowed',
    },
  }}
/>


        <FormInput
  control={control}
  name="tournamentId"
  label="Tournament"
  placeholder="Enter tournament name"
  inputRef={tournamentRef}
  returnKeyType="next"
  onSubmitEditing={() => venueRef.current?.focus()}
  rules={{
    required: 'Tournament is required',
    minLength: {
      value: 2,
      message: 'Tournament name too short',
    },
  }}
/>


        <FormInput
  control={control}
  name="venue"
  label="Venue / Ground"
  placeholder="Enter venue"
  inputRef={venueRef}
  returnKeyType="done"
  onSubmitEditing={handleSubmit(onSubmit)}
  rules={{
    required: 'Venue is required',
    minLength: {
      value: 2,
      message: 'Venue too short',
    },
  }}
/>

        {/* DATE */}
        <Text style={{ marginTop: 10, marginBottom: 5 }}>
  Match Date & Time
</Text>

{Platform.OS === "web" ? (
  <input
    type="datetime-local"
    value={
      watch("matchDate")
        ? new Date(watch("matchDate")).toISOString().slice(0, 16)
        : ""
    }
    onChange={(e) => {
      setValue("matchDate", new Date(e.target.value));
    }}
    style={{
      padding: 12,
      border: "1px solid #ddd",
      borderRadius: 6,
      width: "100%",
    }}
  />
) : (
  <>
    <Pressable
      style={{
        padding: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 6,
      }}
      onPress={() => setShowDate(true)}
    >
      <Text>
        {watch("matchDate")
          ? new Date(watch("matchDate")).toLocaleString()
          : "Select Date & Time"}
      </Text>
    </Pressable>

    {showDate && (
      <DateTimePicker
        value={watch("matchDate") || new Date()}
        mode="datetime"
        display="default"
        onChange={(event, selectedDate) => {
          // IMPORTANT: handle cancel properly
          if (event.type === "dismissed") {
            setShowDate(false);
            return;
          }

          setShowDate(false);

          if (selectedDate) {
            setValue("matchDate", selectedDate);
          }
        }}
      />
    )}
  </>
)}
        {/* SUBMIT */}
        <Button
          title={editingId !== null ? 'Update Match' : 'Create Match'}
          icon="checkmark"
          onPress={handleSubmit(onSubmit)}
        />
      </CreateModal>
    </SafeAreaView>
  );
}