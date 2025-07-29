import theme from 'theme';

export const activeWalletList = [
  {
    id: 1,
    currency: 'NGN',
    icon: theme.images.ngn,
    amount: 0,
    options: [
      {
        id: 1,
        title: 'Top up',
        icon: 'plus-circle',
      },
      {
        id: 2,
        title: 'Send',
        icon: 'arrow-up-right',
      },
      {
        id: 3,
        title: 'Swap',
        icon: 'arrow-path',
      },
    ],
  },
  {
    id: 2,
    currency: 'USD',
    icon: theme.images.usd,
    amount: 0,
    options: [
      {
        id: 1,
        title: 'Top up',
        icon: 'plus-circle',
      },
      {
        id: 2,
        title: 'Send',
        icon: 'arrow-up-right',
      },
      {
        id: 3,
        title: 'Swap',
        icon: 'arrow-path',
      },
    ],
  },
];
