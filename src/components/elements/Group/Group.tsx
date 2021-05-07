import React, { PropsWithChildren } from "react";
import S from "./styled";

export interface GroupProps {
  direction?: "row" | "column";
  width?: string;
  height?: string;
  spacing?: string;
  align?: "left" | "center" | "right";
}

const Group: React.FC<PropsWithChildren<GroupProps>> = (props) => {
  const { children, ...containerProps } = props;

  return <S.Container {...containerProps}>{children}</S.Container>;
};

export default Group;
