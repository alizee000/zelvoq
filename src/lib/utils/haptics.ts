/**
 * Triggers a subtle haptic feedback vibration on supported devices (Android).
 * iOS web browser support is extremely limited, so this degrades gracefully.
 */
export const triggerHaptic = (style: 'light' | 'medium' | 'heavy' = 'light') => {
  if (typeof window === 'undefined' || !window.navigator || !window.navigator.vibrate) {
    return;
  }

  try {
    switch (style) {
      case 'light':
        window.navigator.vibrate(10);
        break;
      case 'medium':
        window.navigator.vibrate(20);
        break;
      case 'heavy':
        window.navigator.vibrate(30);
        break;
    }
  } catch (e) {
    // Silently fail if browser blocks vibration API
  }
};
