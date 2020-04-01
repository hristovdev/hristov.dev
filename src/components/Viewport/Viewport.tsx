import React, { createRef, RefObject, Suspense, useCallback, useMemo, useRef, useState, useEffect } from "react";
import { positionValues, Scrollbars } from "react-custom-scrollbars";
import { RouteComponentProps, withRouter, useParams } from "react-router-dom";
import { useSpring } from "react-spring";
import menuItems, { MenuItemModel } from "../../menuConfuration";
import Section from "../Common/Section";
import Header from "../Header";
import AnimatedBackground from "./AnimatedBackground";
import ErrorBoundary from "./ErrorBoundary";
import S from "./styles";
import { RootRouteParams } from "../App";

const Viewport: React.FC<RouteComponentProps> = ({ history }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInititialized, setIsInititialized] = useState(false);

  const sectionsRefs = useRef<RefObject<HTMLDivElement>[]>(menuItems.map(() => createRef<HTMLDivElement>()));
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<Scrollbars>(null);

  const { section } = useParams<RootRouteParams>();

  const [, setY] = useSpring(() => ({
    y: 0,
    immediate: false,
    onFrame: ({ y }: any): void => undefined,
  }));

  const scrollToSection = useCallback(
    (sectionTitle: string, isInstant = false): void => {
      const sectionIndex = menuItems.findIndex((x) => x.title.toLowerCase() === sectionTitle.toLowerCase());
      const scrollTargetSectionTop =
        sectionsRefs.current[sectionIndex !== -1 ? sectionIndex : 0].current?.getBoundingClientRect().top || 0;
      const targetScrollTop =
        (scrollRef.current?.getScrollTop() || 0) -
        (containerRef.current?.getBoundingClientRect().top || 0) +
        scrollTargetSectionTop;

      if (isInstant) {
        scrollRef.current?.scrollTop(targetScrollTop);
        return;
      }

      setY({
        y: targetScrollTop,
        reset: true,
        from: { y: scrollRef.current?.getScrollTop() || 0 },
        onFrame: (props) => {
          scrollRef.current?.scrollTop(props.y);
        },
        config: { duration: 1000 },
      });
    },
    [setY]
  );

  useEffect(() => {
    if (isInititialized) {
      return;
    }

    if (section) {
      scrollToSection(section, true);
    }

    setIsInititialized(true);
  }, [section, isInititialized, scrollToSection]);

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

  const content = useMemo(() => {
    return (
      <>
        <ErrorBoundary fallback={<div>An error has occurred.</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            {menuItems.map((x, i) => (
              <Section
                key={i}
                isFullHeight={i === 0}
                onFocused={(): void => {
                  if (isInititialized) history.push(x.route);
                }}
                header={i > 0 ? x.title : undefined}
                ref={sectionsRefs.current[i]}
              >
                <x.component />
              </Section>
            ))}
          </Suspense>
        </ErrorBoundary>
        <S.Footer>hristov.dev &copy; 2020. All Right Reserved</S.Footer>
      </>
    );
  }, [history, isInititialized]);

  return (
    <>
      <Header
        hasBackground={isScrolled}
        onMenuItemClicked={(x: MenuItemModel): void => {
          scrollToSection(x.title);
        }}
      />
      <S.Container ref={containerRef}>
        <Scrollbars
          ref={scrollRef}
          autoHide
          onUpdate={handleScrollUpdate}
          renderThumbHorizontal={customTrack("thumb-horizontal")}
          renderThumbVertical={customTrack("thumb-horizontal")}
        >
          <S.Main>
            <AnimatedBackground />
            {content}
          </S.Main>
        </Scrollbars>
      </S.Container>
    </>
  );
};

export default withRouter(Viewport);
