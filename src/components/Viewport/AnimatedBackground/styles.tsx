import styled from "styled-components";
import { animated } from "react-spring";

export default {
  BackgroundContainer: styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
  `,

  Background: animated(styled.img`
    height: 100%;
  `),
};
