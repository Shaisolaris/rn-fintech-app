import { } from "../data/demo";
import React from "react";
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { ScreenHeader } from "../components/common/ScreenHeader.js";
import { TransactionRow } from "../components/transactions/TransactionRow.js";

const FILTERS = ["all", "deposit", "withdrawal", "buy", "sell", "dividend"];

export function TransactionsScreen() {
  const transactions = useAppStore((s) => s.transactions);
  const filter = useAppStore((s) => s.transactionFilter);
  const setFilter = useAppStore((s) => s.setTransactionFilter);

  const filtered = filter === "all" ? transactions : transactions.filter((t) => t.type === filter);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ScreenHeader title="Transactions" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        {FILTERS.map((f) => (
          <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[styles.filterBtn, filter === f && styles.filterActive]}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.list}>
        {filtered.map((tx) => <TransactionRow key={tx.id} transaction={tx} />)}
        {filtered.length === 0 && <Text style={styles.empty}>No transactions found</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  filters: { paddingHorizontal: spacing.md, marginBottom: spacing.md },
  filterBtn: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.full, backgroundColor: colors.surface, marginRight: spacing.sm },
  filterActive: { backgroundColor: colors.primary },
  filterText: { fontSize: fontSize.sm, color: colors.textMuted, fontWeight: "500", textTransform: "capitalize" },
  filterTextActive: { color: "#fff" },
  list: { paddingBottom: spacing.xxl },
  empty: { textAlign: "center", color: colors.textMuted, marginTop: spacing.xl },
});
