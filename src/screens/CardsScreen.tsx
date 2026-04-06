import React, { useRef } from "react";
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { ScreenHeader } from "../components/common/ScreenHeader.js";
import { PaymentCard } from "../components/cards/PaymentCard.js";

const { width } = Dimensions.get("window");

export function CardsScreen() {
  const cards = useAppStore((s) => s.cards);
  const toggleFreeze = useAppStore((s) => s.toggleCardFreeze);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ScreenHeader title="Cards" rightAction={{ label: "+ New Card", onPress: () => {} }} />
      <FlatList
        data={cards}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <View style={{ width: width - spacing.md }}>
            <PaymentCard card={item} />
          </View>
        )}
        style={styles.carousel}
      />
      <View style={styles.actions}>
        {cards.map((card) => (
          <View key={card.id} style={styles.cardActions}>
            <Text style={styles.cardLabel}>•••• {card.last4}</Text>
            <TouchableOpacity style={[styles.actionBtn, card.frozen && styles.actionBtnDanger]} onPress={() => toggleFreeze(card.id)}>
              <Text style={styles.actionText}>{card.frozen ? "Unfreeze" : "Freeze"}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  carousel: { marginBottom: spacing.lg },
  actions: { paddingHorizontal: spacing.md, paddingBottom: spacing.xxl },
  cardActions: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  cardLabel: { fontSize: fontSize.md, color: colors.text, fontWeight: "500" },
  actionBtn: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.sm, backgroundColor: colors.surfaceLight },
  actionBtnDanger: { backgroundColor: colors.danger + "20" },
  actionText: { fontSize: fontSize.sm, color: colors.text, fontWeight: "500" },
});
