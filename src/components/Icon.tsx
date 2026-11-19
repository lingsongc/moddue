// Shared Tabler icon defaults; callers can override size, stroke and SVG attributes.
import type { IconProps as TablerIconProps, TablerIcon } from '@tabler/icons-react';

type IconProps = TablerIconProps & {
  icon: TablerIcon;
};

/** Renders a Tabler icon with the agreed Moddue size and stroke. */
export function Icon({ icon: Component, size = 16, stroke = 1.8, ...props }: IconProps) {
  return <Component size={size} stroke={stroke} {...props} />;
}
