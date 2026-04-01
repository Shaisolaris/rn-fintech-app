import type { User, Portfolio, Holding, Transaction, Card, BudgetCategory, PortfolioPoint } from "../types/index.js";

export const mockUser: User = {
  id: "usr-001",
  firstName: "Alex",
  lastName: "Morgan",
  email: "alex@example.com",
  phone: "+1 (555) 123-4567",
  verified: true,
  createdAt: "2023-01-15T00:00:00Z",
};

const generateHistory = (days: number, startValue: number): PortfolioPoint[] => {
  let value = startValue;
  const points: PortfolioPoint[] = [];
  const now = Date.now();
  for (let i = days; i >= 0; i--) {
    value += (Math.random() - 0.48) * value * 0.02;
    const date = new Date(now - i * 86_400_000);
    points.push({ date: date.toISOString().split("T")[0]!, value: Math.round(value * 100) / 100 });
  }
  return points;
};

export const mockHoldings: Holding[] = [
  { id: "h1", symbol: "AAPL", name: "Apple Inc.", quantity: 15, avgCost: 168.50, currentPrice: 189.84, change24h: 2.15, changePercent24h: 1.15, value: 2847.60, gain: 320.10, gainPercent: 12.66, type: "stock", color: "#6C5CE7" },
  { id: "h2", symbol: "BTC", name: "Bitcoin", quantity: 0.25, avgCost: 42000, currentPrice: 67350, change24h: 1250, changePercent24h: 1.89, value: 16837.50, gain: 6337.50, gainPercent: 60.36, type: "crypto", color: "#F79F1F" },
  { id: "h3", symbol: "MSFT", name: "Microsoft Corp.", quantity: 10, avgCost: 360, currentPrice: 415.20, change24h: -3.40, changePercent24h: -0.81, value: 4152.00, gain: 552.00, gainPercent: 15.33, type: "stock", color: "#00CEC9" },
  { id: "h4", symbol: "ETH", name: "Ethereum", quantity: 3.5, avgCost: 2200, currentPrice: 3450, change24h: 85, changePercent24h: 2.53, value: 12075.00, gain: 4375.00, gainPercent: 56.82, type: "crypto", color: "#636E72" },
  { id: "h5", symbol: "VOO", name: "Vanguard S&P 500", quantity: 8, avgCost: 420, currentPrice: 487.50, change24h: 1.20, changePercent24h: 0.25, value: 3900.00, gain: 540.00, gainPercent: 16.07, type: "etf", color: "#00B894" },
  { id: "h6", symbol: "GOOGL", name: "Alphabet Inc.", quantity: 5, avgCost: 138, currentPrice: 172.80, change24h: -1.05, changePercent24h: -0.60, value: 864.00, gain: 174.00, gainPercent: 25.22, type: "stock", color: "#E17055" },
];

export const mockPortfolio: Portfolio = {
  totalBalance: mockHoldings.reduce((sum, h) => sum + h.value, 0),
  totalGain: mockHoldings.reduce((sum, h) => sum + h.gain, 0),
  totalGainPercent: 28.45,
  currency: "USD",
  holdings: mockHoldings,
  history: generateHistory(365, 28000),
};

export const mockTransactions: Transaction[] = [
  { id: "tx1", type: "buy", amount: -2500, currency: "USD", description: "Buy AAPL", category: "Investment", status: "completed", date: "2024-03-15T14:30:00Z", holdingSymbol: "AAPL" },
  { id: "tx2", type: "deposit", amount: 5000, currency: "USD", description: "Bank Transfer", category: "Deposit", status: "completed", date: "2024-03-14T09:00:00Z", counterparty: "Chase Bank" },
  { id: "tx3", type: "sell", amount: 1200, currency: "USD", description: "Sell ETH", category: "Investment", status: "completed", date: "2024-03-13T11:15:00Z", holdingSymbol: "ETH" },
  { id: "tx4", type: "dividend", amount: 45.20, currency: "USD", description: "AAPL Dividend", category: "Income", status: "completed", date: "2024-03-12T00:00:00Z", holdingSymbol: "AAPL" },
  { id: "tx5", type: "withdrawal", amount: -1000, currency: "USD", description: "ATM Withdrawal", category: "Cash", status: "completed", date: "2024-03-11T16:45:00Z" },
  { id: "tx6", type: "buy", amount: -3200, currency: "USD", description: "Buy BTC", category: "Investment", status: "completed", date: "2024-03-10T10:20:00Z", holdingSymbol: "BTC" },
  { id: "tx7", type: "transfer", amount: -500, currency: "USD", description: "Transfer to Savings", category: "Transfer", status: "pending", date: "2024-03-15T18:00:00Z" },
  { id: "tx8", type: "fee", amount: -4.99, currency: "USD", description: "Monthly Platform Fee", category: "Fee", status: "completed", date: "2024-03-01T00:00:00Z" },
  { id: "tx9", type: "buy", amount: -4000, currency: "USD", description: "Buy VOO", category: "Investment", status: "completed", date: "2024-02-28T13:30:00Z", holdingSymbol: "VOO" },
  { id: "tx10", type: "deposit", amount: 10000, currency: "USD", description: "Wire Transfer", category: "Deposit", status: "completed", date: "2024-02-25T09:00:00Z", counterparty: "Employer Inc." },
];

export const mockCards: Card[] = [
  { id: "card1", type: "virtual", last4: "4892", brand: "visa", expiryMonth: 12, expiryYear: 2026, frozen: false, spendLimit: 5000, spentThisMonth: 1847.50, color: "#6C5CE7" },
  { id: "card2", type: "physical", last4: "7231", brand: "mastercard", expiryMonth: 8, expiryYear: 2027, frozen: false, spendLimit: 10000, spentThisMonth: 3420.00, color: "#00CEC9" },
  { id: "card3", type: "virtual", last4: "1056", brand: "visa", expiryMonth: 3, expiryYear: 2025, frozen: true, spendLimit: 2000, spentThisMonth: 0, color: "#636E72" },
];

export const mockBudget: BudgetCategory[] = [
  { id: "b1", name: "Investments", icon: "📈", budget: 5000, spent: 3700, color: "#6C5CE7" },
  { id: "b2", name: "Food & Dining", icon: "🍕", budget: 800, spent: 620, color: "#00CEC9" },
  { id: "b3", name: "Transport", icon: "🚗", budget: 400, spent: 280, color: "#FDCB6E" },
  { id: "b4", name: "Entertainment", icon: "🎬", budget: 300, spent: 185, color: "#E17055" },
  { id: "b5", name: "Utilities", icon: "💡", budget: 250, spent: 210, color: "#00B894" },
  { id: "b6", name: "Shopping", icon: "🛍️", budget: 600, spent: 445, color: "#FF7675" },
];
