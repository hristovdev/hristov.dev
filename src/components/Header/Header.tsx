import React from "react";
import styled from "styled-components";
import Navigation from "../Navigation";

const Wrapper = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 80px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
`;

const LogoContainer = styled.div`
  background: red;
  padding: 0 5px;
  border-radius: 3px;
  opacity: 0.75;
  font-weight: 800;
  pointer-events: none;
  letter-spacing: 2px;
`;

const Header: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <LogoContainer>HRISTOV</LogoContainer>
        <Navigation />
      </Container>
    </Wrapper>
  );
};

export default Header;
