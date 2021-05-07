import React from "react";
import S from "./styled";
import { useSpring } from "react-spring";

const PageBackground: React.FC = () => {
  const backgroundProps = useSpring({
    from: {
      x: "-25",
    },
    to: {
      x: "-175",
    },
    loop: true,
    config: {
      duration: 720000,
    },
  });

  return (
    <S.BackgroundContainer>
      <S.Background
        src="world_map.svg"
        style={{
          transform: backgroundProps.x.to((x) => `translateX(${Number.parseFloat(x).toPrecision(4)}%)`),
        }}
      />
    </S.BackgroundContainer>
  );
};

export default React.memo(PageBackground, () => true);
