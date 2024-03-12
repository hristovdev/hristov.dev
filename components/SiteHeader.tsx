import { MENU_ITEMS } from "@/helpers/constants";
import Link from "next/link";
import React from "react";

export default () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-[1000] fm:absolute">
      <div className="fixed inset-0 h-16 border-divider-light border-b backdrop-blur dark:border-divider-dark fm:hidden"></div>
      <div className="content-wrapper-max">
        <div className="relative z-50 flex h-16 items-center justify-between px-2 text-sm md:px-4">
          <nav className="flex md:gap-2">
            <ul className="flex items-center">
              {MENU_ITEMS.map((x, i, arr) => (
                <React.Fragment key={x.name}>
                  <li className="px-4">
                    <Link className="nav-link" href={x.href}>
                      {x.name}
                    </Link>
                  </li>
                  {i < arr.length - 1 && (
                    <li>
                      <div className="nav-link__separator">·</div>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
