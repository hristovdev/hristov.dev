import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background: #1c1e1f;
    font-size: ${({ theme }) => theme.fontSizes.text};
  }

  a {
    color: white;
    text-decoration: none;
    transition: all 250ms ease-in-out;

    &:hover {
      color: red;
    }
  }

  ul {
    list-style: none;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.heading[5]};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.heading[4]};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.heading[3]};;
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes.heading[2]};;
  }

  h5 {
    font-size: ${({ theme }) => theme.fontSizes.heading[1]};;
  }

  h6 {
    font-size: ${({ theme }) => theme.fontSizes.heading[0]};;
  }
`;

export default GlobalStyles;
