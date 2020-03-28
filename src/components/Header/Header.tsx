import React from "react";
import { useSpring } from "react-spring";
import Navigation from "../Navigation";
import S from "./styles";

interface Props {
  hasBackground?: boolean;
}

const Header: React.FC<Props> = ({ hasBackground }) => {
  const backgroundProps = useSpring({
    background: hasBackground ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0)",
  });

  return (
    <S.Header style={{ ...backgroundProps }}>
      <S.Container>
        <S.LogoContainer>HRISTOV</S.LogoContainer>
        <Navigation />
      </S.Container>
    </S.Header>
  );
};

export default Header;
