import { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm } from 'react-hook-form';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CreateModal from '@/components/dashboard/CreateModal';
import FormInput from '@/components/Form/FormInput';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

import {
  createTournament,
  deleteTournament,
  getTournaments,
  updateTournament,
} from '@/services/tournamentService';

import { useTheme } from '@/theme/themeContext';

export default function TournamentScreen() {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [tournaments, setTournaments] = useState<any[]>([]);

  const nameRef = useRef<any>(null);
  const organizerRef = useRef<any>(null);
  const venueRef = useRef<any>(null);
  const cityRef = useRef<any>(null);
  const stateRef = useRef<any>(null);

  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      organizer: '',
      startDate: new Date(),
      endDate: new Date(),
      city: '',
      state: '',
      venue: '',
    },
    mode: 'onChange'
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const loadTournaments = async () => {
    try {
      const data = await getTournaments();
      setTournaments(data);
    } catch (error) {
      console.log('Load tournaments error:', error);
    }
  };

  useEffect(() => {
    loadTournaments();
  }, []);

  const handleCloseModal = () => {
    setOpen(false);

    setEditingId(null);

    reset({
      name: '',
      organizer: '',
      startDate: new Date(),
      endDate: new Date(),
      city: '',
      state: '',
      venue: '',
    });
  };

  const handleDeleteTournament = async (id: number) => {
    try {
      await deleteTournament(id);

      await loadTournaments();
    } catch (error) {
      console.log('Delete tournament error:', error);
    }
  };

  const handleEditTournament = (item: any) => {
    setEditingId(item.id);

    reset({
      name: item.name || '',
      organizer: item.organizer || '',
      venue: item.venue || '',
      city: item.city || '',
      state: item.state || '',
      startDate: item.start_date
        ? new Date(item.start_date)
        : new Date(),
      endDate: item.end_date
        ? new Date(item.end_date)
        : new Date(),
    });

    setOpen(true);
  };

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        name: data.name,
        organizer: data.organizer,
        venue: data.venue,
        city: data.city,
        state: data.state,

        start_date: startDate
          ? new Date(startDate)
              .toISOString()
              .split('T')[0]
          : null,

        end_date: endDate
          ? new Date(endDate)
              .toISOString()
              .split('T')[0]
          : null,
      };

      // UPDATE
      if (editingId !== null) {
        await updateTournament(editingId, payload);

        await loadTournaments();
      }

      // CREATE
      else {
        const created = await createTournament(payload);

        setTournaments((prev) => [
          created,
          ...prev,
        ]);
      }

      handleCloseModal();
    } catch (error) {
      console.log(
        'Tournament submit error:',
        error
      );
    }
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
            Tournaments
          </Text>

          <Button
  title="Create"
  size="sm"
  icon="trophy"
  onPress={() => {
    setEditingId(null);

    reset({
      name: '',
      organizer: '',
      startDate: new Date(),
      endDate: new Date(),
      city: '',
      state: '',
      venue: '',
    });

    setOpen(true);
  }}
