import React, { createRef, RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { positionValues, Scrollbars } from "react-custom-scrollbars";
import { useHistory, useParams } from "react-router-dom";
import { useSpring } from "react-spring";
import { RootRouteParams } from "..";
import menuItems, { MenuItemModel } from "../../../menuConfuration";
import Group from "../../elements/Group";
import ScrollDown from "../../elements/ScrollDown";
import Section from "../../elements/Section";
import CustomScrollTrack from "./CustomScrollTrack";
import PageHeader from "./PageHeader";
import ScrollSnapContainer from "./ScrollSnapContainer";
import S from "./styled";

const Layout: React.FC = () => {
  const history = useHistory();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isInititialized, setIsInititialized] = useState(false);

  const sectionsRefs = useRef<RefObject<HTMLDivElement>[]>(menuItems.map(() => createRef<HTMLDivElement>()));
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<Scrollbars>(null);

  const { section } = useParams<RootRouteParams>();

  const [, api] = useSpring(() => ({
    y: 0,
    immediate: false,
  }));

  const scrollToSectionByIndex = useCallback(
    (sectionIndex: number, isInstant = false) => {
      api.stop();

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

      api.start({
        y: targetScrollTop,
        reset: true,
        from: { y: scrollRef.current?.getScrollTop() || 0 },
        config: { duration: 500 },
        onChange: (props) => {
          scrollRef.current?.scrollTop(props.value.y);
        },
      });
    },
    [api]
  );

  const scrollToSectionByTitle = useCallback(
    (sectionTitle: string, isInstant = false): void => {
      api.stop();

      const sectionIndex = menuItems.findIndex((x) => x.title.toLowerCase() === sectionTitle.toLowerCase());

      scrollToSectionByIndex(sectionIndex, isInstant);
    },
    [api, scrollToSectionByIndex]
  );

  useEffect(() => {
    const listener = history.listen((location, action) => {
      if (action === "POP" && section) {
        console.log("back to: ", location);
        scrollToSectionByTitle(location.pathname.slice(1));
      }
    });

    return (): void => {
      listener();
    };
  }, [history, scrollToSectionByTitle, section]);

  useEffect(() => {
    if (isInititialized) {
      return;
    }

    if (section) {
      scrollToSectionByTitle(section, true);
    }

    setIsInititialized(true);
  }, [section, isInititialized, scrollToSectionByTitle]);

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

  const handleSectionFocus = useCallback(
    (callback: () => void): void => {
      if (isInititialized) {
        callback();
      }
    },
    [isInititialized]
  );

  const content = useMemo(() => {
    return (
      <>
        {menuItems.map((menuItem, index) => (
          <React.Fragment key={index}>
            <Section
              isFullHeight={index === 0}
              onFocused={() => handleSectionFocus(() => history.push(menuItem.route))}
              header={index > 0 ? menuItem.title : undefined}
              ref={sectionsRefs.current[index]}
            >
              <menuItem.component />
            </Section>
            {index === 0 && (
              <S.ScrollDownContainer>
                <ScrollDown onClick={() => scrollToSectionByIndex(1)} isVisible={!isScrolled} />
              </S.ScrollDownContainer>
            )}
          </React.Fragment>
        ))}
      </>
    );
  }, [handleSectionFocus, history, isScrolled, scrollToSectionByIndex]);

  return (
    <>
      {/* <PageBackground /> */}
      <Scrollbars
        ref={scrollRef}
        autoHide
        onUpdate={handleScrollUpdate}
        renderView={(props) => <ScrollSnapContainer style={props.style} />}
        renderThumbHorizontal={CustomScrollTrack}
        renderThumbVertical={CustomScrollTrack}
      >
        <PageHeader
          hasBackground={isScrolled}
          onMenuItemClicked={(x: MenuItemModel): void => {
            scrollToSectionByTitle(x.title);
          }}
        />

        {content}
        <S.Footer>
          <Group direction="column" align="center">
            <p>hristov.dev &copy; 2020. All Right Reserved</p>
            <p>Designed by Hristo Hristov</p>
          </Group>
        </S.Footer>
      </Scrollbars>
    </>
  );
};

export default Layout;
