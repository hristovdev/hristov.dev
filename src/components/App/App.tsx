import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GlobalStyles from "./globalStyles";
import theme from "./theme";
import Viewport from "../Viewport";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyles />
        <Route path="/:section?" component={Viewport} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
