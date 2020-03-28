import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: ${({ theme }): string => theme.colors.text.primary};
    font-family: ${({ theme }): string => theme.font};
    background: ${({ theme }): string => theme.colors.pageBackground};
    font-size: ${({ theme }): string => theme.fontSizes.text};
  }

  a {
    color: ${({ theme }): string => theme.colors.text.primary};;
    text-decoration: none;
    transition: all 250ms ease-in-out;

    &:hover {
      color: ${({ theme }): string => theme.colors.primary};;
    }
  }

  ul {
    list-style: none;
  }

  h1 {
    font-size: ${({ theme }): string => theme.fontSizes.heading[5]};
  }

  h2 {
    font-size: ${({ theme }): string => theme.fontSizes.heading[4]};
  }

  h3 {
    font-size: ${({ theme }): string => theme.fontSizes.heading[3]};;
  }

  h4 {
    font-size: ${({ theme }): string => theme.fontSizes.heading[2]};;
  }

  h5 {
    font-size: ${({ theme }): string => theme.fontSizes.heading[1]};;
  }

  h6 {
    font-size: ${({ theme }): string => theme.fontSizes.heading[0]};;
  }
`;

export default GlobalStyles;
