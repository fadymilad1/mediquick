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
import { validateRegisterForm } from '../../../utils';
import { useAuth } from '../hooks/useAuth';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { register, loading, error, clearError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRegister = async () => {
    clearError();
    const validation = validateRegisterForm({
      name,
      email,
      password,
      confirmPassword,
    });
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      return;
    }
    try {
      await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        phone: phone.trim() || undefined,
      });
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
            <Text style={[styles.title, { color: colors.text }]}>Create account</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Join MediQuick to book appointments
            </Text>
          </View>

          <Input label="Full name" value={name} onChangeText={setName} error={errors.name} />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />
          <Input
            label="Phone (optional)"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />
          <Input
            label="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={errors.confirmPassword}
          />

          {error ? (
            <Text style={[styles.apiError, { color: colors.error }]}>{error}</Text>
          ) : null}

          <Button title="Create account" onPress={handleRegister} loading={loading} />

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.linkWrap}>
            <Text style={[styles.link, { color: colors.textSecondary }]}>
              Already have an account?{' '}
              <Text style={{ color: colors.primary, fontWeight: '600' }}>Sign in</Text>
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
    paddingVertical: spacing.lg,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
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
