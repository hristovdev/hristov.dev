import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${(props): string => props.theme.font};
  }

  body {
    color: ${(props): string => props.theme.colors.text.primary};
    background: ${(props): string => props.theme.colors.pageBackground};
    font-size: ${(props): string => props.theme.fontSizes.text};
  }

  a {
    color: ${(props): string => props.theme.colors.text.primary};
    text-decoration: none;
    transition: all 250ms ease-in-out;

    &:hover {
      color: ${(props): string => props.theme.colors.primary};
    }
  }

  ul {
    list-style: none;
  }

  h1 {
    font-size: ${(props): string => props.theme.fontSizes.heading[5]};
  }

  h2 {
    font-size: ${(props): string => props.theme.fontSizes.heading[4]};
  }

  h3 {
    font-size: ${(props): string => props.theme.fontSizes.heading[3]};
  }

  h4 {
    font-size: ${(props): string => props.theme.fontSizes.heading[2]};
  }

  h5 {
    font-size: ${(props): string => props.theme.fontSizes.heading[1]};
  }

  h6 {
    font-size: ${(props): string => props.theme.fontSizes.heading[0]};
  }

  ::selection {
    color: ${(props): string => props.theme.colors.light};
    background: ${(props): string => props.theme.colors.primary};
  }
`;
