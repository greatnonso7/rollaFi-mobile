import React, {useEffect, useState} from 'react';
import {Box, Button, RegularInput} from 'design-system';
import {Header, HeaderText, Loader, Screen} from 'shared';
import {fontSz, hp, wp} from 'utils';
import {getStyles} from './style';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {generateRandomNigerianPhoneNumber} from 'utils';
import {useDarkTheme} from 'theme/dark-mode';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'types';

interface FormData {
  phone: string;
}

const schema = yup.object().shape({
  phone: yup.string().required('Phone number is required'),
});

export const Login = () => {
  const [loading, setLoading] = useState<'pre-filled' | 'post-filled' | ''>('');
  const {themeColor} = useDarkTheme();
  const styles = getStyles(themeColor);
  const {navigate} = useNavigation<NavigationProp<AuthStackParamList>>();
  const {
    control,
    watch,
    setValue,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: '',
    },
    mode: 'all',
  });

  const form = watch();

  useEffect(() => {
    setLoading('pre-filled');

    setTimeout(() => {
      setLoading('');
      setValue('phone', generateRandomNigerianPhoneNumber());
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = () => {
    setLoading('post-filled');

    setTimeout(() => {
      setLoading('');
      navigate('VerifyLogin');
    }, 4000);
  };

  return (
    <Screen removeSafeaArea>
      <Header hasBackButton hasLogo />
      <HeaderText
        textStyle={styles.headerText}
        hasHeaderText="Login to your account"
        fontSize={fontSz(24)}
        hasSubHeader="Continue with your phone number"
      />

      <Box mt={hp(40)} mx={wp(16)}>
        <RegularInput
          label="Phone number"
          placeholder="Phone number"
          value={form.phone}
          editable={false}
          control={control}
          errorText={errors.phone?.message}
        />
      </Box>

      <Button
        title="Continue"
        onPress={onSubmit}
        disabled={loading === 'pre-filled'}
      />

      <Button
        title="Continue"
        onPress={onSubmit}
        loading={loading === 'post-filled'}
      />
      <Loader loading={loading === 'pre-filled'} />
    </Screen>
  );
};
