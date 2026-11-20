/** Shared accessible progress indicator with a safe indeterminate fallback. */
import {
  Label,
  ProgressBar as AriaProgressBar,
} from 'react-aria-components';
import styles from './Loading.module.css';

export type ProgressBarProps = {
  label: string;
  value?: number;
  max?: number;
  isIndeterminate?: boolean;
};

/** Accessible progress display. Owners supply measured values; missing or invalid ranges stay indeterminate. */
export function ProgressBar({ label, value, max = 100, isIndeterminate = false }: ProgressBarProps) {
  const hasValidMax = Number.isFinite(max) && max > 0;
  const hasMeasuredValue = typeof value === 'number' && Number.isFinite(value);
  const indeterminate = isIndeterminate || !hasValidMax || !hasMeasuredValue;
  const maxValue = hasValidMax ? max : 100;

  return (
    <AriaProgressBar
      isIndeterminate={indeterminate}
      value={indeterminate ? undefined : value}
      maxValue={maxValue}
      className={styles.progress}
    >
      {({ percentage, isIndeterminate: isBusy }) => <>
        <Label className={styles.progressLabel}>{label}</Label>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            data-indeterminate={isBusy || undefined}
            style={isBusy ? undefined : { inlineSize: `${percentage ?? 0}%` }}
            aria-hidden="true"
          />
        </div>
      </>}
    </AriaProgressBar>
  );
}
