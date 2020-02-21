import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyles from "./globalStyles";
import theme from "./theme";
import Viewport from "../Viewport";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyles />
        <Viewport />
      </Router>
    </ThemeProvider>
  );
};

export default App;
