import styled from "styled-components";
import { animated } from "react-spring";

export default {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    /* position: absolute;
    overflow: auto;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    } */
  `,

  ScrollDownContainer: styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 150px; // TODO: Fix me
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  Main: styled.main`
    display: flex;
    flex-direction: column;
    width: 100vw;
    position: relative;
  `,

  AnimationWrapper: styled(animated.div)`
    height: 100%;
    width: 100%;
    display: flex;
    position: absolute;
  `,

  Footer: styled.footer`
    height: ${({ theme }): string => `calc(1.5 * ${theme.sizes.headerHeight})`};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);

    & p {
      padding: ${({ theme }): string => theme.spacing[2]};
    }
  `,
};
