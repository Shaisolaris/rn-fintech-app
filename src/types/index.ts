// ─── User & Auth ────────────────────────────────────────

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  phone: string;
  verified: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  biometricEnabled: boolean;
  token: string | null;
}

// ─── Portfolio ──────────────────────────────────────────

export interface Portfolio {
  totalBalance: number;
  totalGain: number;
  totalGainPercent: number;
  currency: string;
  holdings: Holding[];
  history: PortfolioPoint[];
}

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  change24h: number;
  changePercent24h: number;
  value: number;
  gain: number;
  gainPercent: number;
  type: "stock" | "crypto" | "etf" | "bond";
  color: string;
}

export interface PortfolioPoint {
  date: string;
  value: number;
}

// ─── Transactions ───────────────────────────────────────

export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "buy" | "sell" | "transfer" | "dividend" | "fee";
  amount: number;
  currency: string;
  description: string;
  category: string;
  status: "completed" | "pending" | "failed";
  date: string;
  counterparty?: string;
  holdingSymbol?: string;
}

// ─── Cards ──────────────────────────────────────────────

export interface Card {
  id: string;
  type: "virtual" | "physical";
  last4: string;
  brand: "visa" | "mastercard";
  expiryMonth: number;
  expiryYear: number;
  frozen: boolean;
  spendLimit: number;
  spentThisMonth: number;
  color: string;
}

// ─── Budget ─────────────────────────────────────────────

export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  budget: number;
  spent: number;
  color: string;
}

// ─── Navigation ─────────────────────────────────────────

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  TransactionDetail: { id: string };
  HoldingDetail: { symbol: string };
  CardDetail: { id: string };
};

export type MainTabParamList = {
  Home: undefined;
  Portfolio: undefined;
  Transactions: undefined;
  Cards: undefined;
  Profile: undefined;
};

// ─── Chart ──────────────────────────────────────────────

export type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL";
