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

  // Deep link data management
  deepLinkData: DeepLinkData | null;
  setDeepLinkData: (data: DeepLinkData) => void;
  clearDeepLinkData: () => void;
  getDeepLinkData: () => DeepLinkData | null;
}

const rollaFiSlice: StateCreator<
  RollaFiStore,
  [['zustand/persist', unknown]]
> = set => ({
  isDark: false,
  isLoggedIn: false,
  currentTheme: null,
  deepLinkData: null,

  setIsDark: (isDark: boolean) => set({isDark}),
  setCurrentTheme: (data: {
    theme: string;
    status: string;
    isDefault: boolean;
  }) => set({currentTheme: data}),
  completeLogin: () => set({isLoggedIn: true}),

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
