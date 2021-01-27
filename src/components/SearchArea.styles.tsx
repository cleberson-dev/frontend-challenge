import styled from 'styled-components';

export const Form = styled.form`
  background: #4F9419;
  padding: 5rem 2.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 30px;
  align-items: center;

  @media(max-width: 741px) {
    padding: 3rem 1.5rem;
    grid-template-columns: 1fr;
    grid-row-gap: calc(1rem + 10px);
  }
`;