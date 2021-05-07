import React from "react";
import S from "./styled";

const ContactMe: React.FC = () => {
  return (
    <S.Container>
      <S.Row>
        <S.Input type="text" placeholder="First Name" />
        <S.Input type="text" placeholder="Last Name" />
      </S.Row>
      <S.Row>
        <S.Input type="text" placeholder="E-Mail" />
      </S.Row>
      <S.Row>
        <S.Textarea rows={15} placeholder="Message" />
      </S.Row>
      <S.Row>
        <S.Button disabled>Send message</S.Button>
      </S.Row>
    </S.Container>
  );
};

export default ContactMe;
