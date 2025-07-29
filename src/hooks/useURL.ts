import {useEffect, useCallback, useState} from 'react';
import {Linking} from 'react-native';

export const useURL = () => {
  const [link, setLink] = useState<string>();
  const handleUrlChange = useCallback(({url}: {url: string}) => {
    setLink(url);
  }, []);

  useEffect(() => {
    (async () => {
      const initialUrl = await Linking.getInitialURL();

      if (!initialUrl) {
        return;
      }

      handleUrlChange({url: initialUrl});
    })();

    // Add the event listener
    const subscription = Linking.addEventListener('url', handleUrlChange);

    // Return cleanup function that removes the specific listener
    return () => {
      subscription?.remove();
    };
  }, [handleUrlChange]);

  return link;
};
