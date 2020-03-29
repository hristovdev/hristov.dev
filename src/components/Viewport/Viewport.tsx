import React, { Suspense, useCallback, useMemo, useRef, useState, useEffect } from "react";
import { positionValues, Scrollbars } from "react-custom-scrollbars";
import { RouteComponentProps, useParams, useRouteMatch, withRouter } from "react-router-dom";
import { config, useSpring } from "react-spring";
import menuItems, { MenuItemModel } from "../../menuConfuration";
import { RootRouteParams } from "../App";
import Section from "../Common/Section";
import Header from "../Header";
import ErrorBoundary from "./ErrorBoundary";
import S from "./styles";

interface IndexedMenuItemModel extends MenuItemModel {
  index: number;
}

const Viewport: React.FC<RouteComponentProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<Scrollbars>(null);
  const { url } = useRouteMatch();
  const { section } = useParams<RootRouteParams>();

  // const [, setY] = useSpring(() => ({
  //   y: 0,
  //   immediate: false,
  //   onFrame: ({ y }: any): void => {
  //     scrollRef.current?.scrollTop(y.x);
  //   },
  // }));

  // useEffect(() => {
  //   setY({
  //     y: 0,
  //     reset: true,
  //     from: { y: scrollRef.current?.getScrollTop() },
  //     onFrame: (props) => scrollRef.current?.scrollTop(props.y),
  //   });
  // }, [setY, section]);

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

  const backgroundProps = useSpring(
    {
      from: { backgroundPositionX: "0%" },
      to: async (next: any) => {
        while (true) {
          await next({ backgroundPositionX: "100%", config: { duration: 360000 }, immediate: false });
          await next({ backgroundPositionX: "0%", config: { duration: 360000 }, immediate: false });
        }
      },
    }
    //   {
    //   backgroundPositionX: `${indexOfCurrentMenuItem * (100 / indexedMenuItems.length)}%`,
    //   config: { ...config.molasses, friction: 500 },
    // }
  );

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
                  <Section
                    key={x.index}
                    isFullHeight={x.index === 0}
                    route={x.route}
                    header={x.index > 0 ? x.title : undefined}
                  >
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
