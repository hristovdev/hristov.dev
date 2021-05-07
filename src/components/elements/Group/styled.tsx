import styled from "styled-components";
import { GroupProps } from "./Group";

export default {
  Container: styled.div<GroupProps>`
    display: flex;
    flex-direction: ${({ direction }): string => (direction === "column" ? "column" : "row")};
    flex-wrap: wrap;
    width: ${({ width }): string => (width ? width : "auto")};
    height: ${({ height }): string => (height ? height : "auto")};

    ${({ spacing }): string | undefined =>
      spacing
        ? `
          // margin: -${spacing};
          padding: calc(${spacing} / 2);
          `
        : undefined}

    ${({ align }): string | undefined =>
      align
        ? `
          align-items:${align};`
        : undefined}

    & > * {
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 0;
      margin: ${({ spacing }): string | undefined => (spacing ? `calc(${spacing} / 2)` : undefined)};
    }
  `,
};
