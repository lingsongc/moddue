// Time entry and looping wheels; commits selection separately from visual recentering.
import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Time } from '@internationalized/date';
import {
  TimeField, Label, Group, DateInput, DateSegment, Button,
  DialogTrigger, Popover, Dialog,
  type TimeFieldProps, type TimeValue,
} from 'react-aria-components';
import { IconClock, IconX } from '@tabler/icons-react';
import { Icon } from '../Icon';
import { useFieldPopoverStyle } from './useFieldPopoverStyle';
import { FieldSupport } from './FieldSupport';
import styles from './Fields.module.css';

export type TimePickerProps = Omit<TimeFieldProps<TimeValue>, 'children' | 'className' | 'value' | 'defaultValue'> & {
  label: string;
  value: TimeValue | null;
  description?: string;
  errorMessage?: string;
};

type TimeWheelProps = { label: string; value: number; count: number; onChange: (value: number) => void; onConfirm: () => void };
const wheelRowHeight = 48;
const wheelCopies = 5;

/** Connects editable time segments and popup wheels to the controlled value. */
export function TimePicker({ label, value, description, errorMessage, isRequired = true, ...props }: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const { fieldRef, popoverStyle } = useFieldPopoverStyle();
  const base = value ?? new Time(23, 59);

  return (
    <TimeField {...props} isRequired={isRequired} ref={fieldRef} value={value} granularity="minute" hourCycle={24} className={styles.field}>
      <Label className={styles.label}>{label}{!isRequired && ' (optional)'}</Label>
      <Group className={styles.control}>
        <DateInput ref={inputRef} className={styles.dateInput}>
          {segment => <DateSegment segment={segment} className={styles.segment} />}
        </DateInput>
        {value && !isRequired && !props.isReadOnly && (
          <Button className={styles.iconButton} aria-label={`Clear ${label}`} isDisabled={props.isDisabled} onPress={() => {
            props.onChange?.(null);
            inputRef.current?.querySelector<HTMLElement>('[role="spinbutton"]')?.focus();
          }}>
            <Icon size={20} icon={IconX} aria-hidden="true" />
          </Button>
        )}
        <DialogTrigger isOpen={open} onOpenChange={setOpen}>
          <Button className={styles.iconButton} aria-label={`Choose ${label}`} isDisabled={props.isDisabled || props.isReadOnly}>
            <Icon size={20} icon={IconClock} aria-hidden="true" />
          </Button>
          <Popover className={styles.popover} style={popoverStyle} placement="bottom end">
            <Dialog className={styles.dialog} aria-label={`Choose ${label}`}>
              <div className={styles.timeColumns}>
                <TimeWheel label="Hour" count={24} value={base.hour} onChange={hour => props.onChange?.(base.set({ hour }))} onConfirm={() => setOpen(false)} />
                <span className={styles.timeColon} aria-hidden="true">:</span>
                <TimeWheel label="Minute" count={60} value={base.minute} onChange={minute => props.onChange?.(base.set({ minute }))} onConfirm={() => setOpen(false)} />
              </div>
            </Dialog>
          </Popover>
        </DialogTrigger>
      </Group>
      <FieldSupport description={description} errorMessage={errorMessage} />
    </TimeField>
  );
}

