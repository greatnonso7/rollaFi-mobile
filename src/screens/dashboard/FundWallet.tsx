import React, {useState} from 'react';
import {AvoidingView, Header, HeaderText, Screen} from 'shared';
import {Box, Button, RegularInput, Text} from 'design-system';
import {useDarkTheme} from 'theme/dark-mode';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {DashboardStackParamList} from 'types';
import {convertToNumber, formatNumberWithCommas, hp, wp} from 'utils';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {showMessage} from 'react-native-flash-message';
import {useRollaFiStore} from 'store';

interface FormData {
  amount: string;
}

const schema = yup.object().shape({
  amount: yup.string().required('Amount is required'),
});

export const FundWallet = () => {
  const {themeColor} = useDarkTheme();
  const {activeWallet} =
    useRoute<RouteProp<DashboardStackParamList, 'FundWallet'>>().params;
  const {updateWalletBalance, userData} = useRollaFiStore();
  const [isLoading, setIsLoading] = useState(false);
  const {goBack} = useNavigation();

  const {
    control,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: '',
    },
    mode: 'all',
  });

  const form = watch();

  const handleChange = (text: string) => {
    const formattedText = formatNumberWithCommas(text);

    setValue('amount', formattedText);

    const amountValue = convertToNumber(formattedText);
    if (amountValue < 10000) {
      setError('amount', {message: 'The minimum amount is ₦10,000.00'});
    } else {
      clearErrors('amount');
    }
  };

  const fundWallet = async () => {
    try {
      setIsLoading(true);

      const amount = convertToNumber(form.amount);

      // Validate amount
      if (amount < 10000) {
        showMessage({
          message: 'The minimum amount is ₦10,000.00',
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

      // Simulate API call to fund wallet
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update wallet balance in store
      const currentBalance = userData?.walletBalance?.NGN || 0;
      const newBalance = currentBalance + amount;

      updateWalletBalance({
        USD: userData?.walletBalance?.USD || 0,
        NGN: newBalance,
      });

      // Show success message
      showMessage({
        message: `₦${formatNumberWithCommas(
          amount.toString(),
        )} has been added to your NGN wallet`,
        type: 'success',
        duration: 4000,
      });

      // Reset form
      setValue('amount', '');

      goBack();
    } catch (error) {
      console.error('Fund wallet error:', error);

      showMessage({
        message: 'Unable to fund wallet. Please try again.',
        type: 'danger',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen removeSafeaArea>
      <Header
        hasBackButton
        hasHeaderText={`💸 Fund ${activeWallet?.currency} Wallet`}
      />

      <HeaderText
        hasHeaderText={`Fund ${activeWallet?.currency} Wallet`}
        hasSubHeader={`Enter the amount you want to fund your ${activeWallet?.currency} wallet`}
      />

      <AvoidingView>
        <Box mt={hp(30)} mx={wp(16)}>
          <RegularInput
            isAmount={activeWallet?.currency}
            control={control}
            name="amount"
            placeholder="Enter amount"
            keyboardType="numeric"
            returnKeyType="done"
            value={form.amount}
            onChangeText={handleChange}
            errorText={errors.amount?.message}
          />
        </Box>
      </AvoidingView>

      <Box position={'absolute'} bottom={hp(20)} alignSelf={'center'}>
        <Button
          title={isLoading ? 'Processing...' : 'Continue'}
          isNotBottom
          loading={isLoading}
          disabled={
            form.amount && Object.keys(errors).length === 0 && !isLoading
              ? false
              : true
          }
          onPress={fundWallet}
        />

        <Box my={hp(20)} mx={wp(16)} alignSelf={'center'}>
          <Text variant="body" color={themeColor.SUB_HEADER_TEXT}>
            You will be charged ₦100 for this transaction.
          </Text>
        </Box>
      </Box>
    </Screen>
  );
};
