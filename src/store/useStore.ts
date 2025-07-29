import AsyncStorage from '@react-native-async-storage/async-storage';
import {CurrentTheme} from 'types';
import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface DeepLinkData {
  inviteCode?: string;
  source?: string;
  timestamp: number;
  url: string;
}

interface WalletBalance {
  USD: number;
  NGN: number;
}

interface FXRate {
  USD_TO_NGN: number;
  lastUpdated: string;
}

interface UserData {
  isVerified: boolean;
  walletBalance: WalletBalance;
  fxRate: FXRate;
  kycStatus: 'pending' | 'verified' | 'rejected' | 'not_started';
}

interface RollaFiStore {
  isDark: boolean;
  isLoggedIn: boolean;
  setIsDark: (isDark: boolean) => void;
  currentTheme: CurrentTheme | null;
  setCurrentTheme: (data: {
    theme: string;
    status: string;
    isDefault: boolean;
  }) => void;

  completeLogin: () => void;

  // User data management
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  updateKYCStatus: (status: UserData['kycStatus']) => void;
  updateWalletBalance: (balance: Partial<WalletBalance>) => void;
  updateFXRate: (rate: number) => void;

  // Show balance management
  showBalance: boolean;
  setShowBalance: (showBalance: boolean) => void;

  // Deep link data management
  deepLinkData: DeepLinkData | null;
  setDeepLinkData: (data: DeepLinkData) => void;
  clearDeepLinkData: () => void;
  getDeepLinkData: () => DeepLinkData | null;

  // Active wallet management
  activeWallet: any;
  setActiveWallet: (wallet: any) => void;
}

const rollaFiSlice: StateCreator<
  RollaFiStore,
  [['zustand/persist', unknown]]
> = set => ({
  isDark: false,
  isLoggedIn: false,
  currentTheme: null,
  deepLinkData: null,
  userData: {
    isVerified: false,
    walletBalance: {
      USD: 0,
      NGN: 0,
    },
    fxRate: {
      USD_TO_NGN: 1500, // Default rate
      lastUpdated: new Date().toISOString(),
    },
    kycStatus: 'not_started',
  },
  showBalance: false,
  setShowBalance: (showBalance: boolean) => set({showBalance}),

  // Active wallet management
  activeWallet: null,
  setActiveWallet: (wallet: any) => set({activeWallet: wallet}),

  setIsDark: (isDark: boolean) => set({isDark}),
  setCurrentTheme: (data: {
    theme: string;
    status: string;
    isDefault: boolean;
  }) => set({currentTheme: data}),
  completeLogin: () => set({isLoggedIn: true}),

  // User data methods
  updateUserData: (data: Partial<UserData>) =>
    set(state => ({
      userData: {...state.userData, ...data},
    })),
  updateKYCStatus: (status: UserData['kycStatus']) =>
    set(state => ({
      userData: {
        ...state.userData,
        kycStatus: status,
        isVerified: status === 'verified',
      },
    })),
  updateWalletBalance: (balance: Partial<WalletBalance>) =>
    set(state => ({
      userData: {
        ...state.userData,
        walletBalance: {...state.userData.walletBalance, ...balance},
      },
    })),
  updateFXRate: (rate: number) =>
    set(state => ({
      userData: {
        ...state.userData,
        fxRate: {
          USD_TO_NGN: rate,
          lastUpdated: new Date().toISOString(),
        },
      },
    })),

  // Deep link data methods
  setDeepLinkData: (data: DeepLinkData) => set({deepLinkData: data}),
  clearDeepLinkData: () => set({deepLinkData: null}),
  getDeepLinkData: () => {
    // This will be handled by the getter in the store
    return null;
  },
});

export const useRollaFiStore = create<RollaFiStore>()(
  persist(rollaFiSlice, {
    name: 'rolla-fi-storage',
    storage: createJSONStorage(() => AsyncStorage),
  }),
);

// Add getter for deep link data
export const getDeepLinkData = () => useRollaFiStore.getState().deepLinkData;
