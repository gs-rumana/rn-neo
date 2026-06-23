import { memo } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import Box from '../Box';
import Text from '../Text';

import type { DialogProps } from '../../typings/components';

const Dialog = memo(function Dialog({
  visible,
  onClose,
  title,
  titleColor = 'onSurface',
  footer,
  children,

  dismissable = true,
  backdropColor = 'rgba(0,0,0,0.5)',
  animationType = 'fade',
  containerStyle,

  // Box panel defaults — neobrutalist surface card.
  backgroundColor = 'surface',
  border = true,
  shadow = true,
  padding = 'xl',
  style,

  ...boxProps
}: DialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={[styles.container, containerStyle]}>
        {/* Backdrop — sits behind the panel; closes on press when dismissable. */}
        <Pressable
          style={[styles.backdrop, { backgroundColor: backdropColor }]}
          onPress={dismissable ? onClose : undefined}
          accessibilityRole="button"
          accessibilityLabel="Close dialog"
          importantForAccessibility={
            dismissable ? 'yes' : 'no-hide-descendants'
          }
        />

        <Box
          accessibilityViewIsModal
          backgroundColor={backgroundColor}
          border={border}
          shadow={shadow}
          padding={padding}
          style={[styles.panel, style]}
          {...boxProps}
        >
          {title ? (
            <Text
              color={titleColor}
              fontSize="xl"
              fontWeight="bold"
              style={styles.title}
            >
              {title}
            </Text>
          ) : null}

          {children}

          {footer ? <View style={styles.footer}>{footer}</View> : null}
        </Box>
      </View>
    </Modal>
  );
});

Dialog.displayName = 'Dialog';

export default Dialog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  panel: {
    width: '100%',
    maxWidth: 420,
  },
  title: {
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 20,
  },
});
