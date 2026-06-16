import { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from '../../../store';
import {
  Appointment,
  AppointmentWithDoctor,
  CreateAppointmentPayload,
} from '../../../types/models';
import { getDoctorById } from '../../doctors/api/doctorsApi';
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
} from '../api/appointmentsApi';

export function useAppointmentsList() {
  const userId = useAuthStore(state => state.user?.id);
  const [appointments, setAppointments] = useState<AppointmentWithDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const enrichWithDoctors = async (
    items: Appointment[],
  ): Promise<AppointmentWithDoctor[]> => {
    return Promise.all(
      items.map(async apt => {
        try {
          const doctor = await getDoctorById(apt.doctorId);
          return { ...apt, doctor };
        } catch {
          return apt;
        }
      }),
    );
  };

  const fetchAppointments = useCallback(
    async (isRefresh = false) => {
      if (!userId) {
        return;
      }
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      try {
        const data = await getAppointments(userId);
        const enriched = await enrichWithDoctors(
          data.filter(a => a.status !== 'cancelled'),
        );
        setAppointments(enriched);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : 'Failed to load appointments',
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [userId],
  );

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const cancelAppointment = useCallback(
    async (id: string) => {
      const previous = appointments;
      setAppointments(prev => prev.filter(a => a.id !== id));
      try {
        await deleteAppointment(id);
      } catch (e) {
        setAppointments(previous);
        throw e;
      }
    },
    [appointments],
  );

  return {
    appointments,
    loading,
    refreshing,
    error,
    refresh: () => fetchAppointments(true),
    retry: () => fetchAppointments(),
    cancelAppointment,
  };
}

export function useBookAppointment() {
  const userId = useAuthStore(state => state.user?.id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const book = useCallback(
    async (payload: Omit<CreateAppointmentPayload, 'userId' | 'status'>) => {
      if (!userId) {
        throw new Error('You must be logged in to book');
      }
      setLoading(true);
      setError(null);
      try {
        const appointment = await createAppointment({
          ...payload,
          userId,
          status: 'scheduled',
        });
        return appointment;
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Booking failed';
        setError(msg);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [userId],
  );

  return { book, loading, error };
}
