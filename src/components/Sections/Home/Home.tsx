import React from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import Mailto from "react-protected-mailto";
import { useTheme } from "styled-components";
import S from "./styled";

const Home: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <S.Container>
        <S.PictureBlock>
          <S.ImageBorder>
            <S.Image src="me.png" alt="Hristo Hristov" />
          </S.ImageBorder>
        </S.PictureBlock>
        <S.InfoBlock>
          <div>
            <S.Greeting>Hello I&apos;m</S.Greeting>
            <h2
              style={{
                marginBottom: theme.spacing[1],
                marginTop: theme.spacing[1],
              }}
            >
              Hristo Hristov
            </h2>
            <h4>Full Stack Software Developer</h4>
          </div>
          <S.ContactList>
            <S.ContactListItem>
              <FiMail />
              <Mailto email="hristo.v.hristov@outlook.com" />
            </S.ContactListItem>
            <S.ContactListItem>
              <FiPhone />
              <Mailto tel="+359 88 3 466 955" />
            </S.ContactListItem>
            <S.ContactListItem>
              <FiMapPin />
              <S.ContactLink href="https://goo.gl/maps/U5bda1DQ9HLaT8JT7" target="_blank" rel="noopener">
                <span>Sofia, Bulgaria</span>
              </S.ContactLink>
            </S.ContactListItem>
          </S.ContactList>
          <S.SocialList>
            <li>
              <S.SocialLink href="https://www.facebook.com/xploadz" target="_blank" rel="noopener">
                <FaFacebookF size="25px" />
              </S.SocialLink>
            </li>
            <li>
              <S.SocialLink href="https://github.com/Xpload" target="_blank" rel="noopener">
                <FaGithub size="25px" />
              </S.SocialLink>
            </li>
            <li>
              <S.SocialLink href="https://www.linkedin.com/in/hvhristov/" target="_blank" rel="noopener">
                <FaLinkedinIn size="25px" />
              </S.SocialLink>
            </li>
          </S.SocialList>
        </S.InfoBlock>
      </S.Container>
      <div />
    </>
  );
};

export default Home;
