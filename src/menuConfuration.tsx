import React from "react";
import About from "./components/sections/About";
import ContactMe from "./components/sections/ContactMe";
import Home from "./components/sections/Home";
import Resume from "./components/sections/Resume";

export interface MenuItemModel {
  title: string;
  route: string;
  component: React.ComponentType;
}

const menuItems: MenuItemModel[] = [
  {
    title: "Home",
    route: "/",
    component: Home,
  },
  {
    title: "About",
    route: "/about",
    component: About,
  },
  {
    title: "Resume",
    route: "/resume",
    component: Resume,
  },
  {
    title: "Contact",
    route: "/contact",
    component: ContactMe,
  },
];

export default menuItems;
