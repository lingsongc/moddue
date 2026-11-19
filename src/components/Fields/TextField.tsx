import {
  TextField as AriaTextField, Label, Input,
  type TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components';
import { FieldSupport } from './FieldSupport';
import styles from './Fields.module.css';

export type TextFieldProps = Omit<AriaTextFieldProps, 'children' | 'className'> & {
  label: string;
  placeholder?: string;
  description?: string;
  errorMessage?: string;
};

export function TextField({ label, placeholder, description, errorMessage, isRequired = true, ...props }: TextFieldProps) {
  return (
    <AriaTextField {...props} isRequired={isRequired} className={styles.field}>
      <Label className={styles.label}>{label}{!isRequired && ' (optional)'}</Label>
      <Input className={styles.input} placeholder={placeholder} />
      <FieldSupport description={description} errorMessage={errorMessage} />
    </AriaTextField>
  );
}
