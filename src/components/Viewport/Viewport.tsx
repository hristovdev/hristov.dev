import React, { useRef, useEffect, useMemo, Suspense } from "react";
import { useTransition, animated } from "react-spring";
import {
  withRouter,
  RouteComponentProps,
  Switch,
  Route
} from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import S from "./styles";
import Header from "../Header";
import menuItems, { MenuItemModel } from "../../menuConfuration";

interface IndexedMenuItemModel extends MenuItemModel {
  index: number;
}

const findMenuItemIndexFromPath = (
  path: string,
  itemsArr: IndexedMenuItemModel[]
): number => {
  const item = itemsArr.find(x => x.route === path);

  if (item) {
    return item.index;
  }

  return 0;
};

const Viewport: React.FC<RouteComponentProps> = ({ location }) => {
  const indexedMenuItems = useMemo(
    (): IndexedMenuItemModel[] =>
      menuItems.map((x, index) => ({ ...x, index })),
    []
  );

  const menuItemIndex = useRef<number>(
    findMenuItemIndexFromPath(location.pathname, indexedMenuItems)
  );
  const nextMenuItemIndex = findMenuItemIndexFromPath(
    location.pathname,
    indexedMenuItems
  );

  useEffect(() => {
    menuItemIndex.current = findMenuItemIndexFromPath(
      location.pathname,
      indexedMenuItems
    );
  });

  const transitions = useTransition(location, location => location.pathname, {
    initial: { transform: "translate3d(0%, 0, 0)", opacity: 1 },
    from: {
      transform: `translate3d(${
        menuItemIndex.current > nextMenuItemIndex ? "-" : ""
      }25%, 0%, 0)`,
      opacity: 0
    },
    enter: { transform: "translate3d(0%, 0%, 0)", opacity: 1 },
    leave: { transform: "translate3d(0%, 25%, 0)", opacity: 0 }
  });

  return (
    <>
      <Header />
      <S.Container>
        {transitions.map(({ item, props, key }) => (
          <S.AnimationWrapper key={key} style={props}>
            <Scrollbars autoHide>
              <S.MainContainer>
                <Suspense fallback={<div>Loading...</div>}>
                  <Switch location={item}>
                    {indexedMenuItems.map(x => (
                      <Route
                        key={x.title}
                        path={x.route}
                        exact
                        component={x.component}
                      />
                    ))}
                  </Switch>
                </Suspense>
              </S.MainContainer>
              <S.Footer />
            </Scrollbars>
          </S.AnimationWrapper>
        ))}
      </S.Container>
    </>
  );
};

export default withRouter(Viewport);
