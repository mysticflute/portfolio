import Button, { Props as ButtonProps } from '@/components/button/button';
import Icon, { Props as IconProps } from '@/components/icon/icon';
import styles from './iconButton.module.css';

type Props = ButtonProps & {
  /**
   * Name of the icon to use.
   */
  iconName: IconProps['name'];
};

/**
 * Displays a Button component with an Icon to the left.
 */
export default function IconButton({ type, href, children, iconName }: Props) {
  return (
    <Button type={type} href={href}>
      <Icon name={iconName} hasTextAfter={true} className={styles.icon} />
      {children}
    </Button>
  );
}
