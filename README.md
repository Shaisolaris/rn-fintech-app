# rn-fintech-app

![CI](https://github.com/Shaisolaris/rn-fintech-app/actions/workflows/ci.yml/badge.svg)



React Native fintech app with portfolio tracking, transaction history, card management, budget tracking, and biometric auth. Expo + TypeScript + Zustand.

## Quick Start

```bash
git clone https://github.com/Shaisolaris/rn-fintech-app.git
cd rn-fintech-app
npm install --legacy-peer-deps
npx expo start
```

React Native fintech application built with Expo, featuring portfolio management with interactive SVG charts, transaction history with filters, payment card management with freeze/unfreeze, budget tracking, and biometric authentication. Uses Zustand for state management and TypeScript throughout.

## Stack

- **Framework:** React Native 0.74 with Expo SDK 51
- **Language:** TypeScript 5 strict mode
- **Navigation:** React Navigation 6 (native stack + bottom tabs)
- **State:** Zustand
- **Charts:** react-native-svg (custom SVG path rendering)
- **Auth:** expo-local-authentication (Face ID / Touch ID), expo-secure-store
- **Styling:** StyleSheet API with centralized theme

## Features

### Portfolio Management
- Total balance with gain/loss percentage
- Interactive line chart with SVG path rendering and gradient fill
- Time range selector (1D, 1W, 1M, 3M, 1Y, ALL)
- Holdings list with 24h change, total value, and gain per position
- Asset types: stocks, crypto, ETFs, bonds

### Transaction History
- Scrollable transaction feed with type-specific icons
- Filter bar: all, deposit, withdrawal, buy, sell, dividend
- Status indicators (completed, pending, failed)
- Amount formatting with positive/negative color coding
- Date and counterparty display

### Card Management
- Horizontal card carousel with paginated scrolling
- Card design with gradient backgrounds
- Spend tracking with progress bar (spent vs limit)
- Freeze/unfreeze toggle per card
- Virtual and physical card support

### Biometric Authentication
- Face ID / Touch ID / Fingerprint support via expo-local-authentication
- Secure token storage via expo-secure-store
- Fallback to email/password login
- Biometric enable/disable toggle in profile

### Budget Tracking
- Category-based budget meters with progress bars
- Spent vs budget comparison per category
- Overage detection with color change

## Architecture

```
src/
├── App.tsx                          # Root component with SafeAreaProvider
├── navigation/
│   └── AppNavigator.tsx             # Stack + Tab navigation with auth gate
├── screens/
│   ├── LoginScreen.tsx              # Email/password + biometric auth
│   ├── HomeScreen.tsx               # Balance, stats, holdings, transactions, budget
│   ├── PortfolioScreen.tsx          # Chart + full holdings list
│   ├── TransactionsScreen.tsx       # Filtered transaction list
│   ├── CardsScreen.tsx              # Card carousel + freeze controls
│   └── ProfileScreen.tsx            # Settings, biometric toggle, sign out
├── components/
│   ├── charts/
│   │   └── PortfolioChart.tsx       # SVG line chart with gradient, time range pills
│   ├── cards/
│   │   ├── HoldingRow.tsx           # Asset row with symbol, value, 24h change
│   │   └── PaymentCard.tsx          # Card UI with spend progress bar
│   ├── transactions/
│   │   └── TransactionRow.tsx       # Transaction with type icon, amount, status
│   └── common/
│       ├── ScreenHeader.tsx         # Title + subtitle + optional action
│       ├── StatCard.tsx             # KPI card with label, value, trend
│       └── BudgetRow.tsx            # Category budget meter
├── store/
│   └── index.ts                     # Zustand store (auth, portfolio, transactions, cards, budget)
├── services/
│   ├── biometric.ts                 # Biometric auth + SecureStore wrappers
│   └── mockData.ts                  # Realistic seed data (users, holdings, transactions, cards, budgets)
├── hooks/                           # (extensible — add custom hooks here)
├── theme/
│   └── index.ts                     # Colors, spacing, fontSize, borderRadius
├── types/
│   └── index.ts                     # All TypeScript interfaces + navigation types
└── utils/
    └── format.ts                    # formatCurrency, formatPercent, formatDate, maskCardNumber
```

## Setup

```bash
git clone https://github.com/Shaisolaris/rn-fintech-app.git
cd rn-fintech-app
npm install

# Start Expo
npx expo start

# Run on device/simulator
npx expo start --ios
npx expo start --android
```

## Key Design Decisions

**Custom SVG chart rendering.** The portfolio chart builds SVG paths from data points rather than using a charting library. This gives full control over the gradient fill, stroke styling, and animation without adding a heavy dependency. The `buildPath` function normalizes values to chart dimensions and generates both the line path and the fill area path.

**Zustand over Context/Redux.** Zustand provides a minimal, hook-based store with no boilerplate. The single store file manages auth, portfolio, transactions, cards, and budget state. Each screen selects only the slices it needs via selector functions, preventing unnecessary re-renders.

**Auth-gated navigation.** The `AppNavigator` conditionally renders either the auth stack or the main tab stack based on `isAuthenticated` from the store. There is no "logged out but can see dashboard" state. This matches production fintech apps where every screen requires authentication.

**Biometric with graceful fallback.** The biometric service checks hardware availability before attempting authentication. If biometrics are unavailable or fail, the user falls back to email/password. Token storage uses expo-secure-store (hardware-backed keychain on iOS, encrypted SharedPreferences on Android).

**Dark-first theme.** Fintech apps overwhelmingly use dark themes. The color palette uses deep navy backgrounds with high-contrast text and vibrant accent colors. All colors are centralized in the theme file for consistency.

**Mock data with realistic distribution.** Holdings include a mix of stocks, crypto, and ETFs at realistic price points. Transactions span multiple types with proper date ordering. Cards have spend tracking against limits. Budget categories use common spending patterns.

## License

MIT
