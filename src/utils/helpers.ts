import Clipboard from '@react-native-clipboard/clipboard';
import {showMessage} from 'react-native-flash-message';
import {store} from 'redux/store';

export const populateHitSlop = (val: number = 0) => ({
  top: val,
  left: val,
  right: val,
  bottom: val,
});

export const capitalizeFirstLetter = (word: string) =>
  word && word?.charAt(0).toUpperCase() + word?.slice(1);

export const getLettersFromName = (fullname: string | null) => {
  if (fullname === null) {
    return;
  } else {
    const twoLetter = fullname?.split(' ');
    const firstTwoLetters = twoLetter?.slice(0, 2);
    const result = firstTwoLetters?.map(([v]) => v);
    const firstNameLetters = result?.join('');

    return firstNameLetters?.toUpperCase();
  }
};

export const getModelKeys = (model: any) =>
  Object.keys(model.effects({})).map(a => `${model.name}/${a}`);

export const getAllModels = () => {
  return store.getState();
};

export const formatAmount = (value: any) =>
  Number(value)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');

function truncateToDecimals(num: number, dec = 2) {
  const calcDec = Math.pow(10, dec);
  return Math.trunc(num * calcDec) / calcDec;
}

export const formatUserAmount = (value: any) => {
  const amount = truncateToDecimals(parseFloat(value));
  Number(amount)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export function formatMoney(_amount: string, currency: string) {
  const amount = truncateToDecimals(parseFloat(_amount));

  if (currency === 'NGN') {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(amount)
      .replace('.00', '');
  }
}

export const copyToClipboard = (textToSave: string, message?: string) => {
  Clipboard.setString(textToSave);
  showMessage({
    message: 'Success',
    type: 'info',
    description: message || 'Text copied! 🥳',
  });
};

export const noWhiteSpace = (str: string) => {
  return str.replace(/\s/g, '');
};

export const getUrlExtension = (urlString: string | any) => {
  return urlString?.split(/[#?]/)[0].split('.').pop().trim();
};
