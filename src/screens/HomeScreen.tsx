import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { colors, spacing, fontSize } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { ScreenHeader } from "../components/common/ScreenHeader.js";
import { StatCard } from "../components/common/StatCard.js";
import { HoldingRow } from "../components/cards/HoldingRow.js";
import { TransactionRow } from "../components/transactions/TransactionRow.js";
import { BudgetRow } from "../components/common/BudgetRow.js";
import { formatCurrency, formatPercent } from "../utils/format.js";

export function HomeScreen() {
  const user = useAppStore((s) => s.user);
  const portfolio = useAppStore((s) => s.portfolio);
  const transactions = useAppStore((s) => s.transactions);
  const budget = useAppStore((s) => s.budget);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ScreenHeader title={`Hi, ${user?.firstName || "there"} 👋`} subtitle="Here's your financial overview" />

      {/* Balance */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Portfolio</Text>
        <Text style={styles.balanceValue}>{formatCurrency(portfolio.totalBalance)}</Text>
        <Text style={[styles.balanceChange, { color: portfolio.totalGain >= 0 ? colors.positive : colors.negative }]}>
          {formatPercent(portfolio.totalGainPercent)} ({formatCurrency(portfolio.totalGain)})
        </Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsRow}>
        <StatCard label="Today" value={formatCurrency(1247.50)} change="+2.1%" positive />
        <View style={{ width: spacing.md }} />
        <StatCard label="This Month" value={formatCurrency(4820)} change="+8.5%" positive />
      </View>

      {/* Top Holdings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Holdings</Text>
        {portfolio.holdings.slice(0, 4).map((h) => <HoldingRow key={h.id} holding={h} />)}
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {transactions.slice(0, 5).map((tx) => <TransactionRow key={tx.id} transaction={tx} />)}
      </View>

      {/* Budget */}
      <View style={[styles.section, { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl }]}>
        <Text style={styles.sectionTitle}>Budget This Month</Text>
        {budget.slice(0, 4).map((b) => <BudgetRow key={b.id} item={b} />)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  balanceCard: { alignItems: "center", paddingVertical: spacing.xl, marginHorizontal: spacing.md, backgroundColor: colors.surface, borderRadius: 16, marginBottom: spacing.md },
  balanceLabel: { fontSize: fontSize.sm, color: colors.textMuted, textTransform: "uppercase", letterSpacing: 1 },
  balanceValue: { fontSize: 40, fontWeight: "700", color: colors.text, marginTop: spacing.xs },
  balanceChange: { fontSize: fontSize.md, fontWeight: "600", marginTop: spacing.xs },
  statsRow: { flexDirection: "row", paddingHorizontal: spacing.md, marginBottom: spacing.lg },
  section: { marginBottom: spacing.lg },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: "600", color: colors.text, paddingHorizontal: spacing.md, marginBottom: spacing.sm },
});
