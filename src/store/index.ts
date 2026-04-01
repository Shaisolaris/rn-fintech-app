import { create } from "zustand";
import type { User, Portfolio, Transaction, Card, BudgetCategory, TimeRange } from "../types/index.js";
import { mockUser, mockPortfolio, mockTransactions, mockCards, mockBudget } from "../services/mockData.js";

interface AppStore {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  biometricEnabled: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setBiometric: (enabled: boolean) => void;

  // Portfolio
  portfolio: Portfolio;
  selectedTimeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;

  // Transactions
  transactions: Transaction[];
  transactionFilter: string;
  setTransactionFilter: (filter: string) => void;

  // Cards
  cards: Card[];
  toggleCardFreeze: (cardId: string) => void;

  // Budget
  budget: BudgetCategory[];
}

export const useAppStore = create<AppStore>((set) => ({
  // Auth
  user: null,
  isAuthenticated: false,
  biometricEnabled: false,

  login: async (_email: string, _password: string) => {
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    set({ user: mockUser, isAuthenticated: true });
    return true;
  },

  logout: () => set({ user: null, isAuthenticated: false }),

  setBiometric: (enabled) => set({ biometricEnabled: enabled }),

  // Portfolio
  portfolio: mockPortfolio,
  selectedTimeRange: "1M",
  setTimeRange: (range) => set({ selectedTimeRange: range }),

  // Transactions
  transactions: mockTransactions,
  transactionFilter: "all",
  setTransactionFilter: (filter) => set({ transactionFilter: filter }),

  // Cards
  cards: mockCards,
  toggleCardFreeze: (cardId) =>
    set((state) => ({
      cards: state.cards.map((c) =>
        c.id === cardId ? { ...c, frozen: !c.frozen } : c,
      ),
    })),

  // Budget
  budget: mockBudget,
}));
