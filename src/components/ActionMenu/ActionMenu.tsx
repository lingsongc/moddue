/** Shared React Aria action menu with a compact, accessible trigger. */
import type { ReactNode } from 'react';
import {
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from 'react-aria-components';
import { IconDots } from '@tabler/icons-react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon';
import styles from './ActionMenu.module.css';

export type ActionMenuItem = {
  id: string;
  label: string;
  icon?: ReactNode;
  isDisabled?: boolean;
  isDestructive?: boolean;
};

export type ActionMenuProps = {
  items: ActionMenuItem[];
  onAction(id: string): void;
  triggerLabel: string;
};

/** Renders menu actions through React Aria so keyboard and dismissal behavior stay consistent. */
export function ActionMenu({ items, onAction, triggerLabel }: ActionMenuProps) {
  return (
    <MenuTrigger>
      <Button variant="secondary" aria-label={triggerLabel} className={styles.trigger}><span className={styles.triggerIcon}><Icon icon={IconDots} size={16} stroke={2} /></span></Button>
      <Popover className={styles.popover}>
        <Menu aria-label={triggerLabel} className={styles.menu} onAction={(key) => onAction(String(key))}>
          {items.map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              isDisabled={item.isDisabled}
              textValue={item.label}
              className={styles.item}
              data-destructive={item.isDestructive || undefined}
            >
              {item.icon && <span className={styles.icon} aria-hidden="true">{item.icon}</span>}
              <span className={styles.label}>{item.label}</span>
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
