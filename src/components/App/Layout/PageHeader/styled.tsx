import styled from "styled-components";
import { animated } from "react-spring";

export default {
  Header: styled(animated.header)`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: ${({ theme }): string => theme.sizes.headerHeight};
    display: flex;
    justify-content: center;
    z-index: 100;
  `,

  Container: styled.div`
    width: 100%;
    height: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
  `,

  LogoContainer: styled.div`
    background: ${({ theme }): string => theme.colors.primary};
    padding: 0 5px;
    border-radius: 3px;
    font-weight: 800;
    pointer-events: none;
    letter-spacing: 2px;
    font-size: ${(props) => props.theme.fontSizes.heading[1]};
  `,
};
