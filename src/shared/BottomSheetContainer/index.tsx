import React, {useCallback, useRef} from 'react';
import {Box} from 'design-system';
import {hp} from 'utils';
import BottomSheet from '@gorhom/bottom-sheet';
import {Icon} from 'shared';
import {styles} from './style';

interface BottomSheetContainerProps {
  children: React.ReactElement;
}

export const BottomSheetContainer = ({children}: BottomSheetContainerProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = ['52%', '90%'];

  const renderCustomHandle = useCallback(
    () => (
      <Box alignSelf={'center'} mt={2}>
        <Icon name="caret-up" />
      </Box>
    ),
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={0}
      animateOnMount={false}
      handleHeight={hp(40)}
      handleStyle={styles.handleStyle}
      containerStyle={styles.containerStyle}
      backgroundStyle={styles.backgroundStyle}
      handleComponent={renderCustomHandle}>
      {children}
    </BottomSheet>
  );
};
