/** Shared ring spinner; standalone use supplies an accessible label. */
import type { CSSProperties } from 'react';
import styles from './Loading.module.css';

export type SpinnerProps = {
  size?: number | string;
  label?: string;
};

/** A small ring indicator; provide a label when it stands alone. */
export function Spinner({ size = 16, label }: SpinnerProps) {
  const dimension = typeof size === 'number' ? `${size}px` : size;
  const style = {
    '--spinner-size': dimension,
  } as CSSProperties;

  return (
    <svg
      className={styles.spinner}
      style={style}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      focusable="false"
    >
      <circle className={styles.spinnerTrack} cx="8" cy="8" r="6" />
      <circle className={styles.spinnerArc} cx="8" cy="8" r="6" />
    </svg>
  );
}
