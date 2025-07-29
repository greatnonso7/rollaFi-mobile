import Clipboard from '@react-native-clipboard/clipboard';
import {showMessage} from 'react-native-flash-message';

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

export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
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

/**
 * Generates a random Nigerian phone number
 * @returns A randomly generated Nigerian phone number in the format +234XXXXXXXXX
 */
export const generateRandomNigerianPhoneNumber = (): string => {
  // Nigerian mobile network prefixes (updated as of 2024)
  const prefixes = [
    '701',
    '702',
    '703',
    '704',
    '705',
    '706',
    '707',
    '708',
    '709', // MTN
    '801',
    '802',
    '803',
    '804',
    '805',
    '806',
    '807',
    '808',
    '809', // Airtel
    '811',
    '812',
    '813',
    '814',
    '815',
    '816',
    '817',
    '818',
    '819', // Airtel
    '901',
    '902',
    '903',
    '904',
    '905',
    '906',
    '907',
    '908',
    '909', // 9mobile
    '911',
    '912',
    '913',
    '914',
    '915',
    '916',
    '917',
    '918',
    '919', // 9mobile
    '701',
    '702',
    '703',
    '704',
    '705',
    '706',
    '707',
    '708',
    '709', // MTN (additional)
    '801',
    '802',
    '803',
    '804',
    '805',
    '806',
    '807',
    '808',
    '809', // Airtel (additional)
    '811',
    '812',
    '813',
    '814',
    '815',
    '816',
    '817',
    '818',
    '819', // Airtel (additional)
    '901',
    '902',
    '903',
    '904',
    '905',
    '906',
    '907',
    '908',
    '909', // 9mobile (additional)
    '911',
    '912',
    '913',
    '914',
    '915',
    '916',
    '917',
    '918',
    '919', // 9mobile (additional)
  ];

  // Randomly select a prefix
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];

  // Generate 7 random digits for the remaining part
  const generateRandomDigits = (length: number): string => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10).toString();
    }
    return result;
  };

  const randomDigits = generateRandomDigits(7);

  // Return the complete phone number with +234 country code
  return `+234${randomPrefix}${randomDigits}`;
};

/**
 * Generates multiple random Nigerian phone numbers
 * @param count Number of phone numbers to generate
 * @returns Array of randomly generated Nigerian phone numbers
 */
export const generateMultipleNigerianPhoneNumbers = (
  count: number,
): string[] => {
  const phoneNumbers: string[] = [];

  for (let i = 0; i < count; i++) {
    phoneNumbers.push(generateRandomNigerianPhoneNumber());
  }

  return phoneNumbers;
};

/**
 * Processes a deep link URL and extracts relevant data
 * @param url The deep link URL to process
 * @returns Extracted deep link data
 */
export const processDeepLink = (url: string) => {
  try {
    // Cross-platform URL parsing that works on both iOS and Android
    const extractedData: {
      inviteCode?: string;
      source?: string;
      timestamp: number;
      url: string;
    } = {
      timestamp: Date.now(),
      url: url,
    };

    // Remove the scheme prefix (e.g., "rollafi://")
    const urlWithoutScheme = url.replace(/^[^:]+:\/\//, '');

    // Split by '/' to get path segments
    const pathSegments = urlWithoutScheme.split('/').filter(Boolean);

    // Extract invite code from path (e.g., onboarding/INVITE_CODE)
    if (pathSegments.length > 1 && pathSegments[0] === 'onboarding') {
      extractedData.inviteCode = pathSegments[1];
    }

    // Extract source from query parameters using regex
    const sourceMatch = url.match(/[?&]source=([^&]+)/);
    if (sourceMatch) {
      extractedData.source = decodeURIComponent(sourceMatch[1]);
    }

    return extractedData;
  } catch (error) {
    console.error('Error processing deep link:', error);
    return {
      timestamp: Date.now(),
      url: url,
    };
  }
};

/**
 * Clears the current deep link and saves extracted data to store
 * @param url The deep link URL to process
 * @param clearDeepLink Function to clear the deep link from state
 * @param setDeepLinkData Function to save data to store
 */
export const clearDeepLinkAndSaveData = async (
  url: string,
  clearDeepLink: () => void,
  setDeepLinkData: (data: any) => void,
) => {
  try {
    // Process the deep link to extract data
    const extractedData = processDeepLink(url);

    // Save the extracted data to store
    setDeepLinkData(extractedData);

    // Clear the deep link from navigation state
    clearDeepLink();

    console.log('Deep link processed and cleared:', extractedData);
  } catch (error) {
    console.error('Error clearing deep link and saving data:', error);
  }
};

export function formatTitleUrl(str: string) {
  const firstPart = str?.split('//')[1];
  const formattedUrl = getStringBeforeSubstring(firstPart, '/');
  return formattedUrl;
}

function getStringBeforeSubstring(parentString: string, substring: string) {
  return parentString?.substring(0, parentString?.indexOf(substring));
}

export const formatNumberWithCommas = (text: string) => {
  // Remove all non-numeric characters except the decimal point
  text = text.replace(/[^0-9.]/g, '');

  // Split the number into the integer and decimal parts
  const parts = text.split('.');

  // Format the integer part with commas
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Join the integer and decimal parts
  return parts.join('.');
};

export const convertToNumber = (value: string) =>
  parseFloat(value.replace(/[^\d.]/g, ''));
