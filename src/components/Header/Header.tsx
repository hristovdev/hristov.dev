import React from "react";
import Navigation from "../Navigation";
import S from "./styles";

const Header: React.FC = () => {
  return (
    <S.Header>
      <S.Container>
        <S.LogoContainer>HRISTOV</S.LogoContainer>
        <Navigation />
      </S.Container>
    </S.Header>
  );
};

export default Header;
