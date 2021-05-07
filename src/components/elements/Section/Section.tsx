import { forwardRef, PropsWithChildren, RefObject, useEffect } from "react";
import { config, useSpring } from "react-spring";
import usePrevious from "../../../hooks/usePrevious";
import useViewportDetection from "../../../hooks/useViewportDetection";
import S from "./styled";

interface Props {
  isFullHeight?: boolean;
  header?: string;
  onFocused: () => void;
}

const Section = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  ({ children, header, onFocused, isFullHeight = false }, ref) => {
    const { isInViewport } = useViewportDetection({
      target: ref as RefObject<HTMLDivElement>,
      options: { rootMargin: "-50%" },
    });

    const wasInViewport = usePrevious(isInViewport);

    const animationProps = useSpring({
      opacity: isInViewport ? 1 : 0,
      top: isInViewport ? "0vh" : "5vh",
      config: config.slow,
      delay: 250,
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
              <S.HeaderText text={header}>{header}</S.HeaderText>
            </S.Header>
          )}
          {children}
        </S.Content>
      </S.Container>
    );
  }
);

export default Section;
