import React, {useState} from 'react';
import {AvoidingView, Header, HeaderText, Screen} from 'shared';
import {ScrollView} from 'react-native';
import {Box, RegularInput, Button, Text} from 'design-system';
import {convertToNumber, formatNumberWithCommas, hp, wp} from 'utils';
import {useForm} from 'react-hook-form';
import {useRollaFiStore} from 'store';
import {showMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';
import {useDarkTheme} from 'theme/dark-mode';

interface FormData {
  currencyFrom: string;
  currencyTo: string;
}

export const ConvertFunds = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [exchangeRate] = useState(1500); // 1 USD = 1500 NGN
  const [conversionFee] = useState(0.02); // 2% fee
  const {userData, updateWalletBalance} = useRollaFiStore();
  const {goBack} = useNavigation();

  const {themeColor} = useDarkTheme();

  const {
    control,
    watch,
    setValue,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      currencyFrom: '',
      currencyTo: '',
    },
  });

  const form = watch();

  // Calculate exchange rate and conversion
  const calculateConversion = (ngnAmount: number) => {
    if (ngnAmount <= 0) {
      setValue('currencyTo', '');
      return;
    }

    // Calculate USD amount after fees
    const feeAmount = ngnAmount * conversionFee;
    const amountAfterFees = ngnAmount - feeAmount;
    const usdAmount = amountAfterFees / exchangeRate;

    // Format USD amount
    const formattedUsd = formatNumberWithCommas(usdAmount.toFixed(2));
    setValue('currencyTo', formattedUsd);
  };

  // Handle NGN input changes
  const handleNGNChange = (text: string) => {
    const formattedText = formatNumberWithCommas(text);
    setValue('currencyFrom', formattedText);

    const ngnAmount = convertToNumber(formattedText);
    calculateConversion(ngnAmount);

    // Validate balance
    const currentBalance = userData?.walletBalance?.NGN || 0;
    if (ngnAmount > currentBalance) {
      // You can set an error state here if needed
      console.log('Insufficient NGN balance');
    }
  };

  // Handle USD input changes (reverse calculation)
  const handleUSDChange = (text: string) => {
    const formattedText = formatNumberWithCommas(text);
    setValue('currencyTo', formattedText);

    const usdAmount = convertToNumber(formattedText);
    if (usdAmount <= 0) {
      setValue('currencyFrom', '');
      return;
    }

    // Calculate NGN amount needed (including fees)
    const ngnNeeded = usdAmount * exchangeRate;
    const ngnWithFees = ngnNeeded / (1 - conversionFee);

    const formattedNgn = formatNumberWithCommas(ngnWithFees.toFixed(2));
    setValue('currencyFrom', formattedNgn);
  };

  // Perform the conversion
  const performConversion = async () => {
    try {
      setIsLoading(true);

      const ngnAmount = convertToNumber(form.currencyFrom);
      const usdAmount = convertToNumber(form.currencyTo);

      // Validate minimum amount
      const minimumNgnAmount = 10000; // ₦10,000 minimum
      if (ngnAmount < minimumNgnAmount) {
        showMessage({
          message: `Minimum conversion amount is ₦${formatNumberWithCommas(
            minimumNgnAmount.toString(),
          )}`,
          type: 'danger',
          duration: 3000,
        });
        return;
      }

      // Validate amounts
      if (ngnAmount <= 0 || usdAmount <= 0) {
        showMessage({
          message: 'Please enter a valid amount to convert',
          type: 'danger',
          duration: 3000,
        });
        return;
      }

      // Validate KYC status
      if (!userData?.isVerified) {
        showMessage({
          message: 'Please complete your identity verification first',
          type: 'warning',
          duration: 3000,
        });
        return;
      }

      // Validate NGN balance
      const currentNgnBalance = userData?.walletBalance?.NGN || 0;
      if (ngnAmount > currentNgnBalance) {
        showMessage({
          message: `You don't have enough NGN. Current balance: ₦${formatNumberWithCommas(
            currentNgnBalance.toString(),
          )}`,
          type: 'danger',
          duration: 3000,
        });
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update wallet balances
      const newNgnBalance = currentNgnBalance - ngnAmount;
      const currentUsdBalance = userData?.walletBalance?.USD || 0;
      const newUsdBalance = currentUsdBalance + usdAmount;

      updateWalletBalance({
        USD: newUsdBalance,
        NGN: newNgnBalance,
      });

      // Show success message
      showMessage({
        message: `₦${formatNumberWithCommas(
          ngnAmount.toString(),
        )} converted to $${formatNumberWithCommas(usdAmount.toFixed(2))}`,
        type: 'success',
        duration: 4000,
      });

      // Log transaction
      console.log('Currency Conversion:', {
        fromCurrency: 'NGN',
        toCurrency: 'USD',
        fromAmount: ngnAmount,
        toAmount: usdAmount,
        exchangeRate: exchangeRate,
        fee: conversionFee,
        previousNgnBalance: currentNgnBalance,
        newNgnBalance: newNgnBalance,
        previousUsdBalance: currentUsdBalance,
        newUsdBalance: newUsdBalance,
        timestamp: new Date().toISOString(),
        transactionId: `CONV_${Date.now()}`,
      });

      // Reset form
      setValue('currencyFrom', '');
      setValue('currencyTo', '');

      goBack();
    } catch (error) {
      console.error('Conversion error:', error);

      showMessage({
        message: 'Conversion Failed',
        description: 'Unable to convert funds. Please try again.',
        type: 'danger',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen removeSafeaArea>
      <Header hasBackButton hasHeaderText={'💸 Convert Funds'} />

      <HeaderText
        containerStyle={{mt: hp(16)}}
        hasHeaderText={'Convert Funds'}
        hasSubHeader={'Convert your NGN to USD'}
      />

      <AvoidingView>
        <ScrollView>
          <Box mt={hp(30)} mx={wp(16)}>
            <RegularInput
              control={control}
              name="currencyFrom"
              label="Swap from (NGN)"
              isAmount={'NGN'}
              placeholder="Enter NGN amount"
              keyboardType="numeric"
              returnKeyType="done"
              value={form.currencyFrom}
              onChangeText={handleNGNChange}
              errorText={errors.currencyFrom?.message}
              baseContainerStyle={{marginBottom: hp(20)}}
            />

            <RegularInput
              control={control}
              name="currencyTo"
              label="Swap to (USD)"
              isAmount={'USD'}
              placeholder="USD amount"
              keyboardType="numeric"
              returnKeyType="done"
              value={form.currencyTo}
              onChangeText={handleUSDChange}
              errorText={errors.currencyTo?.message}
              baseContainerStyle={{marginBottom: hp(20)}}
            />

            {/* Exchange Rate Info */}
            <Box
              backgroundColor={themeColor.GREY_600}
              p={wp(16)}
              borderRadius={wp(8)}
              mb={hp(20)}>
              <Text variant="bodySmall" color={themeColor.BODY_MAIN_TEXT}>
                Exchange Rate: 1 USD = ₦
                {formatNumberWithCommas(exchangeRate.toString())}
              </Text>
              <Text
                variant="bodySmall"
                color={themeColor.BODY_MAIN_TEXT}
                mt={hp(4)}>
                Conversion Fee: {(conversionFee * 100).toFixed(1)}%
              </Text>
            </Box>

            {/* Current Balance Info */}
            <Box
              backgroundColor={themeColor.GREY_600}
              p={wp(16)}
              borderRadius={wp(8)}
              mb={hp(20)}>
              <Text variant="bodyMedium" color={themeColor.BODY_MAIN_TEXT}>
                Available NGN: ₦
                {formatNumberWithCommas(
                  (userData?.walletBalance?.NGN || 0).toString(),
                )}
              </Text>
            </Box>
          </Box>
        </ScrollView>
      </AvoidingView>

      <Box position="absolute" bottom={hp(20)} alignSelf="center">
        <Button
          title={isLoading ? 'Converting...' : 'Convert Funds'}
          loading={isLoading}
          disabled={
            form.currencyFrom && form.currencyTo && !isLoading ? false : true
          }
          onPress={performConversion}
        />
      </Box>
    </Screen>
  );
};
