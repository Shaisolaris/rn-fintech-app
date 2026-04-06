import { } from "../data/demo";
import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { colors, spacing } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { ScreenHeader } from "../components/common/ScreenHeader.js";
import { PortfolioChart } from "../components/charts/PortfolioChart.js";
import { HoldingRow } from "../components/cards/HoldingRow.js";
import { formatCurrency, formatPercent } from "../utils/format.js";

export function PortfolioScreen() {
  const portfolio = useAppStore((s) => s.portfolio);
  const selectedRange = useAppStore((s) => s.selectedTimeRange);
  const setRange = useAppStore((s) => s.setTimeRange);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ScreenHeader
        title={formatCurrency(portfolio.totalBalance)}
        subtitle={`${formatPercent(portfolio.totalGainPercent)} all time`}
      />
      <PortfolioChart data={portfolio.history} selectedRange={selectedRange} onRangeChange={setRange} />
      <View style={styles.holdings}>
        {portfolio.holdings.map((h) => <HoldingRow key={h.id} holding={h} />)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  holdings: { marginTop: spacing.lg, paddingBottom: spacing.xxl },
});
