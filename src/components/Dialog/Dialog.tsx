/** Shared React Aria modal dialog and confirmation flow. */
import type { ReactNode } from 'react';
import {
  Dialog as AriaDialog,
  Heading,
  Modal,
  ModalOverlay,
} from 'react-aria-components';
import { IconX } from '@tabler/icons-react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon';
import styles from './Dialog.module.css';

export type DialogProps = {
  isOpen: boolean;
  onOpenChange(open: boolean): void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'small' | 'large';
};

/** Keeps dismissal and focus management with React Aria; owners may reject dirty-state dismissal. */
export function Dialog({ isOpen, onOpenChange, title, children, footer, size = 'small' }: DialogProps) {
  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange} isDismissable className={styles.overlay}>
      <Modal className={styles.modal} data-size={size}>
        <AriaDialog className={styles.dialog}>
          {({ close }) => <>
            <header className={styles.header}>
              <Heading slot="title" className={styles.title}>{title}</Heading>
              <Button
                type="button"
                variant="icon"
                aria-label="Close dialog"
                className={styles.close}
                onPress={close}
              ><Icon icon={IconX} /></Button>
            </header>
            <div className={styles.content}>{children}</div>
            {footer && <footer className={styles.footer}>{footer}</footer>}
          </>}
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}

export type ConfirmationDialogProps = Omit<DialogProps, 'footer'> & {
  confirmLabel: string;
  onConfirm(): void;
  cancelLabel?: string;
  isDestructive?: boolean;
};

/** Adds explicit cancel and confirm actions to the shared dialog surface. */
export function ConfirmationDialog({
  isOpen, onOpenChange, title, children, size, confirmLabel, onConfirm,
  cancelLabel = 'Cancel', isDestructive = false,
}: ConfirmationDialogProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={title}
      size={size}
      footer={<>
        <Button variant="secondary" onPress={() => onOpenChange(false)}>{cancelLabel}</Button>
        <Button
          variant={isDestructive ? 'outline' : 'primary'}
          color={isDestructive ? 'var(--error)' : undefined}
          onPress={() => { onConfirm(); onOpenChange(false); }}
        >{confirmLabel}</Button>
      </>}
    >{children}</Dialog>
  );
}
