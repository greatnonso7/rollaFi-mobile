/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {WebView} from 'react-native-webview';
import {Box, Text, Button} from 'design-system';
import {Screen} from 'shared';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {hp, wp} from 'utils';
import theme from 'theme';
import {useDarkTheme} from 'theme/dark-mode';
import {DashboardStackParamList} from 'types';

export const RollaFiWebView = () => {
  const {uri, title, autoCloseAfter, onVerificationComplete} =
    useRoute<RouteProp<DashboardStackParamList, 'RollaFiWebView'>>().params;
  const navigation = useNavigation();
  const {themeColor} = useDarkTheme();
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentTitle, setTitle] = useState(title || '');
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(autoCloseAfter || 0);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = useCallback(() => {
    // Clear any existing countdown
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }

    // Call the verification complete callback if provided
    if (onVerificationComplete) {
      onVerificationComplete();
    }

    // Navigate back to previous screen
    navigation.goBack();
  }, [navigation, onVerificationComplete]);

  // Auto-close functionality
  useEffect(() => {
    if (autoCloseAfter && autoCloseAfter > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            // Close WebView and return to previous screen
            handleClose();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      countdownRef.current = timer;

      return () => {
        if (countdownRef.current) {
          clearInterval(countdownRef.current);
        }
      };
    }
  }, [autoCloseAfter, handleClose]);

  const handleGoBack = () => {
    if (canGoBack) {
      webViewRef.current?.goBack();
    } else {
      handleClose();
    }
  };

  const handleGoForward = () => {
    if (canGoForward) {
      webViewRef.current?.goForward();
    }
  };

  const handleRefresh = () => {
    webViewRef.current?.reload();
  };

  // Handle messages from WebView (for verification completion)
  const onMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      // Check if verification is completed
      if (data.type === 'verification_completed' || data.status === 'success') {
        // Call the verification complete callback
        if (onVerificationComplete) {
          onVerificationComplete();
        }

        // Close the WebView
        handleClose();
      }
    } catch (error) {
      console.log('WebView message received:', event.nativeEvent.data);
    }
  };

  // JavaScript to inject for detecting verification completion
  const injectedJavaScript = `
    (function() {
      // Listen for URL changes that might indicate completion
      let currentUrl = window.location.href;
      
      // Check for verification completion patterns
      function checkVerificationStatus() {
        const url = window.location.href;
        const urlParams = new URLSearchParams(window.location.search);
        
        // Common verification completion patterns
        if (url.includes('success') || 
            url.includes('completed') || 
            url.includes('verified') ||
            urlParams.get('status') === 'success' ||
            urlParams.get('verification') === 'completed') {
          
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'verification_completed',
            status: 'success',
            url: url
          }));
        }
      }
      
      // Check on page load
      checkVerificationStatus();
      
      // Listen for URL changes
      let lastUrl = window.location.href;
      new MutationObserver(() => {
        const url = window.location.href;
        if (url !== lastUrl) {
          lastUrl = url;
          checkVerificationStatus();
        }
      }).observe(document, {subtree: true, childList: true});
      
      // Also check periodically
      setInterval(checkVerificationStatus, 2000);
      
      true;
    })();
  `;

  // called when the navigation state changes (page load)
  const onNavigationStateChange = async (navState: {
    canGoForward: any;
    canGoBack: any;
    title: any;
    url: any;
    loading: boolean;
  }) => {
    const {canGoForward, canGoBack, title, loading} = navState;

    console.log(navState, 'navState');

    setCanGoForward(canGoForward);
    setCanGoBack(canGoBack);
    setTitle(title);
    setIsLoading(loading);
  };

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onLoadEnd = () => {
    setIsLoading(false);
  };

  return (
    <Screen removeSafeaArea>
      {/* Header */}
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        px={wp(16)}
        py={hp(12)}
        backgroundColor={themeColor.LIST_ITEM_BG}
        borderBottomWidth={1}
        borderBottomColor={themeColor.INNER_BORDER}>
        {/* Left side - Back button */}
        <Box flexDirection="row" alignItems="center">
          <Button
            title="←"
            onPress={handleGoBack}
            backgroundColor="transparent"
            textColor={themeColor.BODY_MAIN_TEXT}
            containerStyle={{width: wp(40), height: wp(40)}}
          />

          {/* Auto-close countdown */}
          {autoCloseAfter && countdown > 0 && (
            <Box
              backgroundColor={theme.colors.PRIMARY}
              px={wp(8)}
              py={hp(4)}
              borderRadius={wp(12)}
              ml={wp(8)}>
              <Text
                variant="bodySmall"
                color="#FFF"
                fontSize={wp(12)}
                fontWeight="600">
                Auto-close in {countdown}s
              </Text>
            </Box>
          )}
        </Box>

        {/* Center - Title */}
        <Box flex={1} alignItems="center">
          <Text
            variant="bodyMedium"
            color={themeColor.BODY_MAIN_TEXT}
            fontSize={wp(16)}
            fontWeight="600"
            numberOfLines={1}>
            {currentTitle || 'Loading...'}
          </Text>
        </Box>

        {/* Right side - Action buttons */}
        <Box flexDirection="row" alignItems="center">
          <Button
            title="⟳"
            onPress={handleRefresh}
            backgroundColor="transparent"
            textColor={themeColor.BODY_MAIN_TEXT}
            containerStyle={{width: wp(40), height: wp(40)}}
          />

          <Button
            title="→"
            onPress={handleGoForward}
            backgroundColor="transparent"
            textColor={
              canGoForward
                ? themeColor.BODY_MAIN_TEXT
                : themeColor.BODY_TEXT_COLOR
            }
            containerStyle={{width: wp(40), height: wp(40)}}
          />

          <Button
            title="✕"
            onPress={handleClose}
            backgroundColor="transparent"
            textColor={themeColor.BODY_MAIN_TEXT}
            containerStyle={{width: wp(40), height: wp(40)}}
          />
        </Box>
      </Box>

      {/* WebView */}
      <Box flex={1}>
        <WebView
          ref={webViewRef}
          source={{uri}}
          onNavigationStateChange={onNavigationStateChange}
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
          onMessage={onMessage}
          injectedJavaScript={injectedJavaScript}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          style={{flex: 1}}
        />
      </Box>

      {/* Loading indicator */}
      {isLoading && (
        <Box
          position="absolute"
          top={hp(60)}
          left={wp(16)}
          right={wp(16)}
          backgroundColor={themeColor.LIST_ITEM_BG}
          borderRadius={wp(8)}
          p={wp(12)}
          alignItems="center">
          <Text variant="bodyMedium" color={themeColor.BODY_MAIN_TEXT}>
            Loading...
          </Text>
        </Box>
      )}
    </Screen>
  );
};
