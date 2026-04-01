import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../../theme/index.js";
import { formatCurrency, formatDate } from "../../utils/format.js";
import type { Transaction } from "../../types/index.js";

const typeIcons: Record<string, string> = {
  deposit: "↓", withdrawal: "↑", buy: "📈", sell: "📉", transfer: "↔", dividend: "💰", fee: "📋",
};

const statusColors: Record<string, string> = {
  completed: colors.positive, pending: colors.warning, failed: colors.negative,
};

interface Props {
  transaction: Transaction;
  onPress?: () => void;
}

export function TransactionRow({ transaction, onPress }: Props) {
  const isPositive = transaction.amount > 0;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>{typeIcons[transaction.type] || "•"}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.description} numberOfLines={1}>{transaction.description}</Text>
        <View style={styles.meta}>
          <Text style={styles.date}>{formatDate(transaction.date)}</Text>
          <View style={[styles.statusDot, { backgroundColor: statusColors[transaction.status] }]} />
          <Text style={styles.status}>{transaction.status}</Text>
        </View>
      </View>
      <Text style={[styles.amount, { color: isPositive ? colors.positive : colors.text }]}>
        {isPositive ? "+" : ""}{formatCurrency(transaction.amount)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.md, paddingHorizontal: spacing.md },
  iconWrap: { width: 40, height: 40, borderRadius: borderRadius.md, backgroundColor: colors.surfaceLight, justifyContent: "center", alignItems: "center" },
  icon: { fontSize: 18 },
  info: { flex: 1, marginLeft: spacing.md },
  description: { fontSize: fontSize.md, fontWeight: "500", color: colors.text },
  meta: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  date: { fontSize: fontSize.sm, color: colors.textMuted },
  statusDot: { width: 6, height: 6, borderRadius: 3, marginLeft: spacing.sm },
  status: { fontSize: fontSize.xs, color: colors.textMuted, marginLeft: 4, textTransform: "capitalize" },
  amount: { fontSize: fontSize.md, fontWeight: "600" },
});
