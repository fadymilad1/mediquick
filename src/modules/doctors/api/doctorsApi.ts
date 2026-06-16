import { ENDPOINTS } from '../../../config/api';
import { apiClient } from '../../../services';
import { Doctor } from '../../../types/models';

export async function getDoctors(): Promise<Doctor[]> {
  const { data } = await apiClient.get<Doctor[]>(ENDPOINTS.doctors);
  return data;
}

export async function getDoctorById(id: string): Promise<Doctor> {
  const { data } = await apiClient.get<Doctor>(`${ENDPOINTS.doctors}/${id}`);
  return data;
}
