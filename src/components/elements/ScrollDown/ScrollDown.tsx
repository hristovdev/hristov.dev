import { useSpring } from "@react-spring/core";
import { animated } from "@react-spring/web";
import React from "react";
import { CgMouse } from "react-icons/cg";
import S from "./styled";

interface Props {
  isVisible?: boolean;
  onClick: () => void;
}

const ScrollDown: React.FC<Props> = ({ onClick, isVisible }) => {
  const animationProps = useSpring({
    loop: true,
    from: {
      y: "0%",
    },
    to: [
      {
        y: "-45%",
      },
      {
        y: "0%",
      },
    ],
  });

  const opacityProps = useSpring({
    opacity: isVisible ? 1 : 0,
  });

  return (
    <S.ClickableContainer onClick={onClick} style={opacityProps}>
      <span>Scroll Down</span>
      <animated.div style={{ transform: animationProps.y.to((y) => `translateY(${y})`) }}>
        <CgMouse size="30px" />
      </animated.div>
    </S.ClickableContainer>
  );
};

export default ScrollDown;
