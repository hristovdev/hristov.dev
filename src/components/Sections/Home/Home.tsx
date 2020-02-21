import React from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import Mailto from "react-protected-mailto";
import S from "./styles";

const Home: React.FC = () => {
  return (
    <S.Container>
      <S.PictureBlock>
        <S.ImageBorder>
          <S.Image src="./20170120_150031.png" />
        </S.ImageBorder>
      </S.PictureBlock>
      <S.InfoBlock>
        <S.Greeting>Hello I'm</S.Greeting>
        <div>
          <h2>Hristo Hristov</h2>
          <h4>Software Developer</h4>
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
            <S.ContactLink
              href="https://goo.gl/maps/U5bda1DQ9HLaT8JT7"
              target="_blank"
              rel="noopener"
            >
              <span>Sofia, Bulgaria</span>
            </S.ContactLink>
          </S.ContactListItem>
        </S.ContactList>
        <S.SocialList>
          <li>
            <S.SocialLink
              href="https://www.facebook.com/xploadz"
              target="_blank"
              rel="noopener"
            >
              <FaFacebookF size="25px" />
            </S.SocialLink>
          </li>
          <li>
            <S.SocialLink
              href="https://github.com/Xpload"
              target="_blank"
              rel="noopener"
            >
              <FaGithub size="25px" />
            </S.SocialLink>
          </li>
          <li>
            <S.SocialLink
              href="https://www.linkedin.com/in/hvhristov/"
              target="_blank"
              rel="noopener"
            >
              <FaLinkedinIn size="25px" />
            </S.SocialLink>
          </li>
        </S.SocialList>
      </S.InfoBlock>
    </S.Container>
  );
};

export default Home;
