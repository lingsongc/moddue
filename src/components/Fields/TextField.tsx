/** Shared React Aria text field; multiline mode retains native resizing and field validation. */
import type { CSSProperties } from 'react';
import {
  TextField as AriaTextField, Label, Input, TextArea,
  type TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components';
import { FieldSupport } from './FieldSupport';
import styles from './Fields.module.css';

export type TextFieldProps = Omit<AriaTextFieldProps, 'children' | 'className'> & {
  label: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
};

/** Fields are required by default; multiline bounds apply to the native vertical resize control. */
export function TextField({
  label,
  placeholder,
  description,
  errorMessage,
  multiline = false,
  minRows: requestedMinRows = 3,
  maxRows: requestedMaxRows = 8,
  isRequired = true,
  ...props
}: TextFieldProps) {
  const minRows = Number.isSafeInteger(requestedMinRows) && requestedMinRows > 0 ? requestedMinRows : 3;
  const requestedMax = Number.isSafeInteger(requestedMaxRows) && requestedMaxRows > 0 ? requestedMaxRows : 8;
  const maxRows = Math.max(minRows, requestedMax);
  const control = multiline ? (
    <div className={styles.textareaFrame}>
      <TextArea
        className={styles.textarea}
        placeholder={placeholder}
        rows={minRows}
        style={{ '--textarea-min-rows': minRows, '--textarea-max-rows': maxRows } as CSSProperties}
      />
    </div>
  ) : (
    <Input className={styles.input} placeholder={placeholder} />
  );

  return (
    <AriaTextField {...props} isRequired={isRequired} className={styles.field}>
      <Label className={styles.label}>{label}{!isRequired && ' (Optional)'}</Label>
      {control}
      <FieldSupport description={description} errorMessage={errorMessage} />
    </AriaTextField>
  );
}
