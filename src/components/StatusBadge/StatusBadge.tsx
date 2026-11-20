/** Shared non-interactive status label with a tone-matched Tabler icon. */
import type { ReactNode } from 'react';
import {
  IconAlertTriangle,
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconInfoCircle,
} from '@tabler/icons-react';
import { Icon } from '../Icon';
import styles from './StatusBadge.module.css';

export type StatusTone = 'neutral' | 'info' | 'success' | 'warning' | 'error';

export type StatusBadgeProps = {
  children: ReactNode;
  icon?: ReactNode;
  tone?: StatusTone;
};

const toneIcons = {
  neutral: IconCircle,
  info: IconInfoCircle,
  success: IconCircleCheck,
  warning: IconAlertTriangle,
  error: IconCircleX,
};

/** Compact, non-interactive status label. Its visible text carries the status meaning. */
export function StatusBadge({ children, icon, tone = 'neutral' }: StatusBadgeProps) {
  const ToneIcon = toneIcons[tone];

  return (
    <span className={styles.badge} data-tone={tone}>
      <span className={styles.icon} aria-hidden="true">
        {icon ?? <Icon icon={ToneIcon} size={16} stroke={2} />}
      </span>
      <span className={styles.label}>{children}</span>
    </span>
  );
}
