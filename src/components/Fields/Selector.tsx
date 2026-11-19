import {
  Select, Label, Button, SelectValue, Popover, ListBox, ListBoxItem,
  type SelectProps,
} from 'react-aria-components';
import { IconChevronDown, IconCheck } from '@tabler/icons-react';
import { Icon } from '../Icon';
import { useFieldPopoverStyle } from './useFieldPopoverStyle';
import { FieldSupport } from './FieldSupport';
import styles from './Fields.module.css';

export type SelectorOption = { id: string; label: string; isDisabled?: boolean };
export type SelectorProps = Omit<SelectProps<SelectorOption>, 'children' | 'className'> & {
  label: string;
  options: SelectorOption[];
  description?: string;
  errorMessage?: string;
};

export function Selector({ label, options, description, errorMessage, isRequired = true, ...props }: SelectorProps) {
  const { fieldRef, popoverStyle } = useFieldPopoverStyle();
  return (
    <Select {...props} isRequired={isRequired} ref={fieldRef} className={styles.field}>
      <Label className={styles.label}>{label}{!isRequired && ' (optional)'}</Label>
      <Button className={`${styles.control} ${styles.selectTrigger}`}>
        <SelectValue className={styles.selectValue} />
        <Icon size={20} icon={IconChevronDown} className={styles.selectArrow} aria-hidden="true" />
      </Button>
      <FieldSupport description={description} errorMessage={errorMessage} />
      <Popover className={`${styles.popover} ${styles.selectPopover}`} style={popoverStyle} placement="bottom start">
        <ListBox className={styles.list} items={options} aria-label={label}>
          {option => (
            <ListBoxItem id={option.id} textValue={option.label} isDisabled={option.isDisabled} className={styles.option}>
              {({ isSelected }) => <><span>{option.label}</span>{isSelected && <Icon size={20} icon={IconCheck} aria-hidden="true" />}</>}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </Select>
  );
}
