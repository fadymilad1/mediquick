import { ENDPOINTS } from '../../../config/api';
import { apiClient } from '../../../services';
import { User } from '../../../types/models';

export async function loginUser(
  email: string,
  password: string,
): Promise<User> {
  const { data } = await apiClient.get<User[]>(ENDPOINTS.users, {
    params: { email, password },
  });
  const user = data[0];
  if (!user) {
    throw new Error('Invalid email or password');
  }
  return user;
}

export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<User> {
  const { data: existing } = await apiClient.get<User[]>(ENDPOINTS.users, {
    params: { email: payload.email },
  });
  if (existing.length > 0) {
    throw new Error('An account with this email already exists');
  }
  const { data } = await apiClient.post<User>(ENDPOINTS.users, payload);
  return data;
}
