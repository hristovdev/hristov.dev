import React, { PropsWithChildren, useRef, useEffect } from "react";
import { config, useSpring } from "react-spring";
import useViewportDetection from "../../../hooks/useViewportDetection";
import S from "./styles";
import { useHistory } from "react-router-dom";

interface Props {
  isFullHeight?: boolean;
  route: string;
}

const Section: React.FC<PropsWithChildren<Props>> = ({ children, route, isFullHeight = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { push } = useHistory();

  const { isInViewport } = useViewportDetection({
    target: ref,
    options: {
      rootMargin: "-50% 0% -50% 0%",
    },
  });

  const animationProps = useSpring({
    opacity: isInViewport ? 1 : 0,
    top: isInViewport ? "0vh" : "5vh",
    config: config.slow,
  });

  useEffect(() => {
    if (isInViewport) {
      push(route);
    }
  }, [push, route, isInViewport]);

  return (
    <S.Container isFullHeight={isFullHeight} ref={ref}>
      <S.Content style={animationProps}>{children}</S.Content>
    </S.Container>
  );
};

export default Section;
