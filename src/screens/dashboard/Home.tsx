import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon, Screen} from 'shared';
import {Box, Text, Button} from 'design-system';
import {useRollaFiStore} from 'store';
import theme from 'theme';
import {deviceWidth, fontSz, hp, wp} from 'utils';
import {useDarkTheme} from 'theme/dark-mode';
import {CompleteKyc, WalletContainer} from './components';
import {activeWalletList} from 'data';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DashboardStackParamList} from 'types';
import {showMessage} from 'react-native-flash-message';
import {OtherTopUp} from './Modals';

export const Home = () => {
  const {userData, updateKYCStatus, activeWallet, setActiveWallet} =
    useRollaFiStore();
  const {themeColor} = useDarkTheme();
  const [open, setOpen] = useState<'other-top-up' | ''>('');

  const {navigate} = useNavigation<NavigationProp<DashboardStackParamList>>();

  const [sliderState, setSliderState] = useState({currentPage: 0});
  const setSliderPage = (event: any) => {
    const {currentPage} = sliderState;
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.round(x / deviceWidth);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
      setActiveWallet(activeWalletList[indexOfNextScreen]);
    }
  };

  const scrollViewRef = useRef<ScrollView>(null);

  const handleKYCVerification = () => {
    const handleVerificationComplete = () => {
      // Update KYC status in store
      updateKYCStatus('verified');

      // Show success toast
      showMessage({
        message: 'Your identity has been verified successfully.',
        type: 'success',
        duration: 3000,
      });
    };

    navigate('RollaFiWebView', {
      uri: 'https://www.rollafi.com',
      title: 'RollaFi KYC',
      autoCloseAfter: 20,
      onVerificationComplete: handleVerificationComplete,
    });
  };

  const onPressWalletOption = async (option: any) => {
    if (option.title === 'Deposit') {
      if (activeWallet?.currency === 'NGN') {
        navigate('FundWallet', {activeWallet});
      } else {
        setOpen('other-top-up');
      }
    } else if (option.title === 'Withdraw') {
      navigate('SendFunds', {activeWallet});
    } else if (option.title === 'Swap') {
      navigate('ConvertFunds', {activeWallet});
    }
  };

  console.log(activeWallet);

  return (
    <Screen removeSafeaArea>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}

        <Box style={styles.header} mx={wp(16)}>
          <Text
            variant="bodyBold"
            fontSize={fontSz(24)}
            color={themeColor.BODY_MAIN_TEXT}>
            Welcome back! 👋
          </Text>
          <Text variant="bodyMedium" style={styles.subtitleText}>
            Here's your financial overview
          </Text>
        </Box>

        <Box>
          <CompleteKyc handleKYCVerification={handleKYCVerification} />
          <Box>
            <ScrollView
              horizontal
              ref={scrollViewRef}
              pagingEnabled
              onScroll={event => setSliderPage(event)}
              showsHorizontalScrollIndicator={false}>
              {activeWalletList?.map(wallet => (
                <WalletContainer key={wallet.id} wallet={wallet} />
              ))}
            </ScrollView>

            <Box
              position={'absolute'}
              bottom={hp(40)}
              alignSelf={'center'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'row'}>
              {Array.from(Array(activeWalletList?.length).keys()).map(
                (key, index) => (
                  <Box
                    width={sliderState.currentPage === index ? wp(30) : 10}
                    height={10}
                    borderRadius={
                      sliderState.currentPage === index ? hp(12) : 100
                    }
                    ml={2}
                    backgroundColor={
                      sliderState.currentPage === index
                        ? themeColor.BODY_MAIN_TEXT
                        : theme.colors.GREY_600
                    }
                    key={index}
                  />
                ),
              )}
            </Box>
          </Box>

          <Box
            bottom={hp(20)}
            flexDirection={'row'}
            width={wp(318)}
            alignSelf={'center'}
            justifyContent={'space-around'}
            alignItems={'center'}>
            {activeWalletList[0]?.options?.map((option: any) => {
              return (
                <Box
                  key={option.id}
                  as={TouchableOpacity}
                  activeOpacity={0.8}
                  onPress={() => onPressWalletOption(option)}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <Box
                    width={54}
                    height={54}
                    borderWidth={1}
                    borderColor={themeColor.WALLET_BG}
                    bg={themeColor.LIST_ITEM_BG}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderRadius={100}>
                    <Icon
                      name={option.icon}
                      color={themeColor.BODY_MAIN_TEXT}
                    />
                  </Box>
                  <Text
                    pt={1}
                    variant="bodyMedium"
                    fontSize={fontSz(14)}
                    lineHeight={hp(19)}
                    color={themeColor.BODY_MAIN_TEXT}>
                    {option.title}
                  </Text>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* FX Rate Card */}
        <Box style={styles.fxRateCard} mx={wp(16)}>
          <Box style={styles.fxHeader}>
            <Text variant="headerMedium" style={styles.fxTitle}>
              Exchange Rate
            </Text>
            <Box style={styles.rateBadge}>
              <Text style={styles.rateText}>Live</Text>
            </Box>
          </Box>

          <Box style={styles.rateDisplay}>
            <Text style={styles.rateAmount}>1 USD = ₦1,500.00</Text>
            <Text style={styles.rateTimestamp}>
              Last updated: {new Date().toLocaleTimeString()}
            </Text>
          </Box>
        </Box>

        {/* KYC Status Section */}
        <Box style={styles.kycSection} mx={wp(16)}>
          <Text variant="headerBold" style={styles.sectionTitle}>
            Identity Verification
          </Text>

          <Box
            style={[
              styles.kycCard,
              userData?.isVerified
                ? styles.verifiedCard
                : styles.unverifiedCard,
            ]}>
            <Box style={styles.kycContent}>
              <Box style={styles.kycIcon}>
                {userData?.isVerified ? (
                  <Text style={styles.checkIcon}>✓</Text>
                ) : (
                  <Text style={styles.warningIcon}>!</Text>
                )}
              </Box>

              <Box style={styles.kycText}>
                <Text style={styles.kycStatus}>
                  {userData?.isVerified
                    ? 'Identity Verified'
                    : 'Identity Not Verified'}
                </Text>
                <Text style={styles.kycDescription}>
                  {userData?.isVerified
                    ? 'Your account is fully verified and ready for all transactions.'
                    : 'Complete KYC to unlock all features including deposits and withdrawals.'}
                </Text>
              </Box>
            </Box>

            {!userData?.isVerified && (
              <Button
                title="Verify Identity"
                isNotBottom
                width={'100%'}
                onPress={handleKYCVerification}
                backgroundColor={theme.colors.PRIMARY}
                textColor="#FFF"
                containerStyle={styles.kycButton}
              />
            )}
          </Box>
        </Box>
      </ScrollView>

      <OtherTopUp
        isVisible={open === 'other-top-up'}
        onClose={() => setOpen('')}
        onComplete={() => setOpen('')}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: hp(20),
  },
  header: {
    marginTop: hp(20),
    marginBottom: hp(30),
  },

  subtitleText: {
    color: theme.colors.GREY_600,
  },

  sectionTitle: {
    marginBottom: hp(15),
    color: theme.colors.APP_BLACK_100,
    fontWeight: '600',
  },

  fxRateCard: {
    backgroundColor: '#FFF',
    padding: wp(20),
    borderRadius: wp(16),
    marginBottom: hp(25),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  fxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(12),
  },
  fxTitle: {
    color: theme.colors.APP_BLACK_100,
    fontWeight: '600',
  },
  rateBadge: {
    backgroundColor: theme.colors.PRIMARY,
    paddingHorizontal: wp(8),
    paddingVertical: hp(4),
    borderRadius: wp(12),
  },
  rateText: {
    color: '#FFF',
    fontSize: wp(10),
    fontWeight: '600',
  },
  rateDisplay: {
    alignItems: 'center',
  },
  rateAmount: {
    fontSize: wp(18),
    fontWeight: 'bold',
    color: theme.colors.APP_BLACK_100,
    marginBottom: hp(4),
  },
  rateTimestamp: {
    fontSize: wp(12),
    color: theme.colors.GREY_600,
  },
  kycSection: {
    marginBottom: hp(25),
  },
  kycCard: {
    padding: wp(20),
    borderRadius: wp(16),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  verifiedCard: {
    backgroundColor: '#E8F5E8',
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.PRIMARY,
  },
  unverifiedCard: {
    backgroundColor: '#FFF3CD',
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  kycContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(15),
  },
  kycIcon: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(12),
  },
  checkIcon: {
    fontSize: wp(20),
    color: '#FFF',
    fontWeight: 'bold',
  },
  warningIcon: {
    fontSize: wp(20),
    color: '#FFF',
    fontWeight: 'bold',
  },
  kycText: {
    flex: 1,
  },
  kycStatus: {
    fontSize: wp(16),
    fontWeight: '600',
    color: theme.colors.APP_BLACK_100,
    marginBottom: hp(4),
  },
  kycDescription: {
    fontSize: wp(14),
    color: theme.colors.GREY_600,
    lineHeight: wp(20),
  },
  kycButton: {
    backgroundColor: theme.colors.PRIMARY,
    paddingVertical: hp(12),
    borderRadius: wp(8),
  },
});
