import { animated } from "react-spring";
import styled from "styled-components";

export default {
  ClickableContainer: styled(animated.a)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    & > * + * {
      margin-top: 20px;
    }
  `,
};
