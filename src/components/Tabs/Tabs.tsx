/** Shared React Aria tabs with controlled and fallback selection handling. */
import type { ReactNode } from 'react';
import { useState } from 'react';
import {
  Tab,
  TabList,
  TabPanel,
  Tabs as AriaTabs,
} from 'react-aria-components';
import styles from './Tabs.module.css';

export type TabItem = {
  id: string;
  label: string;
  count?: number;
  isDisabled?: boolean;
  children: ReactNode;
};

type Key = string | number;

export type TabsProps = {
  'aria-label': string;
  items: TabItem[];
  selectedKey?: Key;
  defaultSelectedKey?: Key;
  onSelectionChange?: (key: Key) => void;
};

/** Falls back to the first enabled tab if a supplied selection is missing or disabled. */
export function Tabs({
  'aria-label': ariaLabel, items, selectedKey, defaultSelectedKey,
  onSelectionChange,
}: TabsProps) {
  const firstEnabled = items.find((item) => !item.isDisabled)?.id;
  const normalizeSelection = (key: Key | null | undefined) =>
    key == null ? undefined : items.find((item) => item.id === String(key) && !item.isDisabled)?.id;
  const fallback = normalizeSelection(defaultSelectedKey) ?? firstEnabled;
  const [internalSelection, setInternalSelection] = useState<Key | undefined>(fallback);
  // Keep rendering safe if a controlled owner temporarily supplies a missing/disabled key;
  // the owner remains responsible for reconciling its own selectedKey state.
  const effectiveSelection = selectedKey === undefined
    ? normalizeSelection(internalSelection) ?? firstEnabled
    : normalizeSelection(selectedKey) ?? firstEnabled;

  const handleSelectionChange = (key: Key) => {
    const normalizedKey = normalizeSelection(key) ?? firstEnabled;
    if (selectedKey === undefined) setInternalSelection(normalizedKey);
    if (normalizedKey !== undefined) onSelectionChange?.(normalizedKey);
  };

  return (
    <AriaTabs
      aria-label={ariaLabel}
      selectedKey={effectiveSelection}
      onSelectionChange={handleSelectionChange}
      className={styles.tabs}
    >
      <div className={styles.listViewport}>
        <TabList aria-label={ariaLabel} className={styles.list}>
          {items.map((item) => (
            <Tab key={item.id} id={item.id} isDisabled={item.isDisabled} className={styles.tab}>
              <span>{item.label}</span>
              {item.count !== undefined && <span className={styles.count}>{item.count}</span>}
            </Tab>
          ))}
        </TabList>
      </div>
      {items.map((item) => (
        <TabPanel key={item.id} id={item.id} className={styles.panel}>{item.children}</TabPanel>
      ))}
    </AriaTabs>
  );
}
