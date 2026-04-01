import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../../theme/index.js";
import { formatCurrency, formatPercent } from "../../utils/format.js";
import type { Holding } from "../../types/index.js";

interface Props {
  holding: Holding;
  onPress?: () => void;
}

export function HoldingRow({ holding, onPress }: Props) {
  const isPositive = holding.changePercent24h >= 0;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.icon, { backgroundColor: holding.color + "20" }]}>
        <Text style={[styles.iconText, { color: holding.color }]}>{holding.symbol.slice(0, 2)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.symbol}>{holding.symbol}</Text>
        <Text style={styles.name} numberOfLines={1}>{holding.name}</Text>
      </View>
      <View style={styles.values}>
        <Text style={styles.price}>{formatCurrency(holding.value)}</Text>
        <Text style={[styles.change, { color: isPositive ? colors.positive : colors.negative }]}>
          {formatPercent(holding.changePercent24h)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.md, paddingHorizontal: spacing.md },
  icon: { width: 44, height: 44, borderRadius: borderRadius.md, justifyContent: "center", alignItems: "center" },
  iconText: { fontSize: fontSize.md, fontWeight: "700" },
  info: { flex: 1, marginLeft: spacing.md },
  symbol: { fontSize: fontSize.lg, fontWeight: "600", color: colors.text },
  name: { fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  values: { alignItems: "flex-end" },
  price: { fontSize: fontSize.lg, fontWeight: "600", color: colors.text },
  change: { fontSize: fontSize.sm, marginTop: 2, fontWeight: "500" },
});
