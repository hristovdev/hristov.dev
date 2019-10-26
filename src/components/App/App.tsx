import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Open Sans', sans-serif;
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

const App: React.FC = () => {
  return (
    <Container>
      <GlobalStyles />
      <h1>UNDER CONSTRUCTION</h1>
    </Container>
  );
};

export default App;
