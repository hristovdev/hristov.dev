import React, { Suspense, useCallback, useMemo, useRef, useState } from "react";
import { positionValues, Scrollbars } from "react-custom-scrollbars";
import { RouteComponentProps, withRouter, useRouteMatch } from "react-router-dom";
import menuItems, { MenuItemModel } from "../../menuConfuration";
import Section from "../Common/Section";
import Header from "../Header";
import ErrorBoundary from "./ErrorBoundary";
import S from "./styles";
import { useSpring, config } from "react-spring";

interface IndexedMenuItemModel extends MenuItemModel {
  index: number;
}

const Viewport: React.FC<RouteComponentProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<Scrollbars>(null);
  const { url } = useRouteMatch();

  const indexedMenuItems = useMemo((): IndexedMenuItemModel[] => menuItems.map((x, index) => ({ ...x, index })), []);

  const indexOfCurrentMenuItem = useMemo(
    (): number => indexedMenuItems.slice(1).find((x) => url.indexOf(x.route) !== -1)?.index || 0,
    [indexedMenuItems, url]
  );

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

  const customTrack = useCallback(
    (className: string): React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> => ({
      style,
      ...props
    }): JSX.Element => (
      <div
        {...props}
        style={{ ...style, background: "rgba(255, 255, 255, 0.05)", borderRadius: "5px" }}
        className={className}
      />
    ),
    []
  );

  const backgroundProps = useSpring({
    backgroundPositionX: `${indexOfCurrentMenuItem * (100 / indexedMenuItems.length)}%`,
    config: config.slow,
  });

  return (
    <>
      <Header hasBackground={isScrolled} />
      <S.Container>
        <Scrollbars
          ref={scrollRef}
          autoHide
          onUpdate={handleScrollUpdate}
          renderThumbHorizontal={customTrack("thumb-horizontal")}
          renderThumbVertical={customTrack("thumb-horizontal")}
        >
          <S.Main style={backgroundProps}>
            <ErrorBoundary fallback={<div>An error has occurred.</div>}>
              <Suspense fallback={<div>Loading...</div>}>
                {indexedMenuItems.map((x) => (
                  <Section key={x.index} isFullHeight={x.index === 0} route={x.route}>
                    <x.component />
                  </Section>
                ))}
              </Suspense>
            </ErrorBoundary>
            <S.Footer>hristov.dev &copy; 2020. All Right Reserved</S.Footer>
          </S.Main>
        </Scrollbars>
      </S.Container>
    </>
  );
};

export default withRouter(Viewport);
