import styled from "styled-components";
import { animated } from "react-spring";

interface ContainerProps {
  isFullHeight?: boolean;
}

export default {
  Container: styled.section<ContainerProps>`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: ${({ isFullHeight, theme }): string =>
      isFullHeight ? `0 0 ${theme.sizes.headerHeight} 0` : `${theme.spacing[8]} 0`};
    min-height: ${({ isFullHeight, theme }): string =>
      isFullHeight ? `calc(100vh - 2 * ${theme.sizes.headerHeight})` : "50vh"};
  `,

  Content: animated(styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 1000px;
    justify-content: space-between;

    @media only screen and (max-width: 800px) {
      flex-direction: column;
    }

    @media only screen and (min-width: 801px) {
      flex-direction: row-reverse;

      > * + * {
        margin-right: ${({ theme }): string => theme.spacing[7]};
      }
    }
  `),
};
