import React from 'react';
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {BaseModalProps} from './types';
import {hp} from 'utils';
import theme from 'theme';
import {Box, Text} from 'design-system';
import {styles} from './style';

export const BaseModal = ({
  visible,
  children,
  onClose,
  containerStyles,
  removeBackTap,
  hasCloseButton,
}: BaseModalProps) => {
  return (
    <Modal
      isVisible={visible}
      hasBackdrop={true}
      animationOut="slideOutDown"
      animationOutTiming={400}
      animationIn="slideInUp"
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={[styles.container, containerStyles]}
      propagateSwipe={true}
      backdropOpacity={0.8}
      onBackdropPress={removeBackTap ? () => {} : onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled
          style={styles.generalContainer}
          pointerEvents="box-none">
          <Box style={[styles.dialogContainer]}>
            <Box style={styles.barModalContainer} />
            {hasCloseButton && (
              <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.8}
                style={styles.closeButtonContainer}>
                <Text
                  fontSize={hp(14)}
                  color={theme.colors.PRIMARY}
                  fontWeight="medium">
                  Close
                </Text>
              </TouchableOpacity>
            )}
            {children}
          </Box>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
