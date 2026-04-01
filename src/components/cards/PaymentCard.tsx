import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../../theme/index.js";
import { maskCardNumber } from "../../utils/format.js";
import type { Card } from "../../types/index.js";

interface Props {
  card: Card;
  onPress?: () => void;
}

export function PaymentCard({ card, onPress }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={[styles.card, { backgroundColor: card.frozen ? colors.textMuted : card.color }]}>
        {card.frozen && (
          <View style={styles.frozenBadge}>
            <Text style={styles.frozenText}>FROZEN</Text>
          </View>
        )}
        <View style={styles.header}>
          <Text style={styles.type}>{card.type.toUpperCase()}</Text>
          <Text style={styles.brand}>{card.brand.toUpperCase()}</Text>
        </View>
        <Text style={styles.number}>{maskCardNumber(card.last4)}</Text>
        <View style={styles.footer}>
          <View>
            <Text style={styles.label}>EXPIRES</Text>
            <Text style={styles.expiry}>{`${card.expiryMonth.toString().padStart(2, "0")}/${card.expiryYear}`}</Text>
          </View>
          <View style={styles.spend}>
            <Text style={styles.label}>SPENT</Text>
            <Text style={styles.spentAmount}>
              ${card.spentThisMonth.toLocaleString()} / ${card.spendLimit.toLocaleString()}
            </Text>
          </View>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.min((card.spentThisMonth / card.spendLimit) * 100, 100)}%` }]} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: borderRadius.lg, padding: spacing.lg, marginHorizontal: spacing.md, height: 200, justifyContent: "space-between" },
  frozenBadge: { position: "absolute", top: spacing.md, right: spacing.md, backgroundColor: "rgba(0,0,0,0.4)", paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
  frozenText: { fontSize: fontSize.xs, color: "#fff", fontWeight: "700", letterSpacing: 1 },
  header: { flexDirection: "row", justifyContent: "space-between" },
  type: { fontSize: fontSize.xs, color: "rgba(255,255,255,0.7)", letterSpacing: 1, fontWeight: "600" },
  brand: { fontSize: fontSize.md, color: "#fff", fontWeight: "700" },
  number: { fontSize: fontSize.xl, color: "#fff", fontWeight: "500", letterSpacing: 3 },
  footer: { flexDirection: "row", justifyContent: "space-between" },
  label: { fontSize: fontSize.xs, color: "rgba(255,255,255,0.6)", letterSpacing: 0.5 },
  expiry: { fontSize: fontSize.md, color: "#fff", fontWeight: "600", marginTop: 2 },
  spend: { alignItems: "flex-end" },
  spentAmount: { fontSize: fontSize.sm, color: "#fff", fontWeight: "600", marginTop: 2 },
  progressTrack: { height: 3, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 2, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "rgba(255,255,255,0.8)", borderRadius: 2 },
});
