/** Shared React Aria switch with separate touch-target and rail geometry. */
import type { ReactNode } from 'react';
import {
  Switch as AriaSwitch,
  type SwitchProps as AriaSwitchProps,
} from 'react-aria-components';
import styles from './Switch.module.css';

export type SwitchProps = Omit<AriaSwitchProps, 'children' | 'className'> & {
  children: ReactNode;
};

/** Keeps checked state and switch keyboard behavior with React Aria. */
export function Switch({ children, ...props }: SwitchProps) {
  return (
    <AriaSwitch {...props} className={styles.switch}>
      <span aria-hidden="true" className={styles.target}>
        <span className={styles.rail}><span className={styles.thumb} /></span>
      </span>
      <span className={styles.label}>{children}</span>
    </AriaSwitch>
  );
}
