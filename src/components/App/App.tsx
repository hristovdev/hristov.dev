import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Home from "../Home";
import Navigation from "../Navigation";
import Header from "../Header";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background: #1c1e1f;
    font-size: 0.9em;
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

  h2 {
    font-size: 3.5em;
  }

  h4 {
    font-size: 1.5em;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
        {/* <Header /> */}
        <Home />
      </Container>
    </ThemeProvider>
  );
};

export default App;
