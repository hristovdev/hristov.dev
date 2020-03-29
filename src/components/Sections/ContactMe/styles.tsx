import styled, { css } from "styled-components";

const inputStyle = css`
  width: 600px;
  max-width: 100%;
  min-width: 200px;
  padding: ${({ theme }): string => theme.spacing[3]};
  flex: 1 1 0;
`;

export default {
  Container: styled.div`
    width: 100%;
    max-width: 500px;
    padding: ${({ theme }): string => theme.spacing[4]};
  `,

  Row: styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: ${({ theme }): string => `-${theme.spacing[4]}`};
    padding: ${({ theme }): string => `calc(${theme.spacing[4]} / 2)`};

    & > * {
      margin: ${({ theme }): string => theme.spacing[4]};
    }
  `,

  Input: styled.input`
    ${inputStyle}
  `,

  Textarea: styled.textarea`
    ${inputStyle}
  `,

  Button: styled.button`
    border: 0px;
    color: ${({ theme }): string => theme.colors.text.primary};
    background: ${({ theme }): string => theme.colors.primary};
    padding: ${({ theme }): string => theme.spacing[3]};

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  `,
};
