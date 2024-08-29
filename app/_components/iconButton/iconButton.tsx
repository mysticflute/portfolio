import { clsx } from 'clsx';
import Button, { Props as ButtonProps } from '@/components/button/button';
import Icon, { Props as IconProps } from '@/components/icon/icon';
import styles from './iconButton.module.css';

type Props = ButtonProps & {
  /**
   * Name of the icon to use.
   */
  iconName: IconProps['name'];

  /**
   * CSS class name for the top element.
   */
  className?: string;
};

/**
 * Displays a Button component with an Icon to the left.
 */
export default function IconButton({
  type,
  href,
  inverse,
  children,
  iconName,
  className,
}: Props) {
  return (
    <Button
      type={type}
      href={href}
      inverse={inverse}
      className={clsx(styles.button, className)}
    >
      <Icon name={iconName} decorative hasTextAfter className={styles.icon} />
      {children}
    </Button>
  );
}
