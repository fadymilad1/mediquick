import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { Button, Card, ScreenContainer } from '../../../components';
import { useTheme } from '../../../hooks';
import { useAuthStore, useThemeStore } from '../../../store';
import { spacing, typography } from '../../../theme';
import { useAuth } from '../../auth/hooks/useAuth';

export function ProfileScreen() {
  const { colors, isDark } = useTheme();
  const user = useAuthStore(state => state.user);
  const { logout } = useAuth();
  const mode = useThemeStore(state => state.mode);
  const toggleTheme = useThemeStore(state => state.toggleTheme);

  return (
    <ScreenContainer>
      <Text style={[styles.title, { color: colors.text }]}>Profile</Text>

      <Card style={styles.card}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Name</Text>
        <Text style={[styles.value, { color: colors.text }]}>{user?.name}</Text>

        <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
        <Text style={[styles.value, { color: colors.text }]}>
          {user?.email}
        </Text>

        {user?.phone ? (
          <>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Phone
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {user.phone}
            </Text>
          </>
        ) : null}
      </Card>

      <Card style={styles.card}>
        <View style={styles.row}>
          <View>
            <Text style={[styles.settingTitle, { color: colors.text }]}>
              Dark mode
            </Text>
            <Text style={[styles.settingSub, { color: colors.textSecondary }]}>
              {isDark ? 'On' : 'Off'}
            </Text>
          </View>
          <Switch
            value={mode === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor="#FFFFFF"
          />
        </View>
      </Card>

      <Button title="Log out" variant="danger" onPress={logout} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.h2,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  card: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    marginTop: spacing.sm,
    marginBottom: 2,
  },
  value: {
    ...typography.body,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingTitle: {
    ...typography.body,
    fontWeight: '600',
  },
  settingSub: {
    ...typography.caption,
    marginTop: 2,
  },
});
