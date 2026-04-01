import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../../theme/index.js";
import { formatCurrency } from "../../utils/format.js";
import type { BudgetCategory } from "../../types/index.js";

export function BudgetRow({ item }: { item: BudgetCategory }) {
  const percent = Math.min((item.spent / item.budget) * 100, 100);
  const isOver = item.spent > item.budget;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>{item.icon}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.amounts}>
          {formatCurrency(item.spent)} / {formatCurrency(item.budget)}
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%`, backgroundColor: isOver ? colors.negative : item.color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: spacing.sm },
  header: { flexDirection: "row", alignItems: "center", marginBottom: spacing.xs },
  icon: { fontSize: 16, marginRight: spacing.sm },
  name: { flex: 1, fontSize: fontSize.md, color: colors.text, fontWeight: "500" },
  amounts: { fontSize: fontSize.sm, color: colors.textSecondary },
  track: { height: 6, backgroundColor: colors.surfaceLight, borderRadius: 3, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 3 },
});
