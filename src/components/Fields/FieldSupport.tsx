import { FieldError, Text } from 'react-aria-components';
import styles from './Fields.module.css';

type FieldSupportProps = { description?: string; errorMessage?: string };

export function FieldSupport({ description, errorMessage }: FieldSupportProps) {
  return (
    <div className={styles.support}>
      {description && <Text slot="description" className={styles.description}>{description}</Text>}
      <FieldError className={styles.error}>{errorMessage}</FieldError>
    </div>
  );
}
