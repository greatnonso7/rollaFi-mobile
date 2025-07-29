import React from 'react';
import {Linking} from 'react-native';
import {Box, Text, Button} from 'design-system';
import {BaseModal, ModalHeader} from 'shared';
import {hp} from 'utils';
import theme from 'theme';
import {useDarkTheme} from 'theme/dark-mode';

interface GetInviteCodeProps {
  isVisible: boolean;
  onClose: () => void;
}

export const GetInviteCode = ({isVisible, onClose}: GetInviteCodeProps) => {
  const {themeColor} = useDarkTheme();
  const handleVisitWebsite = async () => {
    try {
      await Linking.openURL('https://www.rollafi.com/message');
    } catch (error) {
      console.error('Error opening website:', error);
    }
  };

  return (
    <BaseModal visible={isVisible} onClose={onClose}>
      <Box px={hp(20)}>
        <ModalHeader title="Invite Code Required" onClose={onClose} />

        <Box py={hp(20)}>
          <Text
            variant="bodyMedium"
            color={themeColor.BODY_MAIN_TEXT}
            textAlign="center"
            mb={hp(12)}
            lineHeight={22}>
            RollaFi is currently in private beta. You need an invite code to
            join our community.
          </Text>

          <Text
            variant="bodyMedium"
            color={themeColor.BODY_MAIN_TEXT}
            textAlign="center"
            mb={hp(12)}
            lineHeight={22}>
            Visit our website to learn more about RollaFi and request an invite
            code.
          </Text>
        </Box>
      </Box>
      <Button
        title="Visit Website"
        isNotBottom
        alignSelf={'center'}
        onPress={handleVisitWebsite}
        backgroundColor={theme.colors.PRIMARY}
        textColor={theme.colors.APP_BLACK_100}
        mb={hp(20)}
      />
    </BaseModal>
  );
};
