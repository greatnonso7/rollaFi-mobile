import {DeepLinkEnum} from 'hooks/useDeepLinks';
import React, {useState, createContext, useCallback} from 'react';

export interface IDeepLink {
  id: string;
  type: DeepLinkEnum;
  action: () => void | Promise<void>;
}

export type DeepLinkContextType = {
  deepLinksState: IDeepLink[];
  addDeepLink: (link: IDeepLink) => void;
  removeDeepLink: (id: string) => void;
};

export const DeepLinkContext = createContext<DeepLinkContextType>({
  deepLinksState: [],
  addDeepLink: () => {},
  removeDeepLink: () => {},
});

export const DeepLinkProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [deepLinksState, setDeepLinksState] = useState<IDeepLink[]>([]);

  const addDeepLink = useCallback((link: IDeepLink) => {
    setDeepLinksState(prevDeepLinks => [...prevDeepLinks, link]);
  }, []);

  const removeDeepLink = useCallback((id: string) => {
    setDeepLinksState(prevDeepLinks =>
      prevDeepLinks.filter(link => link.id !== id),
    );
  }, []);

  return (
    <DeepLinkContext.Provider
      value={{deepLinksState, addDeepLink, removeDeepLink}}>
      {children}
    </DeepLinkContext.Provider>
  );
};
