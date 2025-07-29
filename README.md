# RollaFi - React Native Mobile App

A comprehensive React Native mobile application for digital wallet management, currency conversion, and financial transactions.

## 🚀 Features

### Authentication & Onboarding

- **Invite Code System** - Private beta access with invite code validation
- **OTP Verification** - SMS verification with test code `123456`
- **PIN Setup** - Secure 6-digit PIN for wallet access
- **KYC Integration** - Identity verification with WebView integration

### Dashboard & Wallet Management

- **Multi-Currency Wallets** - USD and NGN wallet support
- **Real-time Balances** - Live wallet balance display
- **FX Rate Display** - Current USD to NGN exchange rates
- **Scrollable Currency Cards** - Horizontal wallet display with pagination
- **Dark Mode Support** - Complete dark/light theme implementation

### Financial Operations

- **Fund Wallet** - Add funds to NGN wallet (₦10,000 minimum)
- **Send Money** - Transfer funds to other users
  - USD: $100 minimum
  - NGN: ₦1,000 minimum
- **Convert Funds** - NGN to USD conversion
  - ₦10,000 minimum conversion
  - 2% conversion fee
  - Real-time rate calculation
- **Recent Transactions** - Transaction history with status indicators

### Navigation & UX

- **Deep Link Support** - Seamless app navigation via URLs
- **Bottom Tab Navigation** - Home, Insights, Account, Wallet
- **Modal System** - Get Invite Code, KYC verification
- **Toast Notifications** - Success, error, and warning messages
- **Responsive Design** - Adaptive layouts for different screen sizes

## 📱 Deep Link Configuration

### Onboarding Deep Link

```
rollafi://onboarding/INVITE123
```

**Parameters:**

- `INVITE123` - Your invite code (replace with actual code)

### Deep Link Structure

```
rollafi://onboarding/{inviteCode}?source={source}
```

**Example URLs:**

- `rollafi://onboarding/ROLLA2024`
- `rollafi://onboarding/ROLLA2024?source=website`
- `rollafi://onboarding/ROLLA2024?source=email`

## 🛠 Setup Instructions

### Prerequisites

- Node.js >= 18
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd rollaFi
```

2. **Install dependencies**

```bash
yarn install
```

3. **iOS Setup**

```bash
cd ios
pod install
cd ..
```

4. **Start Metro bundler**

```bash
yarn start
```

5. **Run on device/simulator**

**iOS:**

```bash
yarn ios
```

**Android:**

```bash
yarn android
```

## 🧪 Testing

### OTP Verification

- **Test Code:** `123456`
- **Any other code:** Will show error message

### Deep Link Testing

**iOS Simulator:**

```bash
xcrun simctl openurl booted "rollafi://onboarding/ROLLA2024"
```

**Android Emulator:**

```bash
adb shell am start -W -a android.intent.action.VIEW -d "rollafi://onboarding/ROLLA2024" com.rollafi
```

### Test Scenarios

1. **Onboarding Flow:**

   - Open deep link with invite code
   - Complete registration
   - Verify with OTP code `123456`
   - Set 6-digit PIN

2. **Dashboard Access:**

   - Login with PIN
   - View wallet balances
   - Test dark mode toggle

3. **Financial Operations:**
   - Fund wallet (₦10,000 minimum)
   - Send money (currency-specific minimums)
   - Convert NGN to USD (₦10,000 minimum)

## 📁 Project Structure

```
src/
├── assets/           # Images, fonts, SVG icons
├── design-system/    # Reusable UI components
├── navigation/       # Navigation configuration
├── screens/          # App screens
│   ├── auth/        # Authentication screens
│   └── dashboard/   # Dashboard screens
├── shared/          # Shared components
├── store/           # Zustand state management
├── theme/           # Theme configuration
├── types/           # TypeScript definitions
└── utils/           # Utility functions
```

## 🔧 Key Dependencies

### Core

- **React Native:** 0.76.9
- **React Navigation:** 7.x
- **Zustand:** State management
- **React Hook Form:** Form handling

### UI & UX

- **React Native Blur:** Blur effects
- **React Native SVG:** Vector graphics
- **React Native Flash Message:** Toast notifications
- **React Native Modal:** Modal components

### Development

- **TypeScript:** Type safety
- **ESLint:** Code linting
- **Prettier:** Code formatting

## 🎨 Design System

### Colors

- **Primary:** Brand colors
- **Grey Scale:** Text and backgrounds
- **Status Colors:** Success, warning, error

### Typography

- **Font Family:** GeneralSans
- **Variants:** h1, h2, body, bodySmall, etc.

### Components

- **Box:** Layout container
- **Text:** Typography component
- **Button:** Interactive buttons
- **Input:** Form inputs
- **Modal:** Overlay components

## 🔐 Security Features

### PIN Security

- 6-digit numeric PIN
- Secure storage
- PIN validation

### KYC Integration

- WebView-based verification
- Auto-close after completion
- Verification status tracking

### Deep Link Security

- Invite code validation
- Source tracking
- Secure URL parsing

## 📊 State Management

### Zustand Store

```typescript
interface RollaFiStore {
  // User data
  userData: UserData;

  // Wallet management
  walletBalance: WalletBalance;
  activeWallet: Wallet;

  // Deep link data
  deepLinkData: DeepLinkData;

  // Actions
  updateWalletBalance: (balance: WalletBalance) => void;
  updateKYCStatus: (status: KYCStatus) => void;
  setDeepLinkData: (data: DeepLinkData) => void;
}
```

## 🚨 Known Issues

### iOS Build Issues

- `_RNSBottomTabsCls` undefined symbol
- `react-native-screens` unimplemented components

**Temporary Solutions:**

```bash
# Clean iOS build
rm -rf ios/build
rm -rf ios/Pods
rm -rf ios/Podfile.lock

# Reinstall pods
cd ios && pod install && cd ..
```

### Android Deep Link

- `URL.pathname` not implemented on Android
- Manual string parsing implemented as workaround

## 🔄 Development Workflow

1. **Feature Development:**

   - Create feature branch
   - Implement functionality
   - Add TypeScript types
   - Test on both platforms

2. **Testing:**

   - Test deep links
   - Verify OTP flow
   - Check wallet operations
   - Validate UI responsiveness

3. **Code Quality:**
   - Run ESLint: `yarn lint`
   - Format code: `yarn prettier`
   - Type checking: `tsc --noEmit`

## 📱 Platform Support

### iOS

- **Minimum Version:** iOS 12.0
- **Architecture:** arm64, x86_64
- **Devices:** iPhone, iPad

### Android

- **Minimum SDK:** API 21
- **Target SDK:** API 33
- **Architecture:** arm64-v8a, armeabi-v7a, x86_64

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Implement changes
4. Add tests if applicable
5. Submit pull request

## 📄 License

This project is proprietary software. All rights reserved.

---

**Note:** This is a private beta application. Access requires a valid invite code. For more information, visit [rollafi.com](https://rollafi.com).
