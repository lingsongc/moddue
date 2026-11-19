import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';
import type { CSSProperties, ReactNode, Ref } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'icon' | 'outline';
type Dimension = number | string;
export type ButtonProps = Omit<AriaButtonProps, 'children' | 'className' | 'style'> & {
  children?: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  color?: string;
  onColor?: string;
  height?: Dimension;
  width?: Dimension;
  padding?: Dimension;
  iconSize?: Dimension;
  fontSize?: Dimension;
  className?: string;
  style?: CSSProperties;
  ref?: Ref<HTMLButtonElement>;
};

/** Shared interaction and layout for all Moddue button treatments. */
export function Button({
  children, variant = 'primary', icon, iconPosition = 'left', color, onColor,
  height, width, padding, iconSize, fontSize, className = '', style, ref, ...props
}: ButtonProps) {
  if (variant === 'icon' && !props['aria-label'] && !props['aria-labelledby']) {
    throw new Error('Icon buttons require aria-label or aria-labelledby.');
  }
  const variables = {
    '--button-color': color,
    '--button-on-color': onColor,
    '--button-height': dimension(height),
    '--button-padding': dimension(padding),
    '--button-icon-size': dimension(iconSize),
    '--button-font-size': dimension(fontSize),
    width: variant === 'icon' ? dimension(height ?? 40) : dimension(width),
    ...style,
  } as CSSProperties;

  return (
    <AriaButton {...props} ref={ref} className={`${styles.button} ${className}`} style={variables}
      data-variant={variant}>
      {variant === 'icon' ? <span className={styles.icon} aria-hidden="true">{icon ?? children}</span> : <>
        {icon && <span className={`${styles.slot} ${iconPosition !== 'left' ? styles.emptySlot : ''}`} aria-hidden="true">
          {iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
        </span>}
        <span className={styles.label}>{children}</span>
        {icon && <span className={`${styles.slot} ${iconPosition !== 'right' ? styles.emptySlot : ''}`} aria-hidden="true">
          {iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
        </span>}
      </>}
    </AriaButton>
  );
}

function dimension(value: Dimension | undefined) {
  return typeof value === 'number' ? `${value}px` : value;
}
