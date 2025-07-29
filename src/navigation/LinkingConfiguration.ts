import {DeepLinkSchema} from './utils/navigation-service';

const linking = {
  prefixes: [DeepLinkSchema],
  config: {
    screens: {
      Auth: {
        screens: {
          Onboarding: {
            path: 'onboarding/:inviteCode',
            parse: {
              inviteCode: (inviteCode: string) => inviteCode,
            },
          },
        },
      },
    },
  },
};

export default linking;
