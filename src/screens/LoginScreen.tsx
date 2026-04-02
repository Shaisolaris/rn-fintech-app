import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { authenticateWithBiometrics, isBiometricAvailable } from "../services/biometric.js";

export function LoginScreen() {
  const [email, setEmail] = useState("alex@example.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const login = useAppStore((s) => s.login);
  const setBiometric = useAppStore((s) => s.setBiometric);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const success = await login(email, password);
    if (!success) setError("Invalid credentials");
    setLoading(false);
  };

  const handleBiometric = async () => {
    const available = await isBiometricAvailable();
    if (!available) { setError("Biometrics not available"); return; }
    setLoading(true);
    const result = await authenticateWithBiometrics("Sign in to your account");
    if (result.success) {
      await login(email, password);
      setBiometric(true);
    } else {
      setError(result.error || "Authentication failed");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>💎</Text>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your portfolio</Text>
      </View>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor={colors.textMuted} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor={colors.textMuted} value={password} onChangeText={setPassword} secureTextEntry />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.biometricBtn} onPress={handleBiometric}>
          <Text style={styles.biometricText}>🔐 Use Biometrics</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: "center", paddingHorizontal: spacing.lg },
  header: { alignItems: "center", marginBottom: spacing.xxl },
  logo: { fontSize: 48, marginBottom: spacing.md },
  title: { fontSize: fontSize.xxxl, fontWeight: "700", color: colors.text },
  subtitle: { fontSize: fontSize.lg, color: colors.textSecondary, marginTop: spacing.xs },
  form: { gap: spacing.md },
  input: { backgroundColor: colors.surface, borderRadius: borderRadius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.md, fontSize: fontSize.lg, color: colors.text, borderWidth: 1, borderColor: colors.border },
  error: { color: colors.danger, fontSize: fontSize.sm, textAlign: "center" },
  button: { backgroundColor: colors.primary, borderRadius: borderRadius.md, paddingVertical: spacing.md, alignItems: "center", marginTop: spacing.sm },
  buttonText: { color: "#fff", fontSize: fontSize.lg, fontWeight: "600" },
  biometricBtn: { alignItems: "center", paddingVertical: spacing.md },
  biometricText: { color: colors.primary, fontSize: fontSize.lg, fontWeight: "500" },
});
