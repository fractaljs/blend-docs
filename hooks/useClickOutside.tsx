import { useEffect, RefObject } from 'react';

/**
 * Hook that detects clicks outside of the specified element
 * 
 * @param ref - React ref object pointing to the element to monitor
 * @param callback - Function to call when a click outside is detected
 * @param enabled - Optional boolean to enable/disable the hook (defaults to true)
 * 
 * @example
 * ```tsx
 * const ref = useRef(null);
 * useClickOutside(ref, () => {
 *   console.log('Clicked outside');
 * });
 * ```
 */
const useClickOutside = (
  ref: any,
  callback: () => void,
  enabled: boolean = true
): void => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, enabled]);
};

export default useClickOutside;
