import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  AppDashboard: NavigatorScreenParams<DashboardStackParamList>;
};

export type AuthStackParamList = {
  Onboarding: {inviteCode?: string};
  Login: {inviteCode?: string};
  VerifyLogin: undefined;
};

export type DashboardStackParamList = {
  Dashboard: BottomTabStackParamList;
  RollaFiWebView: {
    uri: string;
    title?: string;
    autoCloseAfter?: number;
    onVerificationComplete?: () => void;
  };
  USDTWalletInfo: undefined;
  SendFunds: {activeWallet: any};
  ConvertFunds: {activeWallet: any};
};

export type BottomTabStackParamList = {
  Home: undefined;
  Swap: undefined;
  Account: undefined;
};

export type CurrentTheme = {
  theme: string;
  status: string;
  isDefault: boolean;
};
