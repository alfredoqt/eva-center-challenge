import {useEffect, useRef, useState} from 'react';

/**
 * Hook that starts a timeout and clears it when the component unmounts
 * It returns whether the timeout is pending or not
 * @param {number} ms Time to set the timeout in milliseconds
 * @returns {boolean} Indicates whether the timeout is pending
 */
export default function useTimeout(ms: number): boolean {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Indicates whether the timeout has finished
  const [pending, setPending] = useState(true);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setPending(false);
    }, ms);

    let ref = timeoutRef;
    return function () {
      if (ref.current) {
        clearTimeout(ref.current);
      }
    };
  }, [setPending, ms]);

  return pending;
}
