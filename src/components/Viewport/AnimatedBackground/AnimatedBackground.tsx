import React from "react";
import S from "./styles";
import { useSpring } from "react-spring";
import worldMap from "../../../world_map.svg";

const AnimatedBackground: React.FC = () => {
  const backgroundProps = useSpring({
    from: { x: "-25" },
    // eslint-disable-next-line
    to: async (next: any) => {
      while (true) {
        await next({ x: "-75", config: { duration: 360000 } });
        await next({ x: "-25", config: { duration: 360000 } });
      }
    },
  });

  return (
    <S.BackgroundContainer>
      <S.Background
        src={worldMap}
        style={{
          // eslint-disable-next-line
          transform: (backgroundProps as any).x.interpolate(
            (x) => `translateX(${Number.parseFloat(x).toPrecision(4)}%)`
          ),
        }}
      />
    </S.BackgroundContainer>
  );
};

export default React.memo(AnimatedBackground, () => true);
