import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, StyleSheet } from "react-native";
import { useAppStore } from "../store/index.js";
import { LoginScreen } from "../screens/LoginScreen.js";
import { HomeScreen } from "../screens/HomeScreen.js";
import { PortfolioScreen } from "../screens/PortfolioScreen.js";
import { TransactionsScreen } from "../screens/TransactionsScreen.js";
import { CardsScreen } from "../screens/CardsScreen.js";
import { ProfileScreen } from "../screens/ProfileScreen.js";
import { colors, fontSize } from "../theme/index.js";
import type { RootStackParamList, MainTabParamList } from "../types/index.js";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIcons: Record<string, string> = {
  Home: "🏠", Portfolio: "📊", Transactions: "📋", Cards: "💳", Profile: "👤",
};

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  return (
    <View style={styles.tabIcon}>
      <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{tabIcons[name] || "•"}</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Cards" component={CardsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <Stack.Screen name="Auth" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: { backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: 1, height: 85, paddingTop: 8, paddingBottom: 25 },
  tabLabel: { fontSize: fontSize.xs, fontWeight: "500" },
  tabIcon: { alignItems: "center", justifyContent: "center" },
});
