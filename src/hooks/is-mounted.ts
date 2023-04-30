import { useState } from 'react';
import useIsomorphicLayoutEffect from './isomorphic-layout-effect';

export default function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  useIsomorphicLayoutEffect(() => { setIsMounted(true); }, []);
  return isMounted;
}
