import { useState, useRef, useMemo, useCallback } from 'react';


export default function useElementSize<T extends HTMLElement>() {
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const updateFrom = useCallback((node: T) => {
    setWidth(node.clientWidth || node.offsetWidth);
    setHeight(node.clientHeight || node.offsetHeight);
  }, []);

  const cleanupRef = useRef<(() => unknown) | null>(null);
  const measuredRef: ((el: T | null) => void) & { current: T | null } = useMemo(() => Object.assign(
    (element: T | null) => {
      measuredRef.current = element;

      if (cleanupRef.current) {
        // Either the element has been removed from the DOM, or a value in the dependencies array
        // has changed (the latter doesn’t happen in practice)
        // In either case we need to run cleanup
        cleanupRef.current();
        cleanupRef.current = null;
      }

      if (element !== null) {
        // Either the element has been added to the DOM or the identity of this ref function has
        // changed and we've just run the cleanup function (the latter doesn’t happen in practice).
        // In either case, we should attach the ResizeObserver to the current element.
        updateFrom(element);
        const ro = new ResizeObserver(() => { updateFrom(element); });
        ro.observe(element);
        cleanupRef.current = () => ro.unobserve(element);
      // Element was removed from DOM
      } else { setWidth(null); setHeight(null); }
    },
    { current: null },
  ), [updateFrom]); // updateFrom never changes, so measuredRef is stable

  return useMemo(() => [measuredRef, [width, height]] as const, [measuredRef, width, height]);
}
