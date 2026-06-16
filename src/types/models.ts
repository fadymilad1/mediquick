export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  about: string;
  availableTimes: string[];
}

export type AppointmentStatus = 'scheduled' | 'cancelled' | 'completed';

export interface Appointment {
  id: string;
  doctorId: string;
  userId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
}

export interface AppointmentWithDoctor extends Appointment {
  doctor?: Doctor;
}

export interface CreateAppointmentPayload {
  doctorId: string;
  userId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
}
