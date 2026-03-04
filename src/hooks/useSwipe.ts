import { useRef, useCallback, type PointerEventHandler } from 'react';

const SWIPE_THRESHOLD = 50;

export function useSwipe(onPrev: () => void, onNext: () => void) {
  const startX = useRef(0);
  const dragging = useRef(false);

  const onPointerDown: PointerEventHandler = useCallback((e) => {
    startX.current = e.clientX;
    dragging.current = true;
    // Capture on the container (currentTarget), not the child image
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove: PointerEventHandler = useCallback((e) => {
    if (dragging.current) e.preventDefault();
  }, []);

  const onPointerUp: PointerEventHandler = useCallback(
    (e) => {
      if (!dragging.current) return;
      dragging.current = false;
      const diff = e.clientX - startX.current;
      if (diff > SWIPE_THRESHOLD) onPrev();
      else if (diff < -SWIPE_THRESHOLD) onNext();
    },
    [onPrev, onNext],
  );

  return { onPointerDown, onPointerMove, onPointerUp };
}
