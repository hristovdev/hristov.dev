import { useEffect, useState, useRef, useCallback } from "react";

interface UseViewportDetectionProps {
  target: React.RefObject<HTMLElement>;
  options?: IntersectionObserverInit;
}

interface UseViewportDetectionResult {
  isInViewport: boolean;
}

type UseViewportDetection = (props: UseViewportDetectionProps) => UseViewportDetectionResult;

const useViewportDetection: UseViewportDetection = ({ target, options }) => {
  const [isInViewport, setIsInViewport] = useState(false);

  const intersected = useRef(false);

  const handleIntersection: IntersectionObserverCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      const { isIntersecting, intersectionRatio } = entry;
      const shouldBeInViewport = isIntersecting ? isIntersecting : intersectionRatio > 0;

      // enter
      if (shouldBeInViewport && !intersected.current) {
        intersected.current = true;
        setIsInViewport(true);

        return;
      }

      // leave
      if (!shouldBeInViewport && intersected.current) {
        intersected.current = false;
        setIsInViewport(false);
      }
    });
  }, []);

  const observer = useRef<IntersectionObserver | null>(new IntersectionObserver(handleIntersection, options));

  const startObserver = useCallback((): void => {
    if (target.current && observer.current) {
      observer.current.observe(target.current);
    }
  }, [target]);

  const stopObserver = useCallback((): void => {
    if (target.current && observer.current) {
      observer.current.unobserve(target.current);
    }
  }, [target]);

  useEffect(() => {
    startObserver();

    return (): void => {
      stopObserver();
    };
  }, [startObserver, stopObserver]);

  useEffect(() => {
    const obs = observer.current;

    return (): void => {
      obs?.disconnect();
    };
  }, []);

  return {
    isInViewport,
  };
};

export default useViewportDetection;
