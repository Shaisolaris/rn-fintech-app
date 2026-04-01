import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../../theme/index.js";

interface Props {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

export function StatCard({ label, value, change, positive }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {change && (
        <Text style={[styles.change, { color: positive ? colors.positive : colors.negative }]}>
          {change}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md },
  label: { fontSize: fontSize.xs, color: colors.textMuted, textTransform: "uppercase", letterSpacing: 1 },
  value: { fontSize: fontSize.xl, fontWeight: "700", color: colors.text, marginTop: spacing.xs },
  change: { fontSize: fontSize.sm, marginTop: spacing.xs, fontWeight: "600" },
});
