import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, ScreenContainer } from '../../../components';
import { useTheme } from '../../../hooks';
import { AuthStackParamList } from '../../../navigation/types';
import { spacing, typography } from '../../../theme';
import { validateLoginForm } from '../../../utils';
import { useAuth } from '../hooks/useAuth';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { login, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLogin = async () => {
    clearError();
    const validation = validateLoginForm(email, password);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      return;
    }
    try {
      await login(email.trim().toLowerCase(), password);
    } catch {
      // error shown via hook
    }
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={[styles.logo, { color: colors.primary }]}>MediQuick</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Book clinic appointments in seconds
            </Text>
          </View>

          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={errors.email}
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />

          {error ? (
            <Text style={[styles.apiError, { color: colors.error }]}>{error}</Text>
          ) : null}

          <Button title="Sign in" onPress={handleLogin} loading={loading} />

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.linkWrap}>
            <Text style={[styles.link, { color: colors.textSecondary }]}>
              Don&apos;t have an account?{' '}
              <Text style={{ color: colors.primary, fontWeight: '600' }}>
                Register
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
  },
  logo: {
    ...typography.h1,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
  },
  apiError: {
    ...typography.bodySmall,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  linkWrap: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  link: {
    ...typography.body,
  },
});
