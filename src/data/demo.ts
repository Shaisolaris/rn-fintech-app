export const DEMO_ACCOUNTS = [
  { id: "1", name: "Checking", balance: 12450.00, type: "checking", currency: "USD" },
  { id: "2", name: "Savings", balance: 34200.50, type: "savings", currency: "USD" },
  { id: "3", name: "Investment", balance: 67800.00, type: "investment", currency: "USD" },
];
export const DEMO_TRANSACTIONS = [
  { id: "t1", description: "Salary Deposit", amount: 5200.00, type: "credit", date: "2026-04-01", category: "Income" },
  { id: "t2", description: "Rent Payment", amount: -1800.00, type: "debit", date: "2026-04-01", category: "Housing" },
  { id: "t3", description: "Grocery Store", amount: -145.30, type: "debit", date: "2026-03-31", category: "Food" },
  { id: "t4", description: "Netflix", amount: -15.99, type: "debit", date: "2026-03-30", category: "Entertainment" },
  { id: "t5", description: "Freelance Payment", amount: 1200.00, type: "credit", date: "2026-03-28", category: "Income" },
  { id: "t6", description: "Electric Bill", amount: -95.40, type: "debit", date: "2026-03-27", category: "Utilities" },
];
export const DEMO_PORTFOLIO = { totalValue: 67800, dayChange: 342.50, dayChangePercent: 0.51, holdings: [
  { symbol: "AAPL", shares: 25, value: 4325.00, change: 1.2 },
  { symbol: "GOOGL", shares: 10, value: 2840.00, change: -0.8 },
  { symbol: "MSFT", shares: 30, value: 12600.00, change: 0.5 },
  { symbol: "VOO", shares: 50, value: 22500.00, change: 0.3 },
]};
