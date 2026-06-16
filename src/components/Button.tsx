import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../hooks';
import { radius, spacing, typography } from '../theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  fullWidth = true,
}: ButtonProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isDisabled = disabled || loading;
  const variantStyles = getVariantStyles(variant, colors, isDisabled);

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={isDisabled}
      onPressIn={() => {
        scale.value = withSpring(0.97);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      style={[
        styles.base,
        fullWidth && styles.fullWidth,
        variantStyles.container,
        animatedStyle,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={variantStyles.spinnerColor} />
      ) : (
        <Text style={[styles.label, variantStyles.text]}>{title}</Text>
      )}
    </AnimatedPressable>
  );
}

function getVariantStyles(
  variant: Variant,
  colors: ReturnType<typeof useTheme>['colors'],
  disabled: boolean,
) {
  const opacity = disabled ? 0.5 : 1;
  switch (variant) {
    case 'secondary':
      return {
        container: {
          backgroundColor: colors.secondary,
          opacity,
        },
        text: { color: '#FFFFFF' },
        spinnerColor: '#FFFFFF',
      };
    case 'outline':
      return {
        container: {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: colors.primary,
          opacity,
        },
        text: { color: colors.primary },
        spinnerColor: colors.primary,
      };
    case 'ghost':
      return {
        container: { backgroundColor: 'transparent', opacity },
        text: { color: colors.primary },
        spinnerColor: colors.primary,
      };
    case 'danger':
      return {
        container: { backgroundColor: colors.error, opacity },
        text: { color: '#FFFFFF' },
        spinnerColor: '#FFFFFF',
      };
    default:
      return {
        container: { backgroundColor: colors.primary, opacity },
        text: { color: '#FFFFFF' },
        spinnerColor: '#FFFFFF',
      };
  }
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    ...typography.button,
  },
});
