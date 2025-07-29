import React, {useState} from 'react';
import {AvoidingView, Header, HeaderText, Screen} from 'shared';
import {Box, Button, RegularInput} from 'design-system';
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
  fullName: string;
  phoneNumber: string;
}

const schema = yup.object().shape({
  amount: yup.string().required('Amount is required'),
  fullName: yup.string().required('Full name is required'),
  phoneNumber: yup.string().required('Phone number is required'),
});

export const SendFunds = () => {
  const {activeWallet} =
    useRoute<RouteProp<DashboardStackParamList, 'SendFunds'>>().params;
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
      fullName: '',
      phoneNumber: '',
    },
    mode: 'all',
  });

  const form = watch();

  const handleChange = (text: string) => {
    const formattedText = formatNumberWithCommas(text);

    setValue('amount', formattedText);

    const amountValue = convertToNumber(formattedText);
    const currency = activeWallet?.currency || 'NGN';
    const minAmount = currency === 'USD' ? 100 : 1000;

    if (amountValue < minAmount) {
      setError('amount', {
        message: `The minimum amount to send is ${currency} ${formatNumberWithCommas(
          minAmount.toString(),
        )}`,
      });
    } else {
      clearErrors('amount');
    }
  };

  const sendMoney = async () => {
    try {
      setIsLoading(true);

      const amount = convertToNumber(form.amount);
      const currency = activeWallet?.currency || 'NGN';
      const recipientName = form.fullName;
      const recipientPhone = form.phoneNumber;
      const minAmount = currency === 'USD' ? 100 : 1000;

      // Validate amount
      if (amount < minAmount) {
        showMessage({
          message: 'Invalid Amount',
          description: `The minimum amount to send is ${currency} ${formatNumberWithCommas(
            minAmount.toString(),
          )}`,
          type: 'danger',
          duration: 3000,
        });
        return;
      }

      // Validate KYC status
      if (!userData?.isVerified) {
        showMessage({
          message: 'KYC Required',
          description: 'Please complete your identity verification first',
          type: 'warning',
          duration: 3000,
        });
        return;
      }

      // Get current balance based on currency
      let currentBalance = 0;
      if (currency === 'NGN') {
        currentBalance = userData?.walletBalance?.NGN || 0;
      } else if (currency === 'USD') {
        currentBalance = userData?.walletBalance?.USD || 0;
      }

      // Check if user has sufficient balance
      if (amount > currentBalance) {
        showMessage({
          message: 'Insufficient Balance',
          description: `You don't have enough ${currency} in your wallet. Current balance: ${currency} ${formatNumberWithCommas(
            currentBalance.toString(),
          )}`,
          type: 'danger',
          duration: 4000,
        });
        return;
      }

      // Simulate API call to send money
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Calculate new balance (debit transaction)
      const newBalance = currentBalance - amount;

      // Update wallet balance in store based on currency
      if (currency === 'NGN') {
        updateWalletBalance({
          USD: userData?.walletBalance?.USD || 0,
          NGN: newBalance,
        });
      } else if (currency === 'USD') {
        updateWalletBalance({
          USD: newBalance,
          NGN: userData?.walletBalance?.NGN || 0,
        });
      }

      // Show success message
      showMessage({
        message: 'Money Sent Successfully!',
        description: `${currency} ${formatNumberWithCommas(
          amount.toString(),
        )} has been sent to ${recipientName}`,
        type: 'success',
        duration: 4000,
      });

      // Log transaction for debugging
      console.log('Send Money Transaction:', {
        currency: currency,
        amount: amount,
        recipientName: recipientName,
        recipientPhone: recipientPhone,
        previousBalance: currentBalance,
        newBalance: newBalance,
        transactionType: 'DEBIT',
        timestamp: new Date().toISOString(),
        transactionId: `SEND_${Date.now()}`,
      });

      // Reset form
      setValue('amount', '');
      setValue('fullName', '');
      setValue('phoneNumber', '');

      goBack();
    } catch (error) {
      console.error('Send money error:', error);

      showMessage({
        message: 'Transaction Failed',
        description: 'Unable to send money. Please try again.',
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
        hasHeaderText={`💸 Send ${activeWallet?.currency} Funds`}
      />

      <HeaderText
        hasHeaderText={`Send ${activeWallet?.currency} Funds`}
        hasSubHeader={`Enter the amount you want to send from your ${activeWallet?.currency} wallet`}
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
          <RegularInput
            control={control}
            name="phoneNumber"
            placeholder="Enter phone number"
            keyboardType="numeric"
            returnKeyType="done"
            value={form.phoneNumber}
            errorText={errors.phoneNumber?.message}
            baseContainerStyle={{marginTop: hp(20)}}
          />
          <RegularInput
            control={control}
            name="fullName"
            placeholder="Enter full name"
            returnKeyType="done"
            value={form.fullName}
            errorText={errors.fullName?.message}
            baseContainerStyle={{marginTop: hp(20)}}
          />
        </Box>
      </AvoidingView>

      <Button
        title={isLoading ? 'Processing...' : 'Continue'}
        loading={isLoading}
        disabled={
          form.amount &&
          form.phoneNumber &&
          form.fullName &&
          Object.keys(errors).length === 0 &&
          !isLoading
            ? false
            : true
        }
        onPress={sendMoney}
      />
    </Screen>
  );
};
