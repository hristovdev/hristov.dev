import styled from "styled-components";

export default {
  Wrapper: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: calc(100vh - ${({ theme }): string => theme.sizes.headerHeight});
  `,

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
        margin-right: ${({ theme }): string => theme.spacing[7]};
      }
    }
  `,

  InfoBlock: styled.div`
    padding: ${({ theme }): string => theme.spacing[7]};

    > * + * {
      margin-top: ${({ theme }): string => theme.spacing[7]};
    }
  `,

  PictureBlock: styled.div`
    max-width: 440px;
    max-height: 440px;
    padding: ${({ theme }): string => theme.spacing[5]};
    pointer-events: none;
  `,

  ImageBorder: styled.div`
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    border-radius: 50%;
    border: ${({ theme }): string => theme.spacing[5]} solid rgba(255, 255, 255, 0.05);
  `,

  Image: styled.img`
    display: block;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
    border: ${({ theme }): string => theme.spacing[5]} solid rgba(255, 255, 255, 0.1);
  `,

  Greeting: styled.span`
    background: ${({ theme }): string => theme.colors.primary};
    border-radius: ${({ theme }): string =>
      `${theme.spacing[3]} ${theme.spacing[3]} ${theme.spacing[3]} ${theme.spacing[0]}`};
    padding: ${({ theme }): string => `${theme.spacing[2]} ${theme.spacing[4]}`};
  `,

  ContactList: styled.ul`
    > * + * {
      margin-top: ${({ theme }): string => theme.spacing[5]};
    }
  `,

  ContactListItem: styled.li`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    > * + * {
      margin-left: ${({ theme }): string => theme.spacing[4]};
    }
  `,

  ContactLink: styled.a`
    &:hover {
      > :first-child {
        color: ${({ theme }): string => theme.colors.primary};
      }
    }
  `,

  SocialList: styled.ul`
    display: flex;

    > * + * {
      margin-left: ${({ theme }): string => theme.spacing[4]};
    }
  `,

  SocialLink: styled.a`
    display: block;
    padding: ${({ theme }): string => theme.spacing[1]};
    line-height: 0;
    border-radius: 5%;

    &:hover {
      background: ${({ theme }): string => theme.colors.primary};
      color: white;
    }
  `,
};
