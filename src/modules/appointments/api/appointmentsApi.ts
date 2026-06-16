import { ENDPOINTS } from '../../../config/api';
import { apiClient } from '../../../services';
import {
  Appointment,
  CreateAppointmentPayload,
} from '../../../types/models';

export async function getAppointments(userId?: string): Promise<Appointment[]> {
  const { data } = await apiClient.get<Appointment[]>(ENDPOINTS.appointments, {
    params: userId ? { userId } : undefined,
  });
  return data;
}

export async function createAppointment(
  payload: CreateAppointmentPayload,
): Promise<Appointment> {
  const { data } = await apiClient.post<Appointment>(
    ENDPOINTS.appointments,
    payload,
  );
  return data;
}

export async function deleteAppointment(id: string): Promise<void> {
  await apiClient.delete(`${ENDPOINTS.appointments}/${id}`);
}
