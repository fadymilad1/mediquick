import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  DoctorCardSkeleton,
  EmptyState,
  ErrorState,
  Input,
  ScreenContainer,
} from '../../../components';
import { useTheme } from '../../../hooks';
import { HomeStackParamList } from '../../../navigation/types';
import { spacing, typography } from '../../../theme';
import { DoctorCard } from '../components/DoctorCard';
import { useDoctorsList } from '../hooks/useDoctors';

type Props = NativeStackScreenProps<HomeStackParamList, 'DoctorsList'>;

export function DoctorsListScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const {
    doctors,
    loading,
    refreshing,
    error,
    search,
    setSearch,
    refresh,
    retry,
  } = useDoctorsList();

  if (error && !loading && doctors.length === 0) {
    return (
      <ScreenContainer>
        <ErrorState message={error} onRetry={retry} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer padded={false}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Find a doctor</Text>
        <View style={styles.searchWrap}>
          <Input
            placeholder="Search by name or specialty..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>
      </View>

      {loading && doctors.length === 0 ? (
        <View style={styles.listPad}>
          {[1, 2, 3, 4].map(i => (
            <DoctorCardSkeleton key={i} />
          ))}
        </View>
      ) : (
        <FlatList
          data={doctors}
          keyExtractor={item => item.id}
          contentContainerStyle={[
            styles.list,
            doctors.length === 0 && styles.listEmpty,
          ]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh}
              tintColor={colors.primary}
            />
          }
          renderItem={({ item }) => (
            <DoctorCard
              doctor={item}
              onPress={() =>
                navigation.navigate('DoctorDetails', { doctorId: item.id })
              }
            />
          )}
          ListEmptyComponent={
            <EmptyState
              title="No doctors found"
              message={
                search
                  ? 'Try a different search term'
                  : 'Check your MockAPI doctors resource'
              }
            />
          }
        />
      )}
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
    marginBottom: spacing.md,
  },
  searchWrap: {
    marginBottom: spacing.sm,
  },
  searchInput: {
    marginBottom: 0,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  listPad: {
    paddingHorizontal: spacing.md,
  },
  listEmpty: {
    flexGrow: 1,
  },
});
