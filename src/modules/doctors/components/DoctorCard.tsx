import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Card } from '../../../components';
import { useTheme } from '../../../hooks';
import { radius, spacing, typography } from '../../../theme';
import { Doctor } from '../../../types/models';

interface DoctorCardProps {
  doctor: Doctor;
  onPress: () => void;
}

export function DoctorCard({ doctor, onPress }: DoctorCardProps) {
  const { colors } = useTheme();

  return (
    <Card onPress={onPress} style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: doctor.image }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
            {doctor.name}
          </Text>
          <Text style={[styles.specialty, { color: colors.textSecondary }]}>
            {doctor.specialty}
          </Text>
          <View style={styles.ratingRow}>
            <Text style={[styles.rating, { color: colors.secondary }]}>
              ★ {doctor.rating.toFixed(1)}
            </Text>
            <Text style={[styles.slots, { color: colors.textSecondary }]}>
              {doctor.availableTimes?.length ?? 0} slots
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: radius.md,
    backgroundColor: '#E2E8F0',
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    ...typography.h3,
    marginBottom: 2,
  },
  specialty: {
    ...typography.bodySmall,
    marginBottom: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rating: {
    ...typography.bodySmall,
    fontWeight: '600',
  },
  slots: {
    ...typography.caption,
  },
});
