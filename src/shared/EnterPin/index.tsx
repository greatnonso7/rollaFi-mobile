import React from 'react';
import {Box} from 'design-system';
import {BaseModal} from 'shared/BaseModal';
import {PinKeyPad} from './PinKeyPad';
import {hp} from 'utils';

interface EnterPinProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  onCompletePin: (pin: string) => void;
}

export const EnterPin = ({
  isVisible,
  onClose,
  title,
  onCompletePin,
}: EnterPinProps) => {
  return (
    <BaseModal visible={isVisible} onClose={onClose}>
      <Box p={hp(20)}>
        <PinKeyPad
          mt={hp(45)}
          boxSize={hp(20)}
          title={title}
          onComplete={onCompletePin}
        />
      </Box>
    </BaseModal>
  );
};
