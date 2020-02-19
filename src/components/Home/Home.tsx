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

  > * + * {
    margin-left: 40px;
  }
`;

const Left = styled.div`
  > * + * {
    margin-top: 40px;
  }
`;

const ImageBorder = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 50%;
  border: 20px solid rgba(0, 0, 0, 0.15);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 20px solid rgba(0, 0, 0, 0.25);
`;

const Greeting = styled.span`
  background: ${({ theme }) => theme.color.primary};
  border-radius: 15px 15px 15px 0;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
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
      <Left>
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
      </Left>
      <div>
        <ImageBorder>
          <Image src="./20170120_150031.png" />
        </ImageBorder>
      </div>
    </Container>
  );
};

export default Home;
