import React, { PropsWithChildren, useEffect, useRef, forwardRef, RefObject } from "react";
import { config, useSpring } from "react-spring";
import useViewportDetection from "../../../hooks/useViewportDetection";
import S from "./styles";

type Ref = HTMLDivElement;

interface Props {
  isFullHeight?: boolean;
  header?: string;
  onFocused: () => void;
}

const Section = forwardRef<Ref, PropsWithChildren<Props>>(
  ({ children, header, onFocused, isFullHeight = false }, ref) => {
    const wasInViewportRef = useRef(false);

    const { isInViewport } = useViewportDetection({
      target: ref as RefObject<HTMLDivElement>,
      options: {
        rootMargin: "-50% 0% -50% 0%",
      },
    });

    useEffect(() => {
      wasInViewportRef.current = isInViewport;
    });

    const wasInViewport = wasInViewportRef.current;

    const animationProps = useSpring({
      opacity: isInViewport ? 1 : 0,
      top: isInViewport ? "0vh" : "5vh",
      config: config.slow,
    });

    useEffect(() => {
      if (!wasInViewport && isInViewport) {
        onFocused();
      }
    }, [onFocused, isInViewport, wasInViewport]);

    return (
      <S.Container isFullHeight={isFullHeight} ref={ref}>
        <S.Content style={animationProps}>
          {header && (
            <S.Header>
              <h3>{header}</h3>
            </S.Header>
          )}
          {children}
        </S.Content>
      </S.Container>
    );
  }
);

export default Section;
