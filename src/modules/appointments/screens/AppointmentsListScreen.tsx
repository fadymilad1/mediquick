import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  EmptyState,
  ErrorState,
  LoadingSpinner,
  ScreenContainer,
} from '../../../components';
import { useTheme } from '../../../hooks';
import { spacing, typography } from '../../../theme';
import { AppointmentCard } from '../components/AppointmentCard';
import { useAppointmentsList } from '../hooks/useAppointments';

export function AppointmentsListScreen() {
  const { colors } = useTheme();
  const {
    appointments,
    loading,
    refreshing,
    error,
    refresh,
    retry,
    cancelAppointment,
  } = useAppointmentsList();
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const handleCancel = async (id: string) => {
    setCancellingId(id);
    try {
      await cancelAppointment(id);
    } catch (e) {
      Alert.alert(
        'Error',
        e instanceof Error ? e.message : 'Could not cancel appointment',
      );
    } finally {
      setCancellingId(null);
    }
  };

  if (loading && appointments.length === 0) {
    return (
      <ScreenContainer>
        <Text style={[styles.title, { color: colors.text }]}>My appointments</Text>
        <LoadingSpinner fullScreen />
      </ScreenContainer>
    );
  }

  if (error && appointments.length === 0) {
    return (
      <ScreenContainer>
        <ErrorState message={error} onRetry={retry} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer padded={false}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>My appointments</Text>
      </View>
      <FlatList
        data={appointments}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.list,
          appointments.length === 0 && styles.listEmpty,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={colors.primary}
          />
        }
        renderItem={({ item }) => (
          <AppointmentCard
            appointment={item}
            onCancel={handleCancel}
            cancelling={cancellingId === item.id}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="No appointments yet"
            message="Browse doctors and book your first visit"
          />
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    ...typography.h2,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  listEmpty: {
    flexGrow: 1,
  },
});
