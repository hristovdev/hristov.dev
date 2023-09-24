import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import theme from "../../theme";
import Layout from "./Layout";

export interface RootRouteParams {
  section?: string;
}

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Route path="/:section?" Component={Layout} />
      </Router>
    </ThemeProvider>
  );
};

export default App;
