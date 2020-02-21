import Home from "./components/Sections/Home";
import About from "./components/Sections/About";
import Skills from "./components/Sections/Skills";
import Experience from "./components/Sections/Experience";
import ContactMe from "./components/Sections/ContactMe";

export interface MenuItemModel {
  title: string;
  route: string;
  component: React.ComponentType;
}

const menuItems: MenuItemModel[] = [
  {
    title: "Home",
    route: "/",
    component: Home
  },
  {
    title: "About",
    route: "/about",
    component: About
  },
  {
    title: "Skills",
    route: "/skills",
    component: Skills
  },
  {
    title: "Experience",
    route: "/experience",
    component: Experience
  },
  {
    title: "Contact",
    route: "/contact",
    component: ContactMe
  }
];

export default menuItems;
