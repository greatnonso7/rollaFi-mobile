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
  AddMeter: undefined;
  AddMeterName: undefined;
  EditProfile: undefined;
  BillBeneficiaries: undefined;
  ChangePassword: undefined;
  ChangeTransactionPIN: undefined;
  ConfirmTransactionPIN: {pin: string};
  GetSupport: undefined;
  ManageMeters: undefined;
  Terms: undefined;
  EditBillBeneficiary: {beneficiary?: any};
  EnterBVN: undefined;
  VerifyBvn: undefined;
  More: undefined;
  CompleteWalletCreation: undefined;
  Airtime: undefined;
  ReviewDetails: {data: any};
  PurchaseSuccessful: {data: any};
  Transactions: undefined;
  SingleTransaction: {transaction: any};
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
