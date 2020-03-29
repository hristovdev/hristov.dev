import styled from "styled-components";
import { animated } from "react-spring";
import worldMap from "../../world_map.svg";

export default {
  Container: styled.div`
    top: ${({ theme }): string => theme.sizes.headerHeight};
    height: calc(100vh - 80px);
    width: 100vw;
    position: relative;
    overflow: hidden;
  `,

  Main: animated(styled.main`
    display: flex;
    flex-direction: column;
    width: 100vw;
    overflow: hidden;
    background: url(${worldMap}) no-repeat;
    background-size: cover;
  `),

  AnimationWrapper: styled(animated.div)`
    height: 100%;
    width: 100%;
    display: flex;
    position: absolute;
  `,

  Footer: styled.footer`
    height: ${({ theme }): string => theme.sizes.headerHeight};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
  `,
};
