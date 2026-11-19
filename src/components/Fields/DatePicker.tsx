// Date field and calendar presentation; React Aria owns selection and validation.
import { useRef, useState } from 'react';
import {
  DatePicker as AriaDatePicker, Label, Group, DateInput, DateSegment,
  Button, Popover, Dialog, Calendar, Heading, CalendarGrid,
  CalendarGridHeader, CalendarHeaderCell, CalendarGridBody, CalendarCell,
  type DatePickerProps as AriaDatePickerProps, type DateValue,
} from 'react-aria-components';
import { IconCalendar, IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react';
import { Icon } from '../Icon';
import { useFieldPopoverStyle } from './useFieldPopoverStyle';
import { FieldSupport } from './FieldSupport';
import styles from './Fields.module.css';

export type DatePickerProps = Omit<AriaDatePickerProps<DateValue>, 'children' | 'className'> & {
  label: string;
  description?: string;
  errorMessage?: string;
};
type CalendarCursor = { x: number; y: number; width: number; height: number };

/** Provides date entry and clearing for controlled and uncontrolled values. */
export function DatePicker({ label, description, errorMessage, isRequired = true, ...props }: DatePickerProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const { fieldRef, popoverStyle } = useFieldPopoverStyle();

  return (
    <AriaDatePicker {...props} isRequired={isRequired} ref={fieldRef} granularity="day" className={styles.field}>
      {({ state }) => <>
        <Label className={styles.label}>{label}{!isRequired && ' (optional)'}</Label>
        <Group className={styles.control}>
          <DateInput ref={inputRef} className={styles.dateInput}>
            {segment => <DateSegment segment={segment} className={styles.segment} />}
          </DateInput>
          {state.value && !isRequired && !props.isReadOnly && (
            <Button slot={null} className={styles.iconButton} aria-label={`Clear ${label}`} isDisabled={props.isDisabled} onPress={() => {
              state.setValue(null);
              inputRef.current?.querySelector<HTMLElement>('[role="spinbutton"]')?.focus();
            }}>
              <Icon size={20} icon={IconX} aria-hidden="true" />
            </Button>
          )}
          <Button className={styles.iconButton} aria-label={`Choose ${label}`}>
            <Icon size={20} icon={IconCalendar} aria-hidden="true" />
          </Button>
        </Group>
        <FieldSupport description={description} errorMessage={errorMessage} />
        <Popover className={`${styles.popover} ${styles.calendarPopover}`} style={popoverStyle} placement="bottom end">
          <Dialog className={styles.dialog} aria-label={`Choose ${label}`}>
            <PickerCalendar />
          </Dialog>
        </Popover>
      </>}
    </AriaDatePicker>
  );
}

/** Keeps the moving focus frame aligned with the calendar cell in focus. */
function PickerCalendar() {
  const [cursor, setCursor] = useState<CalendarCursor | null>(null);

  return (
    <div className={styles.calendar} onFocusCapture={event => {
      const cell = (event.target as HTMLElement).closest<HTMLElement>(`.${styles.day}`);
      if (!cell) { setCursor(null); return; }
      const root = event.currentTarget.getBoundingClientRect();
      const target = cell.getBoundingClientRect();
      setCursor({ x: target.x - root.x, y: target.y - root.y, width: target.width, height: target.height });
    }}>
      <Calendar>
      <header className={styles.calendarHeader}>
        <Button slot="previous" className={styles.iconButton} aria-label="Previous month"><Icon size={20} icon={IconChevronLeft} aria-hidden="true" /></Button>
        <Heading className={styles.calendarHeading} />
        <Button slot="next" className={styles.iconButton} aria-label="Next month"><Icon size={20} icon={IconChevronRight} aria-hidden="true" /></Button>
      </header>
      <CalendarGrid className={styles.calendarGrid}>
        <CalendarGridHeader>{day => <CalendarHeaderCell className={styles.weekday}>{day}</CalendarHeaderCell>}</CalendarGridHeader>
        <CalendarGridBody>{date => <CalendarCell date={date} className={styles.day} />}</CalendarGridBody>
      </CalendarGrid>
      {cursor && <div aria-hidden="true" className={styles.calendarCursor} style={{
        width: cursor.width, height: cursor.height, transform: `translate(${cursor.x}px, ${cursor.y}px)`,
      }} />}
      </Calendar>
    </div>
  );
}
