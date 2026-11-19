import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

export function useFieldPopoverStyle() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState('19.5px');
  const [fontSize, setFontSize] = useState('16px');

  // Font-size changes need not resize the fixed-height field.
  useLayoutEffect(update);
  useLayoutEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    const observer = new ResizeObserver(update);
    observer.observe(field);
    return () => observer.disconnect();
  }, []);

  // Popovers portal to the document body, outside the field's CSS inheritance.
  return { fieldRef, popoverStyle: { '--field-radius': radius, '--field-font-size': fontSize } as CSSProperties };

  function update() {
    if (!fieldRef.current) return;
    const style = getComputedStyle(fieldRef.current);
    setRadius(style.getPropertyValue('--field-radius').trim() || '19.5px');
    setFontSize(style.fontSize);
  }
}
