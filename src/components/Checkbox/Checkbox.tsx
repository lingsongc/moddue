/** Shared React Aria checkbox with a reserved 48px target and custom indicator. */
import type { ReactNode } from 'react';
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
} from 'react-aria-components';
import styles from './Checkbox.module.css';

export type CheckboxProps = Omit<AriaCheckboxProps, 'children' | 'className'> & {
  children: ReactNode;
};

/** Wraps the accessible checkbox primitive while keeping visual state in its colocated styles. */
export function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox {...props} className={styles.checkbox}>
      <span aria-hidden="true" className={styles.target}>
        <span className={styles.indicator}>
          <svg className={styles.checkmark} viewBox="0 0 16 16" focusable="false">
            <path d="m3.25 8.25 3 3 6.5-6.5" />
          </svg>
          <span className={styles.mixedMark} />
        </span>
      </span>
      <span className={styles.label}>{children}</span>
    </AriaCheckbox>
  );
}
