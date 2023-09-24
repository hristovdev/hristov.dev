import React, { useState, useCallback } from "react";
import { FiMenu } from "react-icons/fi";
import S from "./styled";
import menuItems, { MenuItemModel } from "../../../../menuConfuration";
import { useParams } from "react-router-dom";
import { RootRouteParams } from "../..";

interface Props {
  onItemClicked: (item: MenuItemModel) => void;
}

const Navigation: React.FC<Props> = ({ onItemClicked }) => {
  const [toggled, setToggled] = useState(false);
  const { section } = useParams<keyof RootRouteParams>();

  const isItemActive = useCallback(
    (x: MenuItemModel): boolean => {
      if (!section && x.title === menuItems[0].title) return true;

      return section ? x.route.indexOf(section) !== -1 : false;
    },
    [section]
  );

  return (
    <>
      <S.NavigationList toggled={toggled}>
        {menuItems.map((x) => (
          <S.NavigationListItem key={x.title}>
            <S.NavLink
              onClick={(): void => {
                setToggled(false);
                onItemClicked(x);
              }}
              className={isItemActive(x) ? "active" : undefined}
            >
              {x.title}
            </S.NavLink>
          </S.NavigationListItem>
        ))}
      </S.NavigationList>
      <S.MenuTogglerButton
        aria-label="Toggle menu"
        onClick={(): void => {
          setToggled(!toggled);
        }}
      >
        <FiMenu />
      </S.MenuTogglerButton>
    </>
  );
};

export default Navigation;
