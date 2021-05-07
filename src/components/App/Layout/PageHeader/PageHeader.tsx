import React from "react";
import { useSpring } from "react-spring";
import Navigation from "../Navigation";
import S from "./styled";
import { MenuItemModel } from "../../../../menuConfuration";

interface Props {
  hasBackground?: boolean;
  onMenuItemClicked: (item: MenuItemModel) => void;
}

const PageHeader: React.FC<Props> = ({ hasBackground, onMenuItemClicked }) => {
  const backgroundProps = useSpring({
    background: hasBackground ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0)",
  });

  return (
    <S.Header style={{ ...backgroundProps }}>
      <S.Container>
        <S.LogoContainer>HRISTOV.dev</S.LogoContainer>
        <Navigation onItemClicked={onMenuItemClicked} />
      </S.Container>
    </S.Header>
  );
};

export default PageHeader;
