import React, { PropsWithChildren } from "react";
import S from "./styles";

const Section: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <S.Container>
      <S.Content>{children}</S.Content>
    </S.Container>
  );
};

export default Section;