/>
        </View>

        {/* LIST */}
        <View style={{ gap: theme.spacing.md }}>
          {tournaments.map((item) => (
            <Card key={item.id}>
              <View>
                <Text
                  style={{
                    fontWeight: '600',
                    color: theme.colors.textPrimary,
                  }}
                >
                  {item.name}
                </Text>

                <Text
                  style={{
                    color: theme.colors.textSecondary,
                  }}
                >
                  Organizer: {item.organizer}
                </Text>

                <Text
                  style={{
                    color: theme.colors.textSecondary,
                  }}
                >
                  Venue: {item.venue}
                </Text>

                <Text
                  style={{
                    color: theme.colors.textSecondary,
                  }}
                >
                  Date:{' '}
                  {item.start_date
                    ? new Date(
                        item.start_date
                      ).toDateString()
                    : 'N/A'}
                  {' → '}
                  {item.end_date
                    ? new Date(
                        item.end_date
                      ).toDateString()
                    : 'N/A'}
                </Text>

                <Text
                  style={{
                    color: theme.colors.textSecondary,
                  }}
                >
                  Location: {item.city}, {item.state}
                </Text>

                {/* ACTIONS */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    gap: 10,
                    marginTop: 10,
                  }}
                >
                  {/* EDIT */}
                  <Button
                 title="✏️"
                 variant="ghost"
                 size="sm"
                 onPress={() => handleEditTournament(item)}
                  />

                  {/* DELETE */}
                  <Button
                    title="🗑️"
                    variant="ghost"
                    size="sm"
                    onPress={() =>
                      handleDeleteTournament(item.id)
                    }
                  />
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>

      {/* MODAL */}
      <CreateModal
  visible={open}
  onClose={handleCloseModal}
  title={editingId !== null ? 'Update Tournament' : 'Create Tournament'}
>
        {/* Tournament Name */}
        <FormInput
  control={control}
  name="name"
  label="Tournament Name"
  placeholder="Enter tournament name"
  inputRef={nameRef}
  returnKeyType="next"
  onSubmitEditing={() => organizerRef.current?.focus()}
  rules={{
    required: 'Tournament name is required',
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


        {/* Organizer */}
        <FormInput
  control={control}
  name="organizer"
  label="Organizer"
  placeholder="Enter organizer name"
  inputRef={organizerRef}
  returnKeyType="next"
  onSubmitEditing={() => venueRef.current?.focus()}
  rules={{
    required: 'Organizer name is required',
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: 'Only alphabets allowed',
    },
  }}
/>

        {/* START DATE */}
        <Text
          style={{
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          Start Date
        </Text>

        {Platform.OS === 'web' ? (
          <input
            type="date"
            value={
              startDate
                ? new Date(startDate)
                    .toISOString()
                    .split('T')[0]
                : ''
            }
            onChange={(e) =>
              setValue(
                'startDate',
                new Date(e.target.value)
              )
            }
            style={{
              padding: 10,
              borderRadius: 8,
              border: '1px solid gray',
              width: '100%',
            }}
          />
        ) : (
          <>
            <Button
              title={
                startDate
                  ? new Date(
                      startDate
                    ).toDateString()
                  : 'Select Start Date'
              }
              onPress={() =>
                setShowStartDate(true)
              }
            />

            {showStartDate && (
              <DateTimePicker
                value={startDate || new Date()}
                mode="date"
                onChange={(event, date) => {
                  setShowStartDate(false);

                  if (date) {
                    setValue(
                      'startDate',
                      date
                    );
                  }
                }}
              />
            )}
          </>
        )}

        {/* END DATE */}
        <Text
          style={{
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          End Date
        </Text>

        {Platform.OS === 'web' ? (
          <input
            type="date"
            value={
              endDate
                ? new Date(endDate)
                    .toISOString()
                    .split('T')[0]
                : ''
            }
            onChange={(e) =>
              setValue(
                'endDate',
                new Date(e.target.value)
              )
            }
            style={{
              padding: 10,
              borderRadius: 8,
              border: '1px solid gray',
              width: '100%',
            }}
          />
        ) : (
          <>
            <Button
              title={
                endDate
                  ? new Date(
                      endDate
                    ).toDateString()
                  : 'Select End Date'
              }
              onPress={() =>
                setShowEndDate(true)
              }
            />

            {showEndDate && (
              <DateTimePicker
                value={endDate || new Date()}
                mode="date"
                onChange={(event, date) => {
                  setShowEndDate(false);

                  if (date) {
                    setValue(
                      'endDate',
                      date
                    );
                  }
                }}
              />
            )}
          </>
        )}

        {/* VENUE */}
        <FormInput
  control={control}
  name="venue"
  label="Venue"
  placeholder="Enter venue"
  inputRef={venueRef}
  returnKeyType="next"
  onSubmitEditing={() => cityRef.current?.focus()}
  rules={{
    required: 'Venue is required',
    minLength: {
      value: 2,
      message: 'Venue too short',
    },
  }}
/>

        {/* CITY */}
        <FormInput
  control={control}
  name="city"
  label="City"
  placeholder="Enter city"
  inputRef={cityRef}
  returnKeyType="next"
  onSubmitEditing={() => stateRef.current?.focus()}
  rules={{
    required: 'City is required',
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: 'Only alphabets allowed',
    },
  }}
/>

        {/* STATE */}
        <FormInput
  control={control}
  name="state"
  label="State"
  placeholder="Enter state"
  inputRef={stateRef}
  returnKeyType="done"
  onSubmitEditing={handleSubmit(onSubmit)}
  rules={{
    required: 'State is required',
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: 'Only alphabets allowed',
    },
  }}
/>
        {/* SUBMIT */}
        <Button
          title={
            editingId !== null
              ? 'Update Tournament'
              : 'Create Tournament'
          }
          icon="checkmark"
          onPress={handleSubmit(onSubmit)}
        />
      </CreateModal>
    </SafeAreaView>
  );
}