// Repeated cycles allow either direction to cross zero without a visible jump.
function TimeWheel({ label, value, count, onChange, onConfirm }: TimeWheelProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const index = useRef(count * 2 + value);
  const logicalValue = useRef(value);
  const initialised = useRef(false);
  const animation = useRef<number | undefined>(undefined);
  const unlockFrame = useRef<number | undefined>(undefined);
  const programmatic = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const change = useRef(onChange);
  change.current = onChange;

  useLayoutEffect(() => {
    if (!initialised.current || logicalValue.current !== value) {
      stopAnimation();
      logicalValue.current = value;
      index.current = count * 2 + value;
      if (viewport.current) viewport.current.scrollTop = index.current * wheelRowHeight;
      initialised.current = true;
    }
  }, [value, count]);

  useEffect(() => () => {
    clearTimeout(settleTimer.current);
    if (animation.current !== undefined) cancelAnimationFrame(animation.current);
    if (unlockFrame.current !== undefined) cancelAnimationFrame(unlockFrame.current);
  }, []);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.deltaY === 0) return;
      event.preventDefault();
      choose(index.current + Math.sign(event.deltaY));
    };
    element.addEventListener('wheel', handleWheel, { passive: false });
    return () => element.removeEventListener('wheel', handleWheel);
  }, [count]);

  // Cancels visual work when a new interaction takes control of scrolling.
  function stopAnimation() {
    if (animation.current !== undefined) cancelAnimationFrame(animation.current);
    if (unlockFrame.current !== undefined) cancelAnimationFrame(unlockFrame.current);
    animation.current = undefined;
    unlockFrame.current = undefined;
    programmatic.current = false;
    viewport.current?.removeAttribute('data-animating');
    clearTimeout(settleTimer.current);
  }

  // Returns to the middle cycle without changing the selected time.
  function recentre() {
    const element = viewport.current;
    if (!element) return;
    index.current = count * 2 + logicalValue.current;
    element.scrollTop = index.current * wheelRowHeight;
    element.removeAttribute('data-animating');
    // Ignore the scroll event generated by the invisible cycle reset.
    unlockFrame.current = requestAnimationFrame(() => { programmatic.current = false; });
  }

  // Commits a discrete choice before animating the wheel to its row.
  function choose(next: number) {
    const element = viewport.current;
    if (!element) return;
    stopAnimation();
    if (next < count || next >= count * 4) {
      const shift = next < count ? count * 2 : -count * 2;
      next += shift;
      element.scrollTop += shift * wheelRowHeight;
    }
    index.current = next;
    logicalValue.current = wrapWheelValue(next, count);
    change.current(logicalValue.current);
    programmatic.current = true;
    element.setAttribute('data-animating', 'true');
    const start = element.scrollTop;
    const target = next * wheelRowHeight;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.scrollTop = target;
      recentre();
      return;
    }
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / 160);
      element.scrollTop = start + (target - start) * (1 - (1 - progress) ** 3);
      if (progress < 1) animation.current = requestAnimationFrame(tick);
      else { animation.current = undefined; recentre(); }
    };
    animation.current = requestAnimationFrame(tick);
  }

  // Maps keyboard movement to rows and lets Enter confirm the current time.
  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      onConfirm();
      return;
    }
    const cycleStart = index.current - wrapWheelValue(index.current, count);
    const next: Record<string, number> = {
      ArrowUp: index.current - 1, ArrowDown: index.current + 1,
      PageUp: index.current - 5, PageDown: index.current + 5,
      Home: cycleStart, End: cycleStart + count - 1,
    };
    if (event.key in next) { event.preventDefault(); choose(next[event.key]); }
  }

  // Saves touch movement immediately so closing cannot cancel a pending edit.
  function handleScroll() {
    const element = viewport.current;
    if (!element || programmatic.current) return;
    // Rebase native touch scrolling before it can reach either physical end.
    if (element.scrollTop < count * wheelRowHeight) element.scrollTop += count * 2 * wheelRowHeight;
    else if (element.scrollTop >= count * 4 * wheelRowHeight) element.scrollTop -= count * 2 * wheelRowHeight;
    index.current = Math.round(element.scrollTop / wheelRowHeight);
    logicalValue.current = wrapWheelValue(index.current, count);
    change.current(logicalValue.current);
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      programmatic.current = true;
      recentre();
    }, 150);
  }

  return (
    <div>
      <span className={styles.timeHeading}>{label}</span>
      <div className={styles.wheel}>
        <div className={styles.wheelBand} />
        <div ref={viewport} className={styles.wheelViewport} role="spinbutton" tabIndex={0}
          aria-label={label} aria-valuemin={0} aria-valuemax={count - 1} aria-valuenow={value}
          aria-valuetext={String(value).padStart(2, '0')} onKeyDown={handleKey}
          onPointerDown={stopAnimation} onScroll={handleScroll}>
          <div aria-hidden="true">
            {Array.from({ length: count * wheelCopies }, (_, row) => (
              <Button key={row} excludeFromTabOrder preventFocusOnPress className={styles.wheelValue}
                data-selected={wrapWheelValue(row, count) === value || undefined} onPress={() => choose(row)}>
                {String(wrapWheelValue(row, count)).padStart(2, '0')}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Maps any repeated-cycle row to its hour or minute value.
function wrapWheelValue(value: number, count: number) {
  return ((value % count) + count) % count;
}
