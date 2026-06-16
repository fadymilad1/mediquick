import { useCallback, useEffect, useMemo, useState } from 'react';
import { Doctor } from '../../../types/models';
import { useDebounce } from '../../../hooks';
import { getDoctorById, getDoctors } from '../api/doctorsApi';

export function useDoctorsList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const fetchDoctors = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load doctors');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) {
      return doctors;
    }
    return doctors.filter(
      d =>
        d.name.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q),
    );
  }, [doctors, debouncedSearch]);

  return {
    doctors: filtered,
    loading,
    refreshing,
    error,
    search,
    setSearch,
    refresh: () => fetchDoctors(true),
    retry: () => fetchDoctors(),
  };
}

export function useDoctorDetails(doctorId: string) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctor = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDoctorById(doctorId);
      setDoctor(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load doctor');
    } finally {
      setLoading(false);
    }
  }, [doctorId]);

  useEffect(() => {
    fetchDoctor();
  }, [fetchDoctor]);

  return { doctor, loading, error, retry: fetchDoctor };
}
