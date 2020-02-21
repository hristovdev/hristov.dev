import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Home";
import Header from "../Header";
import S from "./styles";
import GlobalStyles from "./globalStyles";
import theme from "./theme";
import Skills from "../Skills";
import About from "../About";
import Experience from "../Experience";
import ContactMe from "../ContactMe";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyles />
        <S.Container>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/skills" exact component={Skills} />
            <Route path="/experience" exact component={Experience} />
            <Route path="/contact" exact component={ContactMe} />
          </Switch>
        </S.Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
