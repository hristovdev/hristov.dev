import styled from "styled-components";
import { animated } from "react-spring";

export default {
  BackgroundContainer: styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: -1;
  `,

  Background: animated(styled.img`
    height: 100%;
  `),
};
