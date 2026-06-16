import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button, Card } from '../../../components';
import { useTheme } from '../../../hooks';
import { spacing, typography } from '../../../theme';
import { AppointmentWithDoctor } from '../../../types/models';
import { formatAppointmentDate } from '../../../utils';

interface AppointmentCardProps {
  appointment: AppointmentWithDoctor;
  onCancel: (id: string) => Promise<void>;
  cancelling?: boolean;
}

export function AppointmentCard({
  appointment,
  onCancel,
  cancelling,
}: AppointmentCardProps) {
  const { colors } = useTheme();

  const handleCancel = () => {
    Alert.alert(
      'Cancel appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'Keep', style: 'cancel' },
        {
          text: 'Cancel appointment',
          style: 'destructive',
          onPress: () => onCancel(appointment.id),
        },
      ],
    );
  };

  return (
    <Card style={styles.card}>
      <Text style={[styles.doctor, { color: colors.text }]}>
        {appointment.doctor?.name ?? 'Doctor'}
      </Text>
      <Text style={[styles.specialty, { color: colors.textSecondary }]}>
        {appointment.doctor?.specialty ?? ''}
      </Text>
      <View style={styles.meta}>
        <Text style={[styles.date, { color: colors.primary }]}>
          {formatAppointmentDate(appointment.date)}
        </Text>
        <Text style={[styles.time, { color: colors.text }]}>{appointment.time}</Text>
      </View>
      <View
        style={[
          styles.badge,
          {
            backgroundColor:
              appointment.status === 'scheduled'
                ? `${colors.success}22`
                : colors.border,
          },
        ]}>
        <Text
          style={[
            styles.status,
            {
              color:
                appointment.status === 'scheduled'
                  ? colors.success
                  : colors.textSecondary,
            },
          ]}>
          {appointment.status}
        </Text>
      </View>
      {appointment.status === 'scheduled' ? (
        <Button
          title="Cancel"
          variant="outline"
          onPress={handleCancel}
          loading={cancelling}
          style={styles.cancelBtn}
        />
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  doctor: {
    ...typography.h3,
    marginBottom: 2,
  },
  specialty: {
    ...typography.bodySmall,
    marginBottom: spacing.md,
  },
  meta: {
    marginBottom: spacing.sm,
  },
  date: {
    ...typography.bodySmall,
    fontWeight: '600',
  },
  time: {
    ...typography.body,
    marginTop: 2,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  status: {
    ...typography.caption,
    textTransform: 'capitalize',
  },
  cancelBtn: {
    marginTop: spacing.xs,
  },
});
