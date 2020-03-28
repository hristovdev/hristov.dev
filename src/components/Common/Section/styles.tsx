import styled from "styled-components";

export default {
  Container: styled.section`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: ${({ theme }): string => theme.spacing[8]} 0;
  `,

  Content: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 1000px;
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
};
