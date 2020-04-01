import React from "react";
import { useSpring } from "react-spring";
import Navigation from "../Navigation";
import S from "./styles";
import { MenuItemModel } from "../../menuConfuration";

interface Props {
  hasBackground?: boolean;
  onMenuItemClicked: (item: MenuItemModel) => void;
}

const Header: React.FC<Props> = ({ hasBackground, onMenuItemClicked }) => {
  const backgroundProps = useSpring({
    background: hasBackground ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0)",
  });

  return (
    <S.Header style={{ ...backgroundProps }}>
      <S.Container>
        <S.LogoContainer>HRISTOV</S.LogoContainer>
        <Navigation onItemClicked={onMenuItemClicked} />
      </S.Container>
    </S.Header>
  );
};

export default Header;
