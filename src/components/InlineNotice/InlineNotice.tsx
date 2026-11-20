/** Shared inline message with owner-selected announcement behavior. */
import type { ReactNode } from 'react';
import {
  IconAlertTriangle,
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconInfoCircle,
} from '@tabler/icons-react';
import { Icon } from '../Icon';
import type { StatusTone } from '../StatusBadge/StatusBadge';
import styles from './InlineNotice.module.css';

export type InlineNoticeProps = {
  children: ReactNode;
  title?: string;
  action?: ReactNode;
  icon?: ReactNode;
  tone?: StatusTone;
  announcement?: 'off' | 'polite' | 'assertive';
};

const toneIcons = {
  neutral: IconCircle,
  info: IconInfoCircle,
  success: IconCircleCheck,
  warning: IconAlertTriangle,
  error: IconCircleX,
};

/** Contextual message whose announcement behaviour is selected by its owner. */
export function InlineNotice({
  children, title, action, icon, tone = 'info', announcement = 'off',
}: InlineNoticeProps) {
  const ToneIcon = toneIcons[tone];
  const announcementProps = announcement === 'off'
    ? {}
    : {
      role: announcement === 'assertive' ? 'alert' as const : 'status' as const,
      'aria-live': announcement,
      'aria-atomic': true,
    };

  return (
    <div className={styles.notice} data-tone={tone} {...announcementProps}>
      <span className={styles.icon} aria-hidden="true">
        {icon ?? <Icon icon={ToneIcon} size={20} stroke={2} />}
      </span>
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.body}>{children}</div>
        {action && <div className={styles.action}>{action}</div>}
      </div>
    </div>
  );
}
