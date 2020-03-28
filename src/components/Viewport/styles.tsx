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

  ScrollContent: styled.div`
    display: flex;
    flex-direction: column;
  `,

  AnimationWrapper: styled(animated.div)`
    height: 100%;
    width: 100%;
    display: flex;
    position: absolute;
  `,

  Footer: styled.footer`
    height: 80px;
  `,
};
