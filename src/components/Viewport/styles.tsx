import styled from "styled-components";
import { animated } from "react-spring";

export default {
  Container: styled.div`
    margin-top: 80px;
    height: calc(100vh - 80px);
    width: 100vw;
    position: relative;
    overflow: hidden;
  `,

  AnimationWrapper: styled(animated.div)`
    height: 100%;
    width: 100%;
    display: flex;
    position: absolute;
  `,

  MainContainer: styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: calc(100% - 80px);
  `,

  Footer: styled.footer`
    height: 80px;
  `
};
