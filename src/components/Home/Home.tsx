import React from "react";
import styled from "styled-components";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import Mailto from "react-protected-mailto";

const Container = styled.main`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 900px;
  width: 100%;
  justify-content: space-between;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }

  @media only screen and (min-width: 801px) {
    flex-direction: row-reverse;

    > * + * {
      margin-right: 40px;
    }
  }
`;

const InfoBlock = styled.div`
  padding: 30px;

  > * + * {
    margin-top: 40px;
  }
`;

const PictureBlock = styled.div`
  max-width: 440px;
  max-height: 440px;
  padding: 30px;
`;

const ImageBorder = styled.div`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  border-radius: 50%;
  border: 30px solid rgba(0, 0, 0, 0.15);
`;

const Image = styled.img`
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
  border: 30px solid rgba(0, 0, 0, 0.25);
`;

const Greeting = styled.span`
  background: ${({ theme }) => theme.color.primary};
  border-radius: 15px 15px 15px 0;
  padding: ${({ theme }) => theme.spacing.small}
    ${({ theme }) => theme.spacing.medium};
`;

const ContactList = styled.ul`
  > * + * {
    margin-top: ${({ theme }) => theme.spacing.small};
  }
`;

const ContactListItem = styled.li`
  > * + * {
    margin-left: ${({ theme }) => theme.spacing.medium};
  }
`;

const ContactLink = styled.a`
  &:hover {
    > :first-child {
      color: ${({ theme }) => theme.color.primary};
    }
  }
`;

const SocialList = styled.ul`
  display: flex;

  > * + * {
    margin-left: ${({ theme }) => theme.spacing.large};
  }
`;

const Home: React.FC = () => {
  return (
    <Container>
      <PictureBlock>
        <ImageBorder>
          <Image src="./20170120_150031.png" />
        </ImageBorder>
      </PictureBlock>
      <InfoBlock>
        <Greeting>Hello I'm</Greeting>
        <div>
          <h2>Hristo Hristov</h2>
          <h4>Software Developer</h4>
        </div>
        <ContactList>
          <ContactListItem>
            <FiMail />
            <Mailto email="hristo.v.hristov@outlook.com" />
          </ContactListItem>
          <ContactListItem>
            <FiPhone />
            <Mailto tel="+359 88 3 466 955" />
          </ContactListItem>
          <ContactListItem>
            <FiMapPin />
            <ContactLink
              href="https://goo.gl/maps/U5bda1DQ9HLaT8JT7"
              target="_blank"
              rel="noopener"
            >
              <span>Sofia, Bulgaria</span>
            </ContactLink>
          </ContactListItem>
        </ContactList>
        <SocialList>
          <li>
            <a
              href="https://www.facebook.com/xploadz"
              target="_blank"
              rel="noopener"
            >
              <FaFacebookF size="25px" />
            </a>
          </li>
          <li>
            <a href="https://github.com/Xpload" target="_blank" rel="noopener">
              <FaGithub size="25px" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/hvhristov/"
              target="_blank"
              rel="noopener"
            >
              <FaLinkedinIn size="25px" />
            </a>
          </li>
        </SocialList>
      </InfoBlock>
    </Container>
  );
};

export default Home;
