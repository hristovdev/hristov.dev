import React, { PropsWithChildren, useRef, useEffect } from "react";
import { config, useSpring } from "react-spring";
import useViewportDetection from "../../../hooks/useViewportDetection";
import S from "./styles";
import { useHistory } from "react-router-dom";

interface Props {
  isFullHeight?: boolean;
  header?: string;
  route: string;
}

const Section: React.FC<PropsWithChildren<Props>> = ({ children, route, header, isFullHeight = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const wasInViewportRef = useRef(false);
  const { push } = useHistory();

  const { isInViewport } = useViewportDetection({
    target: ref,
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
      push(route);
    }
  }, [push, route, isInViewport, wasInViewport]);

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
};

export default Section;
