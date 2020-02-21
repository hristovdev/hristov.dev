import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import S from "./styles";

const Navigation: React.FC = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <>
      <S.NavigationList toggled={toggled}>
        <S.NavigationListItem>
          <S.NavLink
            to="/"
            onClick={() => {
              setToggled(false);
            }}
            exact
          >
            Home
          </S.NavLink>
        </S.NavigationListItem>
        <S.NavigationListItem>
          <S.NavLink
            to="/about"
            onClick={() => {
              setToggled(false);
            }}
          >
            About
          </S.NavLink>
        </S.NavigationListItem>
        <S.NavigationListItem>
          <S.NavLink
            to="/skills"
            onClick={() => {
              setToggled(false);
            }}
          >
            Skills
          </S.NavLink>
        </S.NavigationListItem>
        <S.NavigationListItem>
          <S.NavLink
            to="/experience"
            onClick={() => {
              setToggled(false);
            }}
          >
            Experience
          </S.NavLink>
        </S.NavigationListItem>
        <S.NavigationListItem>
          <S.NavLink
            to="/contact"
            onClick={() => {
              setToggled(false);
            }}
          >
            Contact
          </S.NavLink>
        </S.NavigationListItem>
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
