import React, { type CSSProperties } from 'react';
import { clsx } from 'clsx';
import styles from './box.module.css';

export type Props = {
  /**
   * The box style.
   *
   * @defaultValue "hover".
   */
  type?: 'text' | 'flat' | 'hover' | 'raised';

  /**
   * The HTML tag to use for the top element.
   *
   * @defaultValue "div".
   */
  tag?: 'div' | 'section' | 'article';

  /**
   * CSS class name for the top element.
   */
  className?: string;

  /**
   * Inline styles for the top element.
   */
  style?: CSSProperties;

  /**
   * Child components.
   */
  children: React.ReactNode;
};

/**
 * Displays a styled box with content.
 */
export default function Box({
  type = 'hover',
  tag = 'div',
  className,
  style,
  children,
}: Props) {
  return React.createElement(
    tag,
    { className: clsx(styles.box, styles[type], className), style },
    children,
  );
}
