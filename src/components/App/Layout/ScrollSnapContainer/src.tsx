import { forwardRef, CSSProperties, useState, useCallback, useEffect } from "react";
import ScrollSnap from "scroll-snap";
import S from "./styled";

function callback() {
  console.log("snapped");
}

interface Props {
  style: CSSProperties;
}

const ScrollSnapContainer = forwardRef<HTMLDivElement, Props>(({ children, style }, ref) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  const onRefChange = useCallback((instance: HTMLDivElement | null) => {
    setElement(instance);
  }, []);

  const extended = useCallback(
    (instance: HTMLDivElement | null) => {
      if (typeof ref !== "function") {
        return;
      }

      ref(instance);
      onRefChange(instance);
    },
    [onRefChange, ref]
  );

  const bindScrollSnap = useCallback(() => {
    if (!element) {
      return;
    }

    console.log("SET!");
    const snapElement = new ScrollSnap(element, {
      snapDestinationY: "100%",
    });

    snapElement.bind(callback);
  }, [element]);

  useEffect(() => {
    bindScrollSnap();
  }, [bindScrollSnap]);

  return (
    <S.Container ref={extended} style={style}>
      {children}
    </S.Container>
  );
});

ScrollSnapContainer.displayName = "ScrollSnapContainer";

export default ScrollSnapContainer;
