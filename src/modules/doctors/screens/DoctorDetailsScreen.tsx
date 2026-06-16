import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  ErrorState,
  LoadingSpinner,
  ScreenContainer,
} from '../../../components';
import { useTheme } from '../../../hooks';
import { HomeStackParamList } from '../../../navigation/types';
import { radius, spacing, typography } from '../../../theme';
import { useDoctorDetails } from '../hooks/useDoctors';

type Props = NativeStackScreenProps<HomeStackParamList, 'DoctorDetails'>;

export function DoctorDetailsScreen({ navigation, route }: Props) {
  const { doctorId } = route.params;
  const { colors } = useTheme();
  const { doctor, loading, error, retry } = useDoctorDetails(doctorId);

  if (loading) {
    return (
      <ScreenContainer>
        <LoadingSpinner fullScreen />
      </ScreenContainer>
    );
  }

  if (error || !doctor) {
    return (
      <ScreenContainer>
        <ErrorState message={error ?? 'Doctor not found'} onRetry={retry} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer padded={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: doctor.image }} style={styles.hero} />
        <View style={styles.body}>
          <Text style={[styles.name, { color: colors.text }]}>{doctor.name}</Text>
          <Text style={[styles.specialty, { color: colors.secondary }]}>
            {doctor.specialty}
          </Text>
          <View style={styles.ratingBadge}>
            <Text style={[styles.rating, { color: colors.text }]}>
              ★ {doctor.rating.toFixed(1)} rating
            </Text>
          </View>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
          <Text style={[styles.about, { color: colors.textSecondary }]}>
            {doctor.about}
          </Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Available times
          </Text>
          <View style={styles.timesGrid}>
            {(doctor.availableTimes ?? []).map(time => (
              <View
                key={time}
                style={[styles.timeChip, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.timeText, { color: colors.text }]}>{time}</Text>
              </View>
            ))}
          </View>

          <Button
            title="Book appointment"
            onPress={() =>
              navigation.navigate('BookAppointment', {
                doctorId: doctor.id,
                doctorName: doctor.name,
                availableTimes: doctor.availableTimes ?? [],
              })
            }
            style={styles.bookBtn}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    height: 240,
    backgroundColor: '#E2E8F0',
  },
  body: {
    padding: spacing.md,
  },
  name: {
    ...typography.h1,
    fontSize: 24,
  },
  specialty: {
    ...typography.body,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  ratingBadge: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  rating: {
    ...typography.bodySmall,
    fontWeight: '600',
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  about: {
    ...typography.body,
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
    fontWeight: '500',
  },
  bookBtn: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
});
