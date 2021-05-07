import styled from "styled-components";

interface NavigationListProps {
  toggled: boolean;
}

export default {
  NavigationList: styled.ul<NavigationListProps>`
    display: flex;
    align-items: center;

    @media only screen and (max-width: 800px) {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      height: 100vh;
      width: 100vw;
      background: gray;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 30px;
      display: ${({ toggled }): string => (toggled ? "flex" : "none")};
    }
  `,

  NavigationListItem: styled.li`
    display: flex;
    padding: ${({ theme }): string => `${theme.spacing[0]} ${theme.spacing[3]}`};
    letter-spacing: 0.1em;
  `,

  NavLink: styled.a`
    padding: ${({ theme }): string => `${theme.spacing[3]} ${theme.spacing[0]}`};
    border-bottom: 2px solid transparent;
    cursor: pointer;

    &.active {
      border-bottom: 2px solid ${(props) => props.theme.colors.primary};
    }
  `,

  MenuTogglerButton: styled.button`
    display: none;
    border: none;
    background: transparent;
    color: white;
    font-size: 30px;
    padding: 0;
    margin: 0;
    height: 30px;
    width: 30px;
    cursor: pointer;
    transition: all 250ms ease-in-out;

    &:hover {
      color: ${({ theme }): string => theme.colors.primary};
    }

    &:focus {
      outline: none;
    }

    @media only screen and (max-width: 800px) {
      display: block;
    }
  `,
};
