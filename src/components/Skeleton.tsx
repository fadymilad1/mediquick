import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../hooks';
import { radius, spacing } from '../theme';

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  style?: ViewStyle;
  borderRadius?: number;
}

export function Skeleton({
  width = '100%',
  height = 16,
  style,
  borderRadius = radius.sm,
}: SkeletonProps) {
  const { colors } = useTheme();
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.border,
        },
        animatedStyle,
        style,
      ]}
    />
  );
}

export function DoctorCardSkeleton() {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}>
      <View style={styles.row}>
        <Skeleton width={72} height={72} borderRadius={radius.md} />
        <View style={styles.content}>
          <Skeleton width="70%" height={18} />
          <Skeleton width="50%" height={14} style={styles.gap} />
          <Skeleton width="30%" height={14} style={styles.gap} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  gap: {
    marginTop: spacing.sm,
  },
});
