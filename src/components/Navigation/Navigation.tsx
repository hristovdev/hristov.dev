import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import S from "./styles";
import menuItems from "../../menuConfuration";

const Navigation: React.FC = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <>
      <S.NavigationList toggled={toggled}>
        {menuItems.map(x => (
          <S.NavigationListItem key={x.title}>
            <S.NavLink
              to={x.route}
              onClick={() => {
                setToggled(false);
              }}
              exact
            >
              {x.title}
            </S.NavLink>
          </S.NavigationListItem>
        ))}
      </S.NavigationList>
      <S.MenuTogglerButton
        onClick={() => {
          setToggled(!toggled);
        }}
      >
        <FiMenu />
      </S.MenuTogglerButton>
    </>
  );
};

export default Navigation;
