/** Shared accessible radio-group control with Moddue field support. */
import {
  Label,
  Radio,
  RadioGroup as AriaRadioGroup,
  type RadioGroupProps as AriaRadioGroupProps,
} from 'react-aria-components';
import { FieldSupport } from '../Fields/FieldSupport';
import styles from './RadioGroup.module.css';

export type RadioGroupOption = {
  value: string;
  label: string;
  isDisabled?: boolean;
};

export type RadioGroupProps = Omit<AriaRadioGroupProps, 'children' | 'className'> & {
  label: string;
  options: RadioGroupOption[];
  description?: string;
  errorMessage?: string;
};

/** Defaults to a required vertical group; React Aria owns orientation and keyboard interaction. */
export function RadioGroup({
  label,
  options,
  description,
  errorMessage,
  isRequired = true,
  ...props
}: RadioGroupProps) {
  return (
    <AriaRadioGroup {...props} isRequired={isRequired} className={styles.group}>
      <Label className={styles.label}>{label}{!isRequired && ' (Optional)'}</Label>
      <div className={styles.options}>
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            isDisabled={option.isDisabled}
            className={styles.radio}
          >
            <span aria-hidden="true" className={styles.target}>
              <span className={styles.indicator}><span className={styles.selectedMark} /></span>
            </span>
            <span className={styles.optionLabel}>{option.label}</span>
          </Radio>
        ))}
      </div>
      <FieldSupport description={description} errorMessage={errorMessage} />
    </AriaRadioGroup>
  );
}
