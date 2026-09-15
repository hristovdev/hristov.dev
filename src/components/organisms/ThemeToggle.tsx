'use client';

import { Button } from 'react-aria-components';
import styles from './ThemeToggle.module.scss';

/**
 * Switches the theme.
 *
 * Both labels are rendered and CSS picks one, so the markup is identical on
 * the server and the client — the server cannot know which theme the
 * pre-paint script will apply, and rendering only the right one would be a
 * hydration mismatch.
 *
 * Not a ToggleButton: the pressed state lives on <html> as a class that a
 * blocking script sets before React exists, so there is no React state for a
 * toggle to own. The label names the theme you would switch *to*.
 */
export function ThemeToggle({
  onToggle,
  label,
  toLight,
  toDark,
}: {
  onToggle: () => void;
  label: string;
  toLight: string;
  toDark: string;
}) {
  return (
    <Button onPress={onToggle} className={styles.button} aria-label={label}>
      <span className={styles.whenDark}>{toLight}</span>
      <span className={styles.whenLight}>{toDark}</span>
    </Button>
  );
}
