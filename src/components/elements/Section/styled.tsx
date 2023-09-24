import styled from "styled-components";
import { animated } from "react-spring";

interface ContainerProps {
  isFullHeight?: boolean;
}

interface HeaderTextProps {
  text: string;
}

export default {
  Container: styled.section<ContainerProps>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: ${({ isFullHeight, theme }): string =>
      isFullHeight ? `0 0 ${theme.sizes.headerHeight} 0` : `${theme.spacing[8]} 0`};
    min-height: 100%;
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
      height: ${({ theme }): string => theme.spacing[2]};
      border-radius: ${({ theme }): string => theme.spacing[1]};
      width: 50%;
      background: ${({ theme }): string => theme.colors.primary};
      margin-top: ${({ theme }): string => theme.spacing[3]};
    }
  `,

  HeaderText: styled.h3<HeaderTextProps>`
    text-transform: capitalize;

    &:before {
      content: "${(props) => props.text}";
      position: absolute;
      font-size: ${(props) => props.theme.fontSizes.heading[4]};
      opacity: 0.015;
      pointer-events: none;
    }
  `,

  BottomEffect: styled.div`
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  `,
};
