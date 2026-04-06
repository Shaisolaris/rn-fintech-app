import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";
import { useAppStore } from "../store/index.js";

export function ProfileScreen() {
  const user = useAppStore((s) => s.user);
  const biometricEnabled = useAppStore((s) => s.biometricEnabled);
  const setBiometric = useAppStore((s) => s.setBiometric);
  const logout = useAppStore((s) => s.logout);

  const menuItems = [
    { label: "Personal Info", icon: "👤" },
    { label: "Security", icon: "🔒" },
    { label: "Notifications", icon: "🔔" },
    { label: "Linked Accounts", icon: "🏦" },
    { label: "Help & Support", icon: "💬" },
    { label: "About", icon: "ℹ️" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.firstName?.[0]}{user?.lastName?.[0]}</Text>
        </View>
        <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.toggleRow} onPress={() => setBiometric(!biometricEnabled)}>
          <Text style={styles.toggleLabel}>🔐 Biometric Login</Text>
          <View style={[styles.toggle, biometricEnabled && styles.toggleActive]}>
            <View style={[styles.toggleThumb, biometricEnabled && styles.toggleThumbActive]} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.label} style={styles.menuItem}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { alignItems: "center", paddingVertical: spacing.xl },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, justifyContent: "center", alignItems: "center" },
  avatarText: { fontSize: fontSize.xxl, fontWeight: "700", color: "#fff" },
  name: { fontSize: fontSize.xl, fontWeight: "700", color: colors.text, marginTop: spacing.md },
  email: { fontSize: fontSize.md, color: colors.textSecondary, marginTop: spacing.xs },
  section: { marginTop: spacing.md, marginHorizontal: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.md, overflow: "hidden" },
  toggleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: spacing.md },
  toggleLabel: { fontSize: fontSize.md, color: colors.text },
  toggle: { width: 48, height: 28, borderRadius: 14, backgroundColor: colors.surfaceLight, justifyContent: "center", padding: 2 },
  toggleActive: { backgroundColor: colors.primary },
  toggleThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: "#fff" },
  toggleThumbActive: { alignSelf: "flex-end" },
  menuItem: { flexDirection: "row", alignItems: "center", padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  menuIcon: { fontSize: 18, marginRight: spacing.md },
  menuLabel: { flex: 1, fontSize: fontSize.md, color: colors.text },
  menuChevron: { fontSize: fontSize.xl, color: colors.textMuted },
  logoutBtn: { marginTop: spacing.xl, marginHorizontal: spacing.md, paddingVertical: spacing.md, backgroundColor: colors.danger + "15", borderRadius: borderRadius.md, alignItems: "center", marginBottom: spacing.xxl },
  logoutText: { fontSize: fontSize.lg, color: colors.danger, fontWeight: "600" },
});
