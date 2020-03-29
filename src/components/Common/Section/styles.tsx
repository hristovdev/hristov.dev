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
      isFullHeight ? `calc(100vh - ${theme.sizes.headerHeight})` : "50vh"};
  `,

  Content: animated(styled.div`
    position: relative;
    display: flex;
    align-items: center;
    max-width: 1000px;
    justify-content: space-between;
    width: 100%;
    flex-direction: column;
    justify-content: center;
  `),

  Header: styled.div`
    margin-bottom: ${({ theme }): string => theme.spacing[7]};

    &:after {
      content: "";
      display: block;
      height: 1px;
      width: 50%;
      background: white;
      margin-top: ${({ theme }): string => theme.spacing[3]};
    }
  `,
};
