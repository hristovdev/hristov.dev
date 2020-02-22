import React from "react";

export interface MenuItemModel {
  title: string;
  route: string;
  component: React.ComponentType;
}

const menuItems: MenuItemModel[] = [
  {
    title: "Home",
    route: "/",
    component: React.lazy(() => import("./components/Sections/Home"))
  },
  {
    title: "About",
    route: "/about",
    component: React.lazy(() => import("./components/Sections/About"))
  },
  {
    title: "Skills",
    route: "/skills",
    component: React.lazy(() => import("./components/Sections/Skills"))
  },
  {
    title: "Experience",
    route: "/experience",
    component: React.lazy(() => import("./components/Sections/Experience"))
  },
  {
    title: "Contact",
    route: "/contact",
    component: React.lazy(() => import("./components/Sections/ContactMe"))
  }
];

export default menuItems;
