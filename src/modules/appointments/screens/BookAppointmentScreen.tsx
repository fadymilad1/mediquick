import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, ScreenContainer } from '../../../components';
import { useTheme } from '../../../hooks';
import { HomeStackParamList } from '../../../navigation/types';
import { radius, spacing, typography } from '../../../theme';
import { getUpcomingDates } from '../../../utils';
import { useBookAppointment } from '../hooks/useAppointments';

type Props = NativeStackScreenProps<HomeStackParamList, 'BookAppointment'>;

export function BookAppointmentScreen({ navigation, route }: Props) {
  const { doctorId, doctorName, availableTimes } = route.params;
  const { colors } = useTheme();
  const { book, loading, error } = useBookAppointment();
  const dates = getUpcomingDates(14);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(availableTimes[0] ?? '');

  const handleBook = async () => {
    if (!selectedTime) {
      Alert.alert('Select a time', 'Please choose an available time slot.');
      return;
    }
    try {
      await book({
        doctorId,
        date: selectedDate,
        time: selectedTime,
      });
      Alert.alert('Booked!', 'Your appointment has been scheduled.', [
        {
          text: 'OK',
          onPress: () => navigation.popToTop(),
        },
      ]);
    } catch {
      // error in hook
    }
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: colors.text }]}>Book with</Text>
        <Text style={[styles.doctor, { color: colors.primary }]}>{doctorName}</Text>

        <Text style={[styles.section, { color: colors.text }]}>Select date</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroll}>
          {dates.map(date => {
            const selected = date === selectedDate;
            return (
              <Pressable
                key={date}
                onPress={() => setSelectedDate(date)}
                style={[
                  styles.dateChip,
                  {
                    backgroundColor: selected ? colors.primary : colors.surface,
                    borderColor: selected ? colors.primary : colors.border,
                  },
                ]}>
                <Text
                  style={[
                    styles.dateText,
                    { color: selected ? '#FFF' : colors.text },
                  ]}>
                  {new Date(date).toLocaleDateString(undefined, {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={[styles.section, { color: colors.text }]}>Select time</Text>
        <View style={styles.timesGrid}>
          {availableTimes.map(time => {
            const selected = time === selectedTime;
            return (
              <Pressable
                key={time}
                onPress={() => setSelectedTime(time)}
                style={[
                  styles.timeChip,
                  {
                    backgroundColor: selected ? colors.secondary : colors.surface,
                    borderColor: selected ? colors.secondary : colors.border,
                  },
                ]}>
                <Text
                  style={[
                    styles.timeText,
                    { color: selected ? '#FFF' : colors.text },
                  ]}>
                  {time}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {error ? (
          <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
        ) : null}

        <Button title="Confirm booking" onPress={handleBook} loading={loading} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.body,
    marginTop: spacing.md,
  },
  doctor: {
    ...typography.h2,
    marginBottom: spacing.lg,
  },
  section: {
    ...typography.h3,
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  dateScroll: {
    marginBottom: spacing.md,
  },
  dateChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    marginRight: spacing.sm,
  },
  dateText: {
    ...typography.bodySmall,
    fontWeight: '600',
  },
  timesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  timeChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  timeText: {
    ...typography.bodySmall,
    fontWeight: '600',
  },
  error: {
    ...typography.bodySmall,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
});
