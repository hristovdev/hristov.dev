import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { positionValues, Scrollbars } from "react-custom-scrollbars";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useTransition } from "react-spring";
import menuItems, { MenuItemModel } from "../../menuConfuration";
import Section from "../Common/Section";
import Header from "../Header";
import ErrorBoundary from "./ErrorBoundary";
import S from "./styles";

interface IndexedMenuItemModel extends MenuItemModel {
  index: number;
}

const findMenuItemIndexFromPath = (path: string, itemsArr: IndexedMenuItemModel[]): number => {
  const item = itemsArr.find((x) => x.route === path);

  if (item) {
    return item.index;
  }

  return 0;
};

const Viewport: React.FC<RouteComponentProps> = ({ location }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<Scrollbars>(null);

  const indexedMenuItems = useMemo((): IndexedMenuItemModel[] => menuItems.map((x, index) => ({ ...x, index })), []);

  const menuItemIndex = useRef<number>(findMenuItemIndexFromPath(location.pathname, indexedMenuItems));
  const nextMenuItemIndex = findMenuItemIndexFromPath(location.pathname, indexedMenuItems);

  useEffect(() => {
    menuItemIndex.current = findMenuItemIndexFromPath(location.pathname, indexedMenuItems);
  });

  const handleScrollUpdate = useCallback(
    (values: positionValues) => {
      if (values.scrollTop >= 1 && !isScrolled) {
        setIsScrolled(true);

        return;
      }

      if (values.scrollTop < 1 && isScrolled) {
        setIsScrolled(false);
      }
    },
    [isScrolled, setIsScrolled]
  );

  const transitions = useTransition(location, (location) => location.pathname, {
    initial: { transform: "translate3d(0%, 0, 0)", opacity: 1 },
    from: {
      transform: `translate3d(${menuItemIndex.current > nextMenuItemIndex ? "-" : ""}25%, 0%, 0)`,
      opacity: 0,
    },
    enter: { transform: "translate3d(0%, 0%, 0)", opacity: 1 },
    leave: { transform: "translate3d(0%, 25%, 0)", opacity: 0 },
  });

  return (
    <>
      <Header hasBackground={isScrolled} />
      <S.Container>
        {transitions.map(({ props, key }) => (
          <S.AnimationWrapper key={key} style={props}>
            <Scrollbars ref={scrollRef} autoHide onUpdate={handleScrollUpdate}>
              <S.ScrollContent>
                <ErrorBoundary fallback={<div>An error has occurred.</div>}>
                  <Suspense fallback={<div>Loading...</div>}>
                    {indexedMenuItems.map((x) => (
                      <Section key={x.index}>
                        <x.component />
                      </Section>
                    ))}
                  </Suspense>
                </ErrorBoundary>
                <S.Footer />
              </S.ScrollContent>
            </Scrollbars>
          </S.AnimationWrapper>
        ))}
      </S.Container>
    </>
  );
};

export default withRouter(Viewport);
