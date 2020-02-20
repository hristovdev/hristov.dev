import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Home from "../Home";
import Navigation from "../Navigation";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Open Sans', sans-serif;
  }

  a {
    color: white;
    text-decoration: none;

    &:hover {
      color: red;
    }
  }

  ul {
    list-style: none;
  }

  h2 {
    font-size: 3.5em;
  }

  h4 {
    font-size: 1.5em;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #1c1e1f;
  color: #fff;
`;

const theme = {
  color: {
    primary: "red",
    secondary: ""
  },
  spacing: {
    small: "10px",
    medium: "20px",
    large: "30px"
  }
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        <Navigation />
        <Home />
      </Container>
    </ThemeProvider>
  );
};

export default App;
