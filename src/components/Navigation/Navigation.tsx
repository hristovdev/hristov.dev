import React from "react";
import styled from "styled-components";

const NavigationList = styled.ul`
  display: flex;
`;

const NavigationListItem = styled.li`
  display: block;
  padding: 0 20px;
  letter-spacing: 0.1em;
`;

const Navigation: React.FC = () => {
  return (
    <NavigationList>
      <NavigationListItem>
        <a>Home</a>
      </NavigationListItem>
      <NavigationListItem>
        <a>About</a>
      </NavigationListItem>
      <NavigationListItem>
        <a>Skills</a>
      </NavigationListItem>
      <NavigationListItem>
        <a>Experience</a>
      </NavigationListItem>
      <NavigationListItem>
        <a>Contact</a>
      </NavigationListItem>
    </NavigationList>
  );
};

export default Navigation;
