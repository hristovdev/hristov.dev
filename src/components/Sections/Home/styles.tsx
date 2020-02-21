import styled from "styled-components";

export default {
  Container: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 1000px;
    width: 100%;
    height: 100%;
    justify-content: space-between;

    @media only screen and (max-width: 800px) {
      flex-direction: column;
    }

    @media only screen and (min-width: 801px) {
      flex-direction: row-reverse;

      > * + * {
        margin-right: ${({ theme }) => theme.spacing[5]};
      }
    }
  `,

  InfoBlock: styled.div`
    padding: ${({ theme }) => theme.spacing[5]};

    > * + * {
      margin-top: ${({ theme }) => theme.spacing[5]};
    }
  `,

  PictureBlock: styled.div`
    max-width: 440px;
    max-height: 440px;
    padding: ${({ theme }) => theme.spacing[5]};
    pointer-events: none;
  `,

  ImageBorder: styled.div`
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    border-radius: 50%;
    border: ${({ theme }) => theme.spacing[5]} solid rgba(0, 0, 0, 0.15);
  `,

  Image: styled.img`
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
    border: ${({ theme }) => theme.spacing[5]} solid rgba(0, 0, 0, 0.25);
  `,

  Greeting: styled.span`
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) =>
      `${theme.spacing[3]} ${theme.spacing[3]} ${theme.spacing[3]} ${theme.spacing[0]}`};
    padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  `,

  ContactList: styled.ul`
    > * + * {
      margin-top: ${({ theme }) => theme.spacing[3]};
    }
  `,

  ContactListItem: styled.li`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    > * + * {
      margin-left: ${({ theme }) => theme.spacing[4]};
    }
  `,

  ContactLink: styled.a`
    &:hover {
      > :first-child {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  `,

  SocialList: styled.ul`
    display: flex;

    > * + * {
      margin-left: ${({ theme }) => theme.spacing[4]};
    }
  `,

  SocialLink: styled.a`
    display: block;
    padding: ${({ theme }) => theme.spacing[1]};
    line-height: 0;
    border-radius: 5%;

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  `
};